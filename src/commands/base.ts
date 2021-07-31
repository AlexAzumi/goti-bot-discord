import { Command } from '../interfaces/command.interface'

export default [
  {
    name: 'hello',
    description: 'El bot te saluda',
    execute(message) {
      message.channel.send(`Hola, ${message.author}`)
    },
  },
] as Command[]
