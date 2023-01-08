const { readdirSync } = require("fs")
const { bot } = require("./bot.js")

function loadSlashCommands() {
	CommandsArray = [];
	readdirSync("./src/commands/slashCommands").forEach(dirs => {
		const slashCommandsFile = readdirSync(`./src/commands/slashCommands/${dirs}`).filter(file => file.endsWith(".js"))
		for(const file of slashCommandsFile) {
			const slashCommand = require(`../commands/slashCommands/${dirs}/${file}`)
			bot.slashCommands.set(slashCommand.name.toLowerCase(), slashCommand)
			console.log(`Loaded ${file} from ${dirs}!`)
			CommandsArray.push(slashCommand);
		}
	})
	bot.on("ready", (bot) => {
		bot.application.commands.set(CommandsArray)
	})
}
module.exports = { loadSlashCommands }
