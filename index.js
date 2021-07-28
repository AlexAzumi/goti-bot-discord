const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client()

// Bot configuration
const config = require('./configuration.json')

/**
 * The Discord is logged into the system
 */
client.once('ready', () => console.log('My bot is ready!'))

client.commands = new Discord.Collection()

// Read all commmand files
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('js'))

for (const file of commandFiles) {
  const fileCommands = require(`./commands/${file}`)

  for (const command of fileCommands) {
    client.commands.set(command.name, command)
  }
}

/**
 * The Discord bot received a message
 */
client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) {
    return
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) {
    return
  }

  try {
    client.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)
    message.channel.send('Bip bup. Se ha generado un error. Bip bup')
  }
})

// Log into Discord
client.login(process.env.DISCORD_BOT_TOKEN)
