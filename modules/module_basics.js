const command = require('../command');

module.exports = (client) => {

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('ewo !');
    });

    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${ guild.name } has a total of ${ guild.memberCount } members.`
            );
        });
    });

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    });

    command(client, 'status', message => {
        const content = message.content.replace('$status', '');

        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    })

}