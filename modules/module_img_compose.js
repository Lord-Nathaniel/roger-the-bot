//module resources
//ce module permet de combiner des images grace au package JIMP
/*commandes : 
 * $jimp
 */

const mongo = require('../mongo');
const command = require('../command');
//packages and var needed for the image creation
const jimp = require('jimp');

const IMG_DB = ['./src/images/castor.png', './src/images/a_arrosoir.png', './src/images/h_lanoire.png', './src/images/h_lanoire.png']
var jimps = [];

//packages needed for the image upload
// const Commando = require('discord.js-commando');
// const { MessageAttachment } = require('discord.js');
// const fs = require('fs');
// const path = require('path');



module.exports = (client) => {

    /** ***************************************************** COMMAND $jimp ***************************************************** */

    command(client, 'jimp', async message => {

        /** ***************************************************** IMAGE CREATION ***************************************************** */

        for (let i = 0; i < IMG_DB.length; i++) {
            jimps.push(jimp.read(IMG_DB[i]));
        };

        await Promise.all(jimps).then(function(data) {
            return Promise.all(jimps);
        }).then(function(data) {
            // data[0].composite(data[2], 0, 0);
            data[0].composite(data[1], 0, 0);

            data[0].write('./src/images/finale.png', function() {
                console.log("wrote the finale image !");
            });
        })
        message.reply('Voici le résultat : ', { files: ["./src/images/finale.png"] });

        /** ***************************************************** IMAGE UPLOAD ***************************************************** */

        // module.exports = class ImageCommand extends Commando.Command {
        //     constructor(client) {
        //         super(client, {
        //             name: 'image',
        //             group: 'misc',
        //             memberName: 'image',
        //             description: 'Sends an image'
        //         })
        //     }

        //     run = (message) => {

        //         //fs needs the absolute path, but with path we can use the regular path
        //         const image = fs.readFileSync(path.join(__dirname, './finale.png'))
        //         const attachment = new MessageAttachment(image);

        //         message.reply('Voici le résultat : ', attachment);
        //     }
        // }

    });
}