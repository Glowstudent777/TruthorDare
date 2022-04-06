const { MessageEmbed, Message } = require('discord.js');
const { Dares } = require('../../../config/dare.json');

module.exports = {
    name: 'dare',
    description: "Gives a dare that has to be completed.",

    async execute(message, client) {;

        const dares = {
            "PG": Dares.Ratings.map(ratings => ratings.PG.map(pg => pg)).flat(),
            "PG13": Dares.Ratings.map(ratings => ratings.PG13.map(pg13 => pg13)).flat(),
            "R": Dares.Ratings.map(ratings => ratings.R.map(r => r)).flat(),
        }

        let args = message.content.trim().split(/ +/g);

        if (args[2]) return message.reply('Too many arguments.');

        let rating = args[1];
        let possibleRatings = ['pg', 'pg13', 'r'];
        if (!possibleRatings.includes(rating) && rating !== undefined) {
            return message.reply('Please specify a rating. Possible ratings are: `pg`, `pg13`, and `r`.');
        }

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
        if (!rating || rating === undefined) {
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

        const embed = new MessageEmbed()
            .setColor('#4ecdc4')
            .setTitle(`${dare}`)
            .setFooter({ text: `Type: DARE | Rating: ${ratingDares} | ID: ${ID}` })
        return message.reply({ embeds: [embed] });

    },
};
