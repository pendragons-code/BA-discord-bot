module.exports = async ( bot ) => {
	console.log(`Logged in as ${bot.user.tag}! Serving ${bot.guilds.cache.size} servers and ${bot.users.cache.size} users!`)
}
