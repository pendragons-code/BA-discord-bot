const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js")
module.exports = {
	name: "help",
	aliases: [],
	category: "core",
	description: "A basic help command!",
	utilisation: "help",
	async execute({ bot, inter }) {
		const buttonTest = new EmbedBuilder()
		buttonTest.setTitle("Help Area!")
		buttonTest.setDescription(`${bot.slashCommands.map(x => `\`${x.name}\``).join(", ")}`)
		buttonTest.setFooter({ text: `${bot.slashCommands.size} commands available!` })
		//button
		const addBot = new ButtonBuilder()
		.setLabel('Add Bot!')
		.setCustomId(JSON.stringify({ffb: 'addBot'}))
		.setStyle('Primary')
		const row1 = new ActionRowBuilder().addComponents(addBot)
		inter.reply({ embeds: [buttonTest], components: [row1] })
	},
};
