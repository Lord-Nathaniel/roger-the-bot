'use strict';

// Import the discord.js module
const Discord = require('discord.js');
const command = require('./command');
// Create an instance of a Discord client
const client = new Discord.Client();

const config = require('./config.json');
//Modules enabled 
const basics = require('./modules/module_basics');
const welcome = require('./modules/module_welcome');
const messageCount = require('./modules/module_message_counter');
const resources = require('./modules/module_resources');
const compose = require('./modules/module_img_compose');

/*********** [ FUNCTION WHEN PLAYING ] **********/
client.on('ready', async() => {
    console.log("Gisèle est prête !");

    basics(client);
    welcome(client);
    // messageCount(client);
    resources(client);
    compose(client);
});

/*********** [ FUNCTION WHEN DISCONNECTING ] **********/

client.on('disconnect', function() {
    console.warn("Disconnecting...");
});

//using config.json file :
client.login(config.token);

//using .env file :
// client.login(process.env.BOT_TOKEN);