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
                console.log('Searching the user...');

                const result = await userSchema.findOne({
                    guildId,
                    userId
                });

                if (result) {
                    //TODO le profil existed
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
                    return;


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
                    message.reply("Utilisateur créé ! Vous pouvez retaper votre commande");
                    return;
                }

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
                console.log('Searching the user...');

                const result = await userSchema.findOne({
                    guildId,
                    userId
                });

                if (result) {
                    //TODO le profil existed
                    console.log('User found !');

                    message.reply(`Votre liste de peinture : \n ${result.resources.rouge} peinture rouge, \n ${result.resources.orange} peinture orange, \n ${result.resources.jaune} peinture jaune, \n ${result.resources.vert} peinture vert, \n ${result.resources.bleu} peinture bleu, \n ${result.resources.violet} peinture violet, \n`);

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
                    message.reply("Utilisateur créé ! Vous pouvez retaper votre commande");
                    return;
                }

            } finally {
                mongoose.connection.close();
            }
        });
    });




}

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

async function createUser() {
    //TODO il faut creer le profil
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
    return;
}