const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        console.log(`Bot is Ready! Logged in as ${client.user.tag}!`);

        // Statcord
        client.statcord.autopost();

        // Activity
        client.user.setActivity(`Truth or Dare`, { type: 'PLAYING' });
    }
};