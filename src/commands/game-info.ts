import Discord from 'discord.js'
import { AxiosResponse } from 'axios'
// Commons
import axios from '../commons/axios'
// Config
import config from '../../configuration.json'
// Interfaces
import { Command } from '../interfaces/command.interface'
import { GameInfo } from '../interfaces/game-info.interface'

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
          const {
            name,
            released,
            background_image,
            platforms,
            dominant_color,
            metacritic,
            esrb_rating,
            description_raw,
          } = response.data

          let gamePlatforms = ''

          for (const platformData of platforms) {
            if (!gamePlatforms) {
              gamePlatforms = platformData.platform.name
            } else {
              gamePlatforms += `, ${platformData.platform.name}`
            }
          }

          const embedMessage = new Discord.MessageEmbed()
            .setTitle(name)
            .setDescription(description_raw)
            .setColor(dominant_color)
            .setThumbnail(background_image)
            .addFields(
              {
                name: 'Plataforma(s)',
                value: gamePlatforms,
              },
              {
                name: 'Fecha de lazamiento',
                value: released,
                inline: true,
              },
              {
                name: 'Metacritic',
                value: metacritic,
                inline: true,
              },
              {
                name: 'ESRB',
                value: esrb_rating.name,
                inline: true,
              }
            )

          message.channel.send(embedMessage)
        })
        .catch(() => {
          message.channel.send(
            'Bip bup. El juego no existe o no fue encontrado. Bip bup'
          )
        })
    },
  },
] as Command[]
