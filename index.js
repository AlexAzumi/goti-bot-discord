const Discord = require('discord.js')
const client = new Discord.Client()

// Bot configuration
const config = require('./configuration.json')

/**
 * The Discord is logged into the system
 */
client.once('ready', () => console.log('My bot is ready!'))

/**
 * The Discord bot received a message
 */
client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) {
    return
  }

  switch (message.content) {
    /**
     * Dany is way to horny
     */
    case '!caliente': {
      message.channel.send('Anda caliente', {
        files: [config.images['ano-caliente']],
      })

      break
    }

    case '!duro': {
      message.channel.send('Quiere darle bien duro', {
        files: [config.images['darte-duro']],
      })

      break
    }
  }
})

// Log into Discord
client.login(process.env.DISCORD_BOT_TOKEN)
