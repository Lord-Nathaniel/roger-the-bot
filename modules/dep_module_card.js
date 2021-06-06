'use strict';

/**
 * A module which save the card obtained in boosters in a database
 */

/****************************************************   [ ALL CONST AND VAR ]    ****************************************************/

require("dotenv").config();

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// Import the MongoDB config module
const config = require('../config.json');
const mongo = require('../mongo');


// // used for the DB
// const { connect } = require('mongoose');
// const { TOKEN } = require('./package.json');

//import the User model :
const UserModel = require('../schemas/User');

//list of command needed
const BOT_PREFIX = "$";
const TEST_COMMAND = "test";
const HELP_COMMAND = "help";
const BOOSTER_COMMAND = "booster";
const INVENTORY_COMMAND = "inventory";
const CREATE_COMMAND = "create";
const COMPLETE_COMMAND = "complete";


const BOOSTER_TABLE = ["rouge", "orange", "jaune", "vert", "bleu", "violet"];



// let SQL;
// const MYSQL = require('mysql');
// const DB = new MYSQL.createConnection({
//     host: "mongodb://localhost[:27017]",
//     user: "root",
//     password: "",
//     database: "giseledb"
// })


/****************************************************   [ DATABASE CONNECT AND ACCESS ]    ****************************************************/

// DB.connect(function(err) {
//     if (err) throw err;
//     console.log('La connection a réussie !')
// })

//function to connect to the MongoDB server
// (async() => {
//     await connect('mongodb://localhost/giseledb', {
//         useNewUrlParser: true,
//         userFindAndModify: false
//     });
//     return client.login(TOKEN)


// })()


/****************************************************   [ MODULE FUNCTIONS ]    ****************************************************/

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */

/*********** [ FUNCTION WHEN CONNECTING ] **********/

// non-async version
// client.on('ready', () => {
//     console.log("Gisèle à lancé le module card");
// });

//async version
client.on('ready', async() => {
    console.log("Gisèle à lancé le module card");

    await mongo().then(mongoose => {
        let failed = false;
        try { //try some code here
            console.log('Connecting to mongo...');
        } catch (e) { //handle the error here
            failed = true;
            console.log('Conection failed');
        } finally { //will always run
            //close the pending connection
            mongoose.connection.close();
            if (!failed) {
                console.log('Connection successful')
            }
        }
    });
});


/*********** [ FUNCTION WHEN PLAYING ] **********/

client.on("message", message => {
    //exit the function if the message doesn't start with the prefix or is from the bot
    if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;

    //create an args and command to take input from user
    const args = message.content.slice((BOT_PREFIX).length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === TEST_COMMAND) {
        message.channel.send("Je suis bien connecté !")
    }

    //display the command list with the help command
    if (command === HELP_COMMAND) {
        message.channel.send(
            "Bienvenue dans l'aide : \n Liste des commandes : \n $creation : créé un compte pour jouer. \n $booster : ouvre un booster de 5 cartes. \n $inventory : affiche une liste de vos ressources."
        );
    };

    // if (command === CREATE_COMMAND) {
    //     const doc = new UserModel({ id: message.user.id });
    //     await doc.save();
    //     message.reply(" compte créé ! ");
    // };

    // if (command === COMPLETE_COMMAND) {
    //     const req = await UserModel.findOne({ id: message.user.id });
    //     if (!req) {
    //         return message.reply("compte inexistant !");
    //     } else {
    //         return message.reply(" trouvé ceci : $(req.ressources)");
    //     }
    // };

    /** TODO */

    //take a number in first argument, and display this number of emojis
    // if (command === BOOSTER_COMMAND) {
    //     if (!args.length) {
    //         return message.channel.send("Veuillez entrer ***$booster X*** avec X votre nombre");
    //     }
    //     let number = args[0];
    //     let emoji = getRandomEmoji(number);
    //     message.channel.send(emoji);
    // };

    //Effectue l'inventaire de l'utilisateur si celui-ci est enregistré, sinon l'enregistre
    // if (command === INVENTORY_COMMAND) {
    //     DB.query('SELECT * FROM user WHERE user = $(message.author.id)', async(err, req) => {
    //         if (err) throw err;
    //         if (req.length < 1) {
    //             message.channel.send('Nouvel utilisateur, vous êtes enregistré dans la BDD');
    //             //INSERT
    //             SQL = `INSERT INTO user (user, username, message) VALUES (${message.author.id}, ${message.author.username}, ${message.content})`;
    //             DB.query(SQL, function(err) {
    //                 if (err) throw err;
    //             })
    //         } else {
    //             return;
    //         }
    //     })
    // };
});

// function getRandomEmoji(number) {
//     let tempEmoji = [];
//     for (let i = 0; i < number; i++) {
//         let rand = Math.round(Math.random() * (BOOSTER_TABLE.length - 1));
//         tempEmoji.push(BOOSTER_TABLE[rand]);
//         console.log(rand);
//     };
//     return tempEmoji;
// }


/*********** [ FUNCTION WHEN DISCONNECTING ] **********/

client.on('disconnect', function() {
    console.warn("Disconnecting...");
});


/****************************************************   [ MODULE CONNECTION ]    ****************************************************/

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN)