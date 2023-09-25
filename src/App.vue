<script lang="ts">
import {PokemonDataService} from './services/PokemonDataService'


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

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
