'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

require("dotenv").config();

// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
// partials allow the bot to check on messages put before it's arrivals (example for message deletion)
const client = new Discord.Client({
    partials: ["MESSAGE"]
});

const BOT_PREFIX = "$";
const BOOSTER_COMMAND = "flute-me";

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('Gisèle à lancé le module emoji')
})