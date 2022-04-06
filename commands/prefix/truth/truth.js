const { MessageEmbed } = require('discord.js');
const { Truths } = require('../../../config/truth.json');

module.exports = {
    name: 'truth',
    description: "Gives a random question that has to be answered truthfully.",

    async execute(message, client) {

        const truths = {
            "PG": Truths.Ratings.map(ratings => ratings.PG.map(pg => pg)).flat(),
            "PG13": Truths.Ratings.map(ratings => ratings.PG13.map(pg13 => pg13)).flat(),
            "R": Truths.Ratings.map(ratings => ratings.R.map(r => r)).flat(),
        }

        let args = message.content.trim().split(/ +/g);

        if (args[2]) return message.reply('Too many arguments.');

        let rating = args[1];
        let possibleRatings = ['pg', 'pg13', 'r'];
        if (!possibleRatings.includes(rating) && rating !== undefined) {
            return message.reply('Please specify a rating. Possible ratings are: `pg`, `pg13`, and `r`.');
        }

        if (!truths.PG) {
            truths.PG = "Nothing has been added for PG.";
        }
        if (!truths.PG13) {
            truths.PG13 = "Nothing has been added for PG13.";
        }
        if (!truths.R) {
            truths.R = "Nothing has been added for R.";
        }

        // randomly select a truth
        let random;
        let truth;
        let ratingtruths;
        let ID;

        if (rating === 'pg') {
            random = Math.floor(Math.random() * Truths.Ratings.map(ratings => ratings.PG.map(rating => rating.Truth)).flat().length);
            truth = truths.PG[random].Truth;
            ID = truths.PG[random].ID;
            ratingtruths = 'PG';
        }

        if (rating === 'pg13') {
            random = Math.floor(Math.random() * Truths.Ratings.map(ratings => ratings.PG13.map(rating => rating.Truth)).flat().length);
            truth = truths.PG13[random].Truth;
            ID = truths.PG13[random].ID;
            ratingtruths = 'PG13';
        }

        if (rating === 'r') {
            random = Math.floor(Math.random() * Truths.Ratings.map(ratings => ratings.R.map(rating => rating.Truth)).flat().length);
            truth = truths.R[random].Truth;
            ID = truths.R[random].ID;
            ratingtruths = 'R';
        }

        // If no rating pg and pg13 are selected, then select a random truth
        if (!rating || rating === undefined) {
            choice = Math.floor(Math.random() * 2) + 1; // 1 or 2

            if (choice === 1) {
                random = Math.floor(Math.random() * Truths.Ratings.map(ratings => ratings.PG.map(rating => rating.truth)).flat().length);
                truth = truths.PG[random].Truth;
                ID = truths.PG[random].ID;
                ratingtruths = 'PG';
            }

            if (choice === 2) {
                random = Math.floor(Math.random() * Truths.Ratings.map(ratings => ratings.PG13.map(rating => rating.truth)).flat().length);
                truth = truths.PG13[random].Truth;
                ID = truths.PG13[random].ID;
                ratingtruths = 'PG13';
            }
        }

        const embed = new MessageEmbed()
            .setColor('#4ecdc4')
            .setTitle(`${truth}`)
            .setFooter({ text: `Type: TRUTH | Rating: ${ratingtruths} | ID: ${ID}` })
        return message.reply({ embeds: [embed] });

    },
};
