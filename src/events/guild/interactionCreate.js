const { InteractionType, EmbedBuilder } = require("discord.js")
const permList = require("../../assets/permission.json")
module.exports = async (bot, inter) => {
	if(inter.type == InteractionType.ApplicationCommand){
		const slashCmd = bot.slashCommands.get(inter.commandName)
		const errorEmbed = new EmbedBuilder()
		errorEmbed.setTitle("Error!")
		if(!slashCmd) return
		if(slashCmd.minperms){
			for(let i = 0; i < slashCmd.minperms.length; i++) if(!inter.member.permissions.has(slashCmd.minperms[i])){
				let PermissionQuery = permList[slashCmd.minperms[i]]
				if(!Array.isArray(slashCmd.minperms[i])){
					errorEmbed.setDescription(`You are missing permissions: ${PermissionQuery}`)
					return inter.reply({ embeds: [errorEmbed] })
				}
				for (let perarray = 0; perarray < slashCmd.minperms[i].length; perarray++){
					let PermissionQuery = ""
					let MissingPermissionName = permList[slashCmd.minperms[i][perarray]]
					PermissionQuery + `\`${MissingPermissionName}\``
					if(slashCmd.minperms[i][perarray + 1]) PermissionQuery + ", "
					errorEmbed.setDescription(`You are missing permissions: ${PermissionQuery}`)
					return inter.reply({ embeds: [errorEmbed] })
				}
			}
		}
		try{
			slashCmd.execute({ inter, bot })
			return console.log(`${inter.user.tag} ran ${slashCmd.name} in ${inter.guild.id}`)
		} catch(e){
			errorEmbed.setDescription("Something went wrong!")
			inter.reply({ embeds: [errorEmbed] })
			return console.error(e)
		}
	}
	if(inter.type === InteractionType.MessageComponent){
		let ButtonID = await JSON.parse(inter.customId)
		let ButtonFile = await ButtonID.ffb
		if(!ButtonFile) return
		delete require.cache[require.resolve(`../../buttons/${ButtonFile}.js`)];
		const button = require(`../../buttons/${ButtonFile}.js`)
		if(button) return button({ bot, inter, ButtonID });
	}
}
