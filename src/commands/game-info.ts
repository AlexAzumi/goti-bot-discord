import { AxiosResponse } from 'axios'
import { Message } from 'discord.js'
// Commons
import axios from '../commons/axios'
import logger from '../commons/logger'
// Config
import config from '../../configuration.json'
// Interfaces
import { Command } from '../interfaces/command.interface'
import { GameInfo } from '../interfaces/game-info.interface'
import { getGameInfoEmbed, getGameSearchEmbed } from '../helpers/game.helper'

export default [
  {
    name: 'info',
    description: 'Obtiene la información del un juego por ID',
    async execute(message, args) {
      if (!args[0]) {
        message.reply('no olvides ingresar el ID del juego')

        return
      }

      axios
        .get(`${config.api_url}/games/${args[0]}`)
        .then((response: AxiosResponse<GameInfo>) => {
          const embedMessage = getGameInfoEmbed(response.data)

          message.channel.send(embedMessage)
        })
        .catch((reason) => {
          logger.log({ level: 'error', message: reason })

          message.channel.send(
            'Bip bup. El juego no existe o no fue encontrado. Bip bup'
          )
        })
    },
  },
  {
    name: 'search-game',
    description: 'Busca juegos en la base de datos de RAWG',
    async execute(message, args) {
      if (!args[0]) {
        message.reply('no ingresaste el nombre del juego')

        return
      }

      const keywords = args.reduce((previousValue, currentValue) => {
        return `${previousValue} ${currentValue}`
      })

      axios
        .get(`${config.api_url}/games`, { params: { search: keywords } })
        .then((response: AxiosResponse<{ results: GameInfo[] }>) => {
          const embedMessage = getGameSearchEmbed(
            response.data.results,
            keywords
          )

          message.channel.send(embedMessage).then(async () => {
            const filter = (current: Message): boolean => {
              return current.author.id == message.author.id
            }

            try {
              const collected = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000,
                errors: ['time'],
              })
              const choice = collected.first()?.content

              // Get game ID
              const gameID = response.data.results[Number(choice) - 1]?.id

              if (gameID) {
                // Search game data
                axios
                  .get(`${config.api_url}/games/${gameID}`)
                  .then((response: AxiosResponse<GameInfo>) => {
                    const gameEmbed = getGameInfoEmbed(response.data)

                    message.channel.send(gameEmbed)
                  })
                  .catch((reason) => {
                    logger.log({ level: 'error', message: reason })

                    message.channel.send(
                      'Bip bup. Se generó un error al buscar el juego. Bip bup'
                    )
                  })
              } else {
                message.channel.send(
                  'Bip bup. El número ingresado no es válido. Bip bup'
                )
              }
            } catch {
              return message.channel.send(
                'Bip bup. No seleccionaste una opción. Bip bup'
              )
            }
          })
        })
        .catch((reason) => {
          logger.log({ level: 'error', message: reason })

          message.channel.send(
            'Bip bup. El juego no existe o no fue encontrado. Bip bup'
          )
        })
    },
  },
] as Command[]
