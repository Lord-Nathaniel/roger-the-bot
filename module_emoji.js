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
const BOOSTER_COMMAND = "booster";
const BOOSTER_TABLE = ["\u{1F973}", "\u{1F60D}", "\u{1F30D}", "\u{1F359}", "\u{1F0CF}", "\u{1F355}", "\u{1F3B2}", "\u{1F404}", "\u{1F451}", "\u{1F44C}"];

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log("Gisèle à lancé le module emoji");
});

client.on("message", message => {
    //exit the function if the message doesn't start with the prefix or is from the bot
    if (!message.content.startsWith(BOT_PREFIX) || message.author.bot) return;

    //create an args and command to take input from user
    const args = message.content.slice((BOT_PREFIX).length).trim().split(' ');
    const command = args.shift().toLowerCase();

    //take a number in first argument, and display this number of emojis
    if (command === "booster") {
        if (!args.length) {
            return message.channel.send("Veuillez entrer un nombre de cartes à piocher !");
        }
        let number = args[0];
        let emoji = getRandomEmoji(number);
        message.channel.send(emoji);
    }
});

function getRandomEmoji(number) {
    let tempEmoji = [];
    for (let i = 0; i < number; i++) {
        let rand = Math.round(Math.random() * (BOOSTER_TABLE.length - 1));
        tempEmoji.push(BOOSTER_TABLE[rand]);
        console.log(rand);
    }
    return tempEmoji;
}

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN)