const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Dares } = require('../../../config/dare.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dare')

        .addStringOption(option =>
            option.setName('rating')
                .setDescription('The maturity level of the topics the question can relate to.')
                .setRequired(false)
                .addChoice('PG', 'pg')
                .addChoice('PG13', 'pg13')
                .addChoice('R', 'r'))

        .setDescription('Gives a dare that has to be completed.'),
    async execute(interaction, client, args) {

        const dares = {
            "PG": Dares.Ratings.map(ratings => ratings.PG.map(pg => pg)).flat(),
            "PG13": Dares.Ratings.map(ratings => ratings.PG13.map(pg13 => pg13)).flat(),
            "R": Dares.Ratings.map(ratings => ratings.R.map(r => r)).flat(),
        }

        let rating = interaction.options.getString('rating');

        if (!dares.PG) {
            dares.PG = "Nothing has been added for PG.";
        }
        if (!dares.PG13) {
            dares.PG13 = "Nothing has been added for PG13.";
        }
        if (!dares.R) {
            dares.R = "Nothing has been added for R.";
        }

        // randomly select a dare
        let random;
        let dare;
        let ratingDares;
        let ID;

        if (rating === 'pg') {
            random = Math.floor(Math.random() * Dares.Ratings.map(ratings => ratings.PG.map(rating => rating.Dare)).flat().length);
            dare = dares.PG[random].Dare;
            ID = dares.PG[random].ID;
            ratingDares = 'PG';
        }

        if (rating === 'pg13') {
            random = Math.floor(Math.random() * Dares.Ratings.map(ratings => ratings.PG13.map(rating => rating.Dare)).flat().length);
            dare = dares.PG13[random].Dare;
            ID = dares.PG13[random].ID;
            ratingDares = 'PG13';
        }

        if (rating === 'r') {
            random = Math.floor(Math.random() * Dares.Ratings.map(ratings => ratings.R.map(rating => rating.Dare)).flat().length);
            dare = dares.R[random].Dare;
            ID = dares.R[random].ID;
            ratingDares = 'R';
        }

        // If no rating pg and pg13 are selected, then select a random dare
        if (!rating) {
            choice = Math.floor(Math.random() * 2) + 1; // 1 or 2

            if (choice === 1) {
                random = Math.floor(Math.random() * Dares.Ratings.map(ratings => ratings.PG.map(rating => rating.Dare)).flat().length);
                dare = dares.PG[random].Dare;
                ID = dares.PG[random].ID;
                ratingDares = 'PG';
            }

            if (choice === 2) {
                random = Math.floor(Math.random() * Dares.Ratings.map(ratings => ratings.PG13.map(rating => rating.Dare)).flat().length);
                dare = dares.PG13[random].Dare;
                ID = dares.PG13[random].ID;
                ratingDares = 'PG13';
            }
        }

        // Dares.Ratings.map(ratings => ratings.PG.map(pg => pg)).flat().forEach(pg => {
        //     const dare = pg.Dare;
        //     const id = pg.ID;
        //     console.log(`[${id}] ${dare}`);
        // });

        const embed = new MessageEmbed()
            .setColor('#4ecdc4')
            .setTitle(`${dare}`)
            .setFooter({ text: `Type: DARE | Rating: ${ratingDares} | ID: ${ID}` })
        return interaction.reply({ embeds: [embed] });

    },
};
