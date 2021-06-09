const { prefix } = require('./config.json');

//client = the discord bot => use to listen if someone send the correct command
//aliases = main command
//callback = function who will be ran when someone run the command
module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`

            if (content.startsWith(`${ command } `) || content === command) {
                console.log(`Gisèle à lancé la commande ${ command }`)
                callback(message)
            }
        })
    })

}