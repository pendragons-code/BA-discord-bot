const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const HermitPurple = require("hermitpurple").default
const wikia = new HermitPurple("voxiomio", 1)
module.exports = {
	name: "wiki",
	aliases: [],
	category: "core",
	description: "A basic wiki command.",
	utilisation: "wiki",
	options: [
		{
			name: "search",
			description: "The search term to be sent to the wiki.",
			type: ApplicationCommandOptionType.String,
			required: true
		}
	],
	async execute({ bot, inter }) {
		let action = inter.options._hoistedOptions[0].value
		const wikiEmbed = new EmbedBuilder()
		wikia.search(action)
		.catch((error) => {
			return inter.reply({ content: "No results!" })
		})
		.then((results) => {
			wikiEmbed.setTitle(results[0].title)
			wikiEmbed.setURL(results[0].url)
			if(results[0].article < 2049) wikiEmbed.setDescription(results[0].article)
			if(results[0].img) wikiEmbed.setImage(results[0].img)
			return inter.reply({ embeds: [wikiEmbed] })
		})
	}
}
