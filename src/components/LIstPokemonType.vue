<template>
  <div>
    <ul>
      <li v-for="nature in pokemonType" :key="nature.id">
        #{{ nature.id }} - {{ nature.type }}
      </li>
    </ul>
  </div>
</template>
<script  lang="ts">
import axios from "axios"
import {PokemonDataService} from '../services/PokemonDataService'
interface PokemonType{
  id: number,
  type: string,  
}
export default {
  data(){
    return{
      pokemonType:[] as PokemonType[]
    }
  },
  mounted(){
    this.PokemonDataService()
  },
  methods:{
    async PokemonDataService(){
      try{
        const response = await PokemonDataService.getPokemonType();
        const results = response.data.results;

        const promises = results.map(async (type: any) =>{
          const pokemonResponse = await axios.get(type.url)
          return pokemonResponse.data
          
        }) 
        const pokemonData = await Promise.all(promises)
        this.pokemonType = pokemonData.map((type) => {
          return {
            id: type.id,
            type: type.name,            
          }
        })
      }catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }
  }
}
</script>
<style lang="">
  
</style>