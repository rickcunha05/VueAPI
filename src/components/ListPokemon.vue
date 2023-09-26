<script lang="ts">
import {PokemonDataService} from '../services/PokemonDataService'


 interface PokemonData{
  id: number,
  name: string,  
  imageFront: string,
  imageBack: string,
  //stats: string
}
import axios from 'axios';

export default {
  data() {
    return {
      pokemonList: [] as PokemonData[], 
    };
  },
  mounted() {
    this.PokemonDataService();
  },
  methods: {
    async PokemonDataService() {      
      try {
      const response = await PokemonDataService.getPokemon(); 
        const results = response.data.results;

        const promises = results.map(async (pokemon:any) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });

        const pokemonData = await Promise.all(promises);
        console.log(pokemonData)

        this.pokemonList = pokemonData.map((pokemon) => {          
          return {
            id: pokemon.id,
            name: pokemon.name,
            imageFront: pokemon.sprites.other['official-artwork'].front_default,
            imageBack: pokemon.sprites.other['official-artwork'].front_shiny,
            //stats: pokemon.types
            
          };
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <ul>
      <li v-for="pokemon in pokemonList" :key="pokemon.id">
        #{{ pokemon.id }} - {{ pokemon.name }}
        <img :src="pokemon.imageFront" />
        <img :src="pokemon.imageBack" />
      </li>
    </ul>
  </div>
</template>