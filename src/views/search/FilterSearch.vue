<template>
  <div>
      <h2> Filter Learn Vue Articles</h2>
      <input 
        type='text' 
        placeholder='Filter Search' 
        v-model='query'
      />
      <br>
      <button @click='reset'> Reset </button>
      <search-results :query='query'/>
  </div>
</template>


<script >
import { ref } from 'vue'
import SearchResults from '../../components/SearchResults.vue'

export default {
  components:{
    SearchResults
  },
  setup(){
    const query = ref('')
    const reset = (evt)=>{
      query.value = ''
    }

    return{
      reset,
      query
    }

  }

}

</script>

<style lang="scss" scoped>
 input[type='text'] {
    margin-bottom: 20px;
    padding: 10px;
  }
</style>
