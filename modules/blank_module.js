/** COPY AND PASTE THIS TO CREATE A NEW MODULE */

'use strict';

/**
 * TODO
 */

require("dotenv").config();

// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
// partials allow the bot to check on messages put before it's arrivals (example for message deletion)
const client = new Discord.Client({
    partials: ["MESSAGE"]
});

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log("Gisèle à lancé le module TODO"); //TODO
});



// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN)