//module message counter
//ce module permet de compter le nombre de messages envoyés par un membre
// /!\ ATTENTION : compte sur tout le serveur discord, pas que sur un channel !
/*commandes : 
 * N/A
 */

const mongo = require('../mongo');
const messageCountSchema = require('../schemas/message_count_schema');

module.exports = (client) => {
    client.on('message', async message => {
        const { author } = message;
        const { id } = author;

        await mongo().then(async mongoose => {
            try {
                await messageCountSchema.findOneAndUpdate({
                    _id: id
                }, {
                    $inc: {
                        messageCount: 1
                    }
                }, {
                    upsert: true //if this exist : update it //else : insert it
                }).exec();
            } finally {
                mongoose.connection.close();
            }
        })
    });
}