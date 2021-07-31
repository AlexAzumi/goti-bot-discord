import { PresenceStatusData } from 'discord.js'
// Interfaces
import { Command } from '../interfaces/command.interface'

const validStatuses = [
  'online',
  'idle',
  'dnd',
  'invisible',
] as PresenceStatusData[]

export default [
  {
    name: 'update-activity',
    description: 'Updates the bot activity',
    async execute(message, args, client) {
      if (!args[0]) {
        message.reply('es necesario proveer la nueva actividad')

        return
      }

      const activity = args.reduce((previousValue, currentValue) => {
        return `${previousValue} ${currentValue}`
      })

      await client.user?.setActivity(activity)

      message.channel.send(
        'Bip bup. Mi actividad fue actializada correctamente. Bip bup'
      )
    },
  },
  {
    name: 'update-status',
    description: 'Updates the online status',
    async execute(message, args, client) {
      if (!args[0]) {
        message.reply('es necesario proveer el nuevo estado')

        return
      } else if (!validStatuses.includes(args[0] as PresenceStatusData)) {
        message.reply(
          'has ingresado un valor inválido. Solo está permitido usar "online", "idle", "dnd" o "invisible"'
        )

        return
      }

      await client.user?.setStatus(args[0] as PresenceStatusData)

      message.channel.send(
        'Bip bup. Mi estado fue actualizado correctamente. Bip bup'
      )
    },
  },
] as Command[]
