import config from './config'

export class PokemonDataService {
  static getPokemon(): Promise<any>{
    return config.get('/pokemon')
  }

  static getPokemonType(): Promise<any>{
    return config.get('/type')
  }
}
