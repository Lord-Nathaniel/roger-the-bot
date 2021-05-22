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
const FLUTE_ME_COMMAND = "flute-me";

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('Gisèle à lancé le module ping')
})

// Create an event listener for messages
client.on("message", message => {
    // If the message is "baka"
    if (message.content === 'coucou') {
        // Send "ara ara" to the same channel
        message.channel.send('bande de nouilles');
        message.reply("ctoi la nouille");
    }
    if (message.content === 'cat?') {
        // Send "ara ara" to the same channel
        message.channel.send('chat va bien :)');
    }
    if (message.content === 'cool ça marche') {
        // Send "ara ara" to the same channel
        message.channel.send('cool ta vie');
    }
    //give an heart emoji
    if (message.content === "j'aime les castors") {
        message.react("\u{1F499}");
    }
    //give the "flutted" role
    if (message.content === `${ BOT_PREFIX }${ FLUTE_ME_COMMAND }`) {
        fluteUser(message.member);
    }
});

//React to message deletion
client.on("messageDelete", message => {
    message.reply("Je t'ai vu supprimer ce message ( ͡° ͜ʖ ͡°)");
})

function fluteUser(member) {
    member.roles.add("845764114814337061");
}

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN)