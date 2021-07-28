const config = require('../configuration.json')

module.exports = [
  {
    /**
     * Dany is way to horny
     */
    name: 'caliente',
    description: 'Está muy caliente suano',
    execute(message, args) {
      const taggedUser = message.mentions.users.first()

      if (!taggedUser) {
        message.channel.send(`A ${message.author} se le calentó suano`, {
          files: [config.images['ano-caliente']],
        })
      } else {
        message.channel.send(
          `${message.author} dice que a ${taggedUser} se le calentó suano`,
          {
            files: [config.images['ano-caliente']],
          }
        )
      }
    },
  },
  {
    /**
     * Dany wants to f**k
     */
    name: 'duro',
    description: 'Dany quiere duro',
    execute(message, args) {
      const taggedUser = message.mentions.users.first()

      if (!taggedUser) {
        message.channel.send(`${message.author} quiere dar bien duro`, {
          files: [config.images['darte-duro']],
        })
      } else {
        message.channel.send(
          `${message.author} quiere darle bien duro a ${taggedUser}`,
          {
            files: [config.images['darte-duro']],
          }
        )
      }
    },
  },
]
