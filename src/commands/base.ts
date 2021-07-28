import { Command } from '../interfaces/command.interface'

export default [
  {
    name: 'hola',
    description: 'El bot te saluda',
    execute(message) {
      message.channel.send(`Hola, ${message.author}`)
    },
  },
] as Command[]
