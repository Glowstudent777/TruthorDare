const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'ping',
    description: "Pong!",

    async execute(message, args, client) {

        const ping = new MessageEmbed()
            .setColor('#50C878')
            .setTitle('Pong!')
            .setDescription(`${message.author.username}'s ping is ${Date.now() - message.createdTimestamp}ms`)
            .setTimestamp();
        message.reply({ embeds: [ping] });
    },
};
