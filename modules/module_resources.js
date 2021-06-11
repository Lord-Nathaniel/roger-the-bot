//module resources
//ce module permet de stocker dans une database la quantité de resources gagnées par un membre, après qu'il ait ouvert un booster
/*commandes : 
 * $booster : ouvre un booster de 5 ressources
 * $inventory : permet d'afficher la quantité de ressources du membre
 * $combine : 
 */

const mongo = require('../mongo');
const command = require('../command');
const userSchema = require('../schemas/user_schema');

const RESOURCE_TABLE = ["rouge", "orange", "jaune", "vert", "bleu", "violet"];

module.exports = (client) => {

    /** ***************************************************** COMMAND $booster ***************************************************** */

    command(client, 'booster', async message => {
        const guildId = message.guild.id;
        const userId = message.author.id;

        let tempBooster = [];
        for (let i = 0; i < RESOURCE_TABLE.length; i++) {
            tempBooster[i] = 0;
        }
        let number = 5;
        for (let i = 0; i < number; i++) {
            let rand = Math.round(Math.random() * (RESOURCE_TABLE.length - 1));
            tempBooster[rand]++;
        }
        console.log("tempBooster = ");
        console.table(tempBooster);

        await mongo().then(async mongoose => {
            try {

                let userCreated = false;
                let messageCreated = false;
                let result;

                do {

                    console.log('Searching the user...');

                    result = await userSchema.findOne({
                        guildId,
                        userId
                    });

                    if (result) {

                        console.log('User found !');

                        await userSchema.findOneAndUpdate({
                            guildId,
                            userId
                        }, {
                            $inc: {
                                "resources.rouge": tempBooster[0],
                                "resources.orange": tempBooster[1],
                                "resources.jaune": tempBooster[2],
                                "resources.vert": tempBooster[3],
                                "resources.bleu": tempBooster[4],
                                "resources.violet": tempBooster[5]
                            }
                        }, {
                            upsert: true //if this exist : update it //else : insert it
                        });

                        userCreated = true;

                    } else {
                        console.log('Creating the user...');

                        await new userSchema({
                            guildId,
                            userId,
                            resources: {
                                rouge: 0,
                                orange: 0,
                                jaune: 0,
                                vert: 0,
                                bleu: 0,
                                violet: 0
                            },
                            objects: {
                                o_arrosoir: false,
                                t_fermier: false
                            },
                            cards: {
                                s_stardew: false
                            }
                        }).save();
                        messageCreated = true;
                    }

                } while (!userCreated);

                if (messageCreated) {
                    message.reply("votre compte a été créé ! Votre inventaire est vide");
                }
                // } else if (!messageCreated) {
                //     message.reply(`Votre liste de peinture : \n ${result.resources.rouge} peinture rouge, \n ${result.resources.orange} peinture orange, \n ${result.resources.jaune} peinture jaune, \n ${result.resources.vert} peinture vert, \n ${result.resources.bleu} peinture bleu, \n ${result.resources.violet} peinture violet, \n`);
                // };

            } finally {
                mongoose.connection.close();
            }
        });
    });

    /** ***************************************************** COMMAND $inventory ***************************************************** */

    command(client, 'inventory', async message => {
        const guildId = message.guild.id;
        const userId = message.author.id;

        await mongo().then(async mongoose => {
            try {

                let userCreated = false;
                let messageCreated = false;
                let result;

                do {

                    console.log('Searching the user...');

                    result = await userSchema.findOne({
                        guildId,
                        userId
                    });

                    if (result) {

                        console.log('User found !');

                        userCreated = true;

                    } else {
                        console.log('Creating the user...');

                        await new userSchema({
                            guildId,
                            userId,
                            resources: {
                                rouge: 0,
                                orange: 0,
                                jaune: 0,
                                vert: 0,
                                bleu: 0,
                                violet: 0
                            },
                            objects: {
                                o_arrosoir: false,
                                t_fermier: false
                            },
                            cards: {
                                s_stardew: false
                            }
                        }).save();
                        messageCreated = true;
                    }

                } while (!userCreated);

                if (messageCreated) {
                    message.reply("votre compte a été créé ! Votre inventaire est vide");
                } else if (!messageCreated) {
                    message.reply(`Votre liste de peinture : \n ${result.resources.rouge} peinture rouge, \n ${result.resources.orange} peinture orange, \n ${result.resources.jaune} peinture jaune, \n ${result.resources.vert} peinture vert, \n ${result.resources.bleu} peinture bleu, \n ${result.resources.violet} peinture violet, \n`);
                };

            } finally {
                mongoose.connection.close();
            }
        });
    });

    /** ***************************************************** COMMAND $combine ***************************************************** */

    command(client, 'combine', async message => {
        const guildId = message.guild.id;
        const userId = message.author.id;
        const content = message.content;

        await mongo().then(async mongoose => {
            try {

                let userCreated = false;
                let messageCreated = false;
                let result;

                do {

                    console.log('Searching the user...');

                    result = await userSchema.findOne({
                        guildId,
                        userId
                    });

                    if (result) {

                        /* INSERT HERE THE FUNCTION */

                        console.log('User found !');

                        const split = content.split(' ');
                        split.shift();
                        text = split.join(' ');

                        if (text == '') {
                            message.reply('mettez les ressources que vous souhaitez combiner !');
                            return;
                        }

                        if (text.includes('test')) {
                            message.reply('test réussi');
                            return;
                        }

                        if (text.includes('rouge') && text.includes('orange')) {
                            if (result.resources.rouge > 0 && result.resources.orange > 0) {
                                message.reply('vous avez les ressources pour la combinaison');

                                await userSchema.findOneAndUpdate({
                                    guildId,
                                    userId
                                }, {
                                    $inc: {
                                        "resources.rouge": -1,
                                        "resources.orange": -1
                                    }
                                }, {
                                    upsert: true //if this exist : update it //else : insert it
                                });

                            }
                            if (result.resources.rouge == 0 || result.resources.orange == 0) {
                                if (result.resources.rouge == 0) {
                                    message.reply("vous n'avez pas de peinture rouge");
                                }
                                if (result.resources.orange == 0) {
                                    message.reply("vous n'avez pas de peinture orange");
                                }
                            }
                        }

                        console.log("contenu de text :");
                        console.log(text);
                        console.log("contenu de split :");
                        console.log(split);

                        userCreated = true;

                    } else {
                        console.log('Creating the user...');

                        await new userSchema({
                            guildId,
                            userId,
                            resources: {
                                rouge: 0,
                                orange: 0,
                                jaune: 0,
                                vert: 0,
                                bleu: 0,
                                violet: 0
                            },
                            objects: {
                                o_arrosoir: false,
                                t_fermier: false
                            },
                            cards: {
                                s_stardew: false
                            }
                        }).save();
                        messageCreated = true;
                    }

                }
                while (!userCreated);


                /* INSERT HERE THE MESSAGES */
                if (messageCreated) {
                    message.reply("votre compte a été créé ! Votre inventaire est vide");
                }
                // } else if (!messageCreated) {
                //     message.reply(`Votre liste de peinture : \n ${result.resources.rouge} peinture rouge, \n ${result.resources.orange} peinture orange, \n ${result.resources.jaune} peinture jaune, \n ${result.resources.vert} peinture vert, \n ${result.resources.bleu} peinture bleu, \n ${result.resources.violet} peinture violet, \n`);
                // };

            } finally {
                mongoose.connection.close();
            }
        });
    });

};

/** ***************************************************** BLANK COMMAND ***************************************************** */

// command(client, 'command', async message => {
//     const guildId = message.guild.id;
//     const userId = message.author.id;

//     await mongo().then(async mongoose => {
//         try {

//             let userCreated = false;
//             let messageCreated = false;
//             let result;

//             do {

//                 console.log('Searching the user...');

//                 result = await userSchema.findOne({
//                     guildId,
//                     userId
//                 });

//                 if (result) {

//                     /* INSERT HERE THE FUNCTION */ 

//                     console.log('User found !');

//                     userCreated = true;

//                 } else {
//                     console.log('Creating the user...');

//                     await new userSchema({
//                         guildId,
//                         userId,
//                         resources: {
//                             rouge: 0,
//                             orange: 0,
//                             jaune: 0,
//                             vert: 0,
//                             bleu: 0,
//                             violet: 0
//                         },
//                         objects: {
//                             o_arrosoir: false,
//                             t_fermier: false
//                         },
//                         cards: {
//                             s_stardew: false
//                         }
//                     }).save();
//                     messageCreated = true;
//                 }

//             } while (!userCreated);


//             /* INSERT HERE THE MESSAGES */
//             if (messageCreated) {
//                 message.reply("votre compte a été créé ! Votre inventaire est vide");
//             } else if (!messageCreated) {
//                 message.reply(`Votre liste de peinture : \n ${result.resources.rouge} peinture rouge, \n ${result.resources.orange} peinture orange, \n ${result.resources.jaune} peinture jaune, \n ${result.resources.vert} peinture vert, \n ${result.resources.bleu} peinture bleu, \n ${result.resources.violet} peinture violet, \n`);
//             };

//         } finally {
//             mongoose.connection.close();
//         }
//     });
// });



/* const userSchema = mongoose.Schema({
    _id: reqString,
    name: reqString,
    resources: {
        rouge: Number,
        orange: Number,
        jaune: Number,
        vert: Number,
        bleu: Number,
        violet: Number
    },
    objects: {
        o_arrosoir: Boolean,
        t_fermier: Boolean,
    },
    cards: {
        s_stardew: Boolean
    }
}); */