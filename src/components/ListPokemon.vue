<script lang="ts">
import {PokemonDataService} from '../services/PokemonDataService'


 interface PokemonData{
  id: number,
  name: string,  
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

        this.pokemonList = pokemonData.map((pokemon) => {
          return {
            id: pokemon.id,
            name: pokemon.name,
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
      </li>
    </ul>
  </div>
</template>