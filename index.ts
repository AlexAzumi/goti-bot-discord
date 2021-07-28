import Discord from 'discord.js'
import fs from 'fs'
// Bot configuration
import config from './configuration.json'
// Interfaces
import { Command } from './src/interfaces/command.interface'

const client = new Discord.Client()

/**
 * The Discord is logged into the system
 */
client.once('ready', () => console.log('My bot is ready!'))

const commands = new Discord.Collection<string, Command>()

// Read all commmand files
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file) => file.endsWith('js'))

console.log(commandFiles)

for (const file of commandFiles) {
  const fileCommands = require(`./src/commands/${file}`)

  for (const command of fileCommands) {
    commands.set(command.name, command)
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
  const command = args.shift()?.toLowerCase() ?? ''

  if (!commands.has(command)) {
    return
  }

  try {
    commands.get(command)?.execute(message, args)
  } catch (error) {
    console.error(error)
    message.channel.send('Bip bup. Se ha generado un error. Bip bup')
  }
})

// Log into Discord
client.login(process.env.DISCORD_BOT_TOKEN)