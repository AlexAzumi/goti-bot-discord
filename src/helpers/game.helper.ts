import { EmbedFieldData, MessageEmbed } from 'discord.js'
// Interfaces
import { GameInfo } from '../interfaces/game-info.interface'

/**
 * Generates a game info embed message
 * @param game - Game information
 * @returns Discord message embed with the game information
 */
export const getGameInfoEmbed = (game: GameInfo): MessageEmbed => {
  let gamePlatforms = ''
  let gameGenres = ''
  let gameDevelopers = ''

  for (const platformData of game.platforms) {
    if (!gamePlatforms) {
      gamePlatforms = platformData.platform.name
    } else {
      gamePlatforms += `, ${platformData.platform.name}`
    }
  }

  for (const genre of game.genres) {
    if (!gameGenres) {
      gameGenres = genre.name
    } else {
      gameGenres += `, ${genre.name}`
    }
  }

  for (const developer of game.developers) {
    if (!gameDevelopers) {
      gameDevelopers = developer.name
    } else {
      gameDevelopers += `, ${developer.name}`
    }
  }

  console.log(gamePlatforms, gameGenres, gameDevelopers)

  return new MessageEmbed()
    .setTitle(game.name)
    .setDescription(game.description_raw)
    .setColor(`#${game.dominant_color}`)
    .setThumbnail(game.background_image)
    .addFields(
      {
        name: 'Plataforma(s)',
        value: gamePlatforms,
      },
      {
        name: 'Fecha de lazamiento',
        value: game.tba ? 'TBA' : game.released,
        inline: true,
      },
      {
        name: 'Metacritic',
        value: game.metacritic ?? '-',
        inline: true,
      },
      {
        name: 'ESRB',
        value: game.esrb_rating?.name ?? '-',
        inline: true,
      }
    )
    .addFields(
      {
        name: 'Géneros',
        value: gameGenres,
        inline: true,
      },
      {
        name: 'Sitio web',
        value: game.website ? game.website : '-',
        inline: true,
      },
      {
        name: 'Desarrollador(as)',
        value: gameDevelopers,
      }
    )
    .setImage(game.background_image_additional)
    .setFooter('Information provista por RAWG')
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
    .setFooter('Information provista por RAWG')
}
