// keepAlive server
const keepAlive = require('./server');

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const Statcord = require("statcord.js");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");


// Intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });

// // Collections
client.commands = new Collection();
client.pcommands = new Collection();
client.devCommands = new Collection();

// Statcord
const statcord = new Statcord.Client({
	client,
	key: `${process.env.STATCORD_KEY}`,
	postCpuStatistics: false, /* Whether to post memory statistics or not, defaults to true */
	postMemStatistics: false, /* Whether to post memory statistics or not, defaults to true */
	postNetworkStatistics: false, /* Whether to post memory statistics or not, defaults to true */
});
client.statcord = statcord;

// Sentry
Sentry.init({
	dsn: `${process.env.SENTRY_DSN}`,
	tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
	op: "Start Bot",
	name: "Start Bot",
  });
  transaction.finish();

// Load all interaction commands
const commandFolders = fs.readdirSync('./commands/interaction')
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/interaction/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/interaction/${folder}/${file}`);
		client.commands.set(command.data.name, command)
	}
}

// Load all prefix commands
const pcommandFolders = fs.readdirSync('./commands/prefix')
for (const folder of pcommandFolders) {
	const pcommandFiles = fs.readdirSync(`./commands/prefix/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of pcommandFiles) {
		const pcommand = require(`./commands/prefix/${folder}/${file}`);
		client.pcommands.set(pcommand.name, pcommand)
	}
}

// Load developer commands
const devCommandFiles = fs.readdirSync(`./dev/`).filter(file => file.endsWith('.js'));
for (const file of devCommandFiles) {
	const devCommand = require(`./dev/${file}`);
	client.devCommands.set(devCommand.name, devCommand);
}

// Load all events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

// error handling
client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

statcord.on("autopost-start", () => {
	// Emitted when statcord autopost starts
	console.log("Started autopost");
});
statcord.on("post", status => {
	// status = false if the post was successful
	// status = "Error message" or status = Error if there was an error
	if (!status) console.log("Successful post");
	else console.error(status);
});

// keepAlive server
keepAlive();

// login
client.login(process.env.CLIENT_TOKEN);
