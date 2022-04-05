module.exports = {
    name: 'messageCreate', // Name of the event
    async execute(client, message) {

            const {prefix} = require('../config/config.json');

            if(!message.content.startsWith(prefix) || message.author.bot) return;
            if(message.channel.type === 'dm') return;

            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.devCommands.get(commandName) || client.devCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            try {
                command.execute(message, args, client);
            } catch (error) {
                // ...
            }
    }
}