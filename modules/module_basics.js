//module basics
//ce module est une compilation de commandes de bases utilisées pour divers exercices
/*commandes : 
 * $ping || $test : bot répond par "ewo!"
 * $servers : compte la quantité de membres du channel
 * $cc || $clearchannel : supprime tous les messages du channelId
 * $status <message> : set le status du bot en
 * $j'aime les castors : répond à la ligne de commande par un emoji
 * $fluteMe : donne le rôle "fluted" à celui qui à envoyé la commande
 * 
 * note : affiche un message en cas de suppression de message du channel
 */

const command = require('../command');

module.exports = (client) => {

    //a basic $ping command
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('ewo !');
    });

    //a command to get the number of member in the channel
    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${ guild.name } has a total of ${ guild.memberCount } members.`
            );
        });
    });

    //a command to delete message in a channel
    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    });

    //a command to set the status of the bot
    command(client, 'status', message => {
        const content = message.content.replace('$status', '');

        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    });

    //a command to give an heart emoji to the message listened
    command(client, 'j\'aime les castors', message => {
        message.react("\u{1F499}");
    });

    //give the "flutted" role
    command(client, 'fluteMe', message => {
        fluteUser(message.member);
    });

    //React to message deletion
    client.on("messageDelete", message => {
        message.reply("Je t'ai vu supprimer ce message ( ͡° ͜ʖ ͡°)");
    })

    function fluteUser(member) {
        member.roles.add("845764114814337061");
    }

}