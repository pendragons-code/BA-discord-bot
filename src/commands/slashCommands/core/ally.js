const { db } = require("../../../loaders/bot.js")
const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require("discord.js")
module.exports = {
	name: "ally",
	category: "core",
	utilisation: "ally push/pull",
	description: "About allied clans",
	options: [
		{
			name: "argument",
			description: "Tell the bot to push/pull or view allied clans!",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "push", value: "push" },
				{ name: "pull", value: "pull" },
				{ name: "view", value: "view" }
			]
		},
		{
			name: "clan",
			description: "Clan to push and pull, leave empty in view.",
			type: ApplicationCommandOptionType.String,
			required: false,
		}
	],
	async execute({bot, inter}) {
		let action = inter.options._hoistedOptions[0].value
		let clan = ""
		let alliance = await db.get("BA_Allies")
		if(!inter.options._hoistedOptions[1]) clan = null
		if(inter.options._hoistedOptions[1] !== undefined) clan = inter.options._hoistedOptions[1].value
		if(clan !== null && clan.length > 18) return inter.reply("The voxiom wiki says clan names can only be 18 chars long!")
		switch(action) {
			case "push":
				if(clan === null) return inter.reply("Provide a clan!")
				if(!inter.member.permissions.has([PermissionsBitField.Flags.BanMembers]) || !inter.member.permissions.has([PermissionsBitField.Flags.KickMembers])) return inter.reply("You need at least the `Kick Members` or `Ban Members` permission to use this!")
				if(alliance.includes(clan)) return inter.reply("This clan is already in the system!")
				await db.push("BA_Allies", clan)
				.catch((error) => {
					console.error(error)
					inter.reply("something went wrong!")
				})
				return inter.reply(`Pushed ${clan} into system`)
				break
			case "pull":
				if(clan === null) return inter.reply("Provide a clan!")
				if(!inter.member.permissions.has([PermissionsBitField.Flags.BanMembers]) || !inter.member.permissions.has([PermissionsBitField.Flags.KickMembers])) return inter.reply("You need at least the `Kick Members` or `Ban Members` permission to use this!")
				if(!alliance.includes(clan)) return inter.reply("This clan is not in the system!")
				await db.pull("BA_Allies", clan)
				.catch((error) => {
					console.error(error)
					inter.reply("something went wrong!")
				})
				return inter.reply(`Pulled ${clan} from system`)
				break
			case "view":
				if(clan !== null) return inter.reply("Leave clan empty if view is selected!")
				if(alliance === null || alliance.length < 1) return inter.reply("BA currently has no allies!")
				const viewEmbed = new EmbedBuilder()
				viewEmbed.setTitle("Allies!")
				viewEmbed.setDescription(alliance.join(", "))
				return inter.reply({ embeds: [viewEmbed] })
				break
		}
	}
}
