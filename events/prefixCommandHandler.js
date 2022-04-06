module.exports = {
    name: 'messageCreate', // Name of the event
    async execute(client, message) {

        const { prefix } = require('../config/config.json');

        if (!message.content.startsWith(prefix) || message.author.bot) return;
        if (message.channel.type === 'dm') return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.pcommands.get(commandName) || client.pcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // Statcord
        client.statcord.postCommand(pcommands.name, message.author.id, client);
        console.log(`[${pcommands.name}] ${message.author.tag} (${message.author.id})`);

        try {
            command.execute(message, args, client);
        } catch (error) {
            // ...
        }
    }
}