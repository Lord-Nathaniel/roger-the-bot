// const mongo = require('../mongo');
// const command = require('../command');
// const welcomeSchema = require('./welcome-schema');

// module.exports = (client) => {
//     //!setwelcome <message>

//     command(client, 'setwelcome', message => {
//         const { member, channel, content, guild } = message;

//         if (!member.hasPErmissions('ADMINISTRATOR')) {
//             channel.send('You do not have permission to run this command.');
//             return;
//         }

//         await mongo().then(mongoose => {
//             try {
//                 new WelcomeSchema({
//                     _id: guild.id,
//                     channelId: channel.id,
//                     text: content
//                 }).save()
//             } finally {
//                 mongoose.connection.close();
//             }
//         })
//     })

// }