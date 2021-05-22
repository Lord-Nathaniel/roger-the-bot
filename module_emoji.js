'use strict';

/**
 * A module which send you a number of random emoji while asked
 */

require("dotenv").config();

// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();

const BOT_PREFIX = "$";
const BOOSTER_COMMAND = "flute-me";
const BOOSTER_TABLE = ["\u{1F973}", "\u{1F60D}", "\u{1F30D}", "\u{1F359}", "\u{1F0CF}"];

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log("Gisèle à lancé le module emoji");
});

// client.on("message", message => {
//     //on send $booster, give 5 random emoji
//     if (message.content === `${ BOT_PREFIX }${ BOOSTER_COMMAND }`) {
//         let number = 5;
//         let rand = getRandom(number);
//         for (let i = 0; i < number; i++) {
//             message.react(BOOSTER_ABLE[rand[i]]);
//         }
//     }
// });

// function getRandom(number) {
//     let tempNumb = [];
//     for (let i = 0; i < number; i++) {
//         tempNumb.push(Math.random() * BOOSTER_TABLE.length());
//     }
//     return tempNumb;
// }

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN)