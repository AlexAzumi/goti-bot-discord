import { EmbedFieldData, MessageEmbed } from 'discord.js'
import { GameInfo } from '../interfaces/game-info.interface'

/**
 * Generates a game info embed message
 * @param game - Game information
 * @returns Discord message embed with the game information
 */
export const getGameInfoEmbed = (game: GameInfo): MessageEmbed => {
  let gamePlatforms = ''

  for (const platformData of game.platforms) {
    if (!gamePlatforms) {
      gamePlatforms = platformData.platform.name
    } else {
      gamePlatforms += `, ${platformData.platform.name}`
    }
  }

  return new MessageEmbed()
    .setTitle(game.name)
    .setDescription(game.description_raw)
    .setColor(game.dominant_color)
    .setThumbnail(game.background_image)
    .addFields(
      {
        name: 'Plataforma(s)',
        value: gamePlatforms,
      },
      {
        name: 'Fecha de lazamiento',
        value: game.released,
        inline: true,
      },
      {
        name: 'Metacritic',
        value: game.metacritic,
        inline: true,
      },
      {
        name: 'ESRB',
        value: game.esrb_rating?.name ?? 'N/A',
        inline: true,
      }
    )
}

/**
 * Gets a Discord embed message with the results
 * @param games - Games array
 * @returns A Discord embed message with the first 5 results
 */
export const getGameSearchEmbed = (
  games: GameInfo[],
  keywords: string
): MessageEmbed => {
  const gameFields: EmbedFieldData[] = games.map((data, index) => {
    return {
      name: `${index + 1}.`,
      value: data.name,
    }
  })

  return new MessageEmbed()
    .setTitle(`Resultados: ${keywords}`)
    .setDescription('Estos fueron los resultados')
    .setColor('#fffff')
    .addFields(gameFields)
    .setThumbnail(games[0].background_image)
    .setFooter('Information obtenida de RAWG')
}
