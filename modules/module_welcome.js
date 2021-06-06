//module welcome
//ce module permet de mettre en place, en enregistrant dans une database, le message de bienvenue, et de le mettre dans le channel quand un nouveau membre join le channel
/*commandes : 
 * $setwelcome <message> : set le message de bienvenue
 * $simjoin : simule un membre qui join le channel
 * $simjointag : simule un membre qui join le channel, et l'identifie par son tag
 */

const mongo = require('../mongo');
const command = require('../command');
const welcomeSchema = require('../schemas/welcome_schema');

module.exports = (client) => {
    //!setwelcome <message>
    const cache = {}

    command(client, 'setwelcome', async message => {
        const { member, channel, content, guild } = message;

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command.');
            return;
        }

        let text = content;
        const split = text.split(' ');

        if (split.lenght < 2) {
            channel.send('Please provide a welcome message.');
            return
        }

        split.shift();
        text = split.join(' ');

        cache[guild.id] = [channel.id, text];

        await mongo().then(async mongoose => {
            try {
                //insert a document with a primary key 
                //if launched 2+ times, it will have the same primary key, and provoke an error
                // await new welcomeSchema({
                //     _id: guild.id,
                //     channelId: channel.id,
                //     text
                // }).save()

                //now insert the doc if it doesn't exist, else it update it
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id,
                }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text
                }, {
                    upsert: true //if this exist : update it //else : insert it
                });
            } finally {
                mongoose.connection.close();
            }
        })
    })

    //command to simulate a member joining the channel
    const onJoin = async member => {
        const { guild } = member;
        let data = cache[guild.id];

        if (!data) {
            console.log("fetching from database...")
            await mongo().then(async mongoose => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id });

                    cache[guild.id] = data = [result.channelId, result.text];
                } finally {
                    mongoose.connection.close();
                }
            });
        };

        const channelId = data[0];
        const text = data[1];

        const channel = guild.channels.cache.get(channelId);
        channel.send(text);
    };

    //command to simulate a member joining the channel and adding a tag to identify him
    const onJoinTag = async member => {
        const { guild } = member;
        let data = cache[guild.id];

        if (!data) {
            console.log("fetching from database...")
            await mongo().then(async mongoose => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id });

                    cache[guild.id] = data = [result.channelId, result.text];
                } finally {
                    mongoose.connection.close();
                }
            });
        };

        const channelId = data[0];
        const text = data[1];

        const channel = guild.channels.cache.get(channelId);
        channel.send(text.replace(/<@>/g, `<@${member.id}>`));
    };

    command(client, 'simjoin', message => {
        onJoin(message.member);
    });

    command(client, 'simjointag', message => {
        onJoinTag(message.member);
    });

    client.on('guildMemberAdd', member => {
        onJoin(member);
    });

}