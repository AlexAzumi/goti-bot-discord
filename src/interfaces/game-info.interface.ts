export interface GameInfo {
  /**
   * Game unique ID
   */
  id: number

  /**
   * Official name
   */
  name: string

  /**
   * Game description
   */
  description: string

  /**
   * Raw game description (no HTML tags)
   */
  description_raw: string

  /**
   * Release date
   */
  released: string

  /**
   * Game background image URI
   */
  background_image: string

  /**
   * List of platform that the game is available for
   */
  platforms: Platform[]

  /**
   * Dominant color of the game
   */
  dominant_color: string

  /**
   * Metacritic rating
   */
  metacritic: number

  /**
   * ESRB rating data
   */
  esrb_rating: ESRB_Rating
}

export interface Platform {
  platform: {
    id: number
    name: string
  }
}

export interface ESRB_Rating {
  id: number
  name: string
}
