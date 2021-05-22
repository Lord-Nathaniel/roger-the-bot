'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

require("dotenv").config();

// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('Gisèle fonctionne !')
})

// Create an event listener for messages
client.on('message', message => {
    // If the message is "baka"
    if (message.content === 'coucou') {
        // Send "ara ara" to the same channel
        message.channel.send('bande de nouilles');
    }
    if (message.content === 'cat?') {
        // Send "ara ara" to the same channel
        message.channel.send('chat va bien :)');
    }
    if (message.content === 'cool ça marche') {
        // Send "ara ara" to the same channel
        message.channel.send('cool ta vie');
    }
});


// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN)