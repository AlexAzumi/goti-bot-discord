import { Client, Message } from 'discord.js'

export interface Command {
  /**
   * Name of the command
   */
  name: string

  /**
   * Description of the command
   */
  description: string

  /**
   * Function called by the command
   * @param message - Discord message object
   * @param args - Command arguments
   */
  execute(message: Message, args: string[], client: Client): void
}
