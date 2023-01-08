const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js")
module.exports = {
	name: "help",
	aliases: [],
	category: "core",
	description: "A basic help command!",
	utilisation: "help",
	async execute({ bot, inter }) {
		inter.reply("Hello World!")
		const buttonTest = new EmbedBuilder()
		buttonTest.setTitle("Hey there! This is a test!")
	        const addBot = new ButtonBuilder()
		.setLabel('Add Bot!')
		.setCustomId(JSON.stringify({ffb: 'addBot'}))
		.setStyle('Primary')
		const row1 = new ActionRowBuilder().addComponents(addBot)
		inter.channel.send({ embeds: [buttonTest], components: [row1] })
	},
};
