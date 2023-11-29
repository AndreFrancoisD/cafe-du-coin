<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { isLoggedIn } from './utils/auth'
</script>

<template>
  
<RouterView />
  
</template>

<script lang="ts">
export default {
  methods: {
    isLoggedIn() {
      return isLoggedIn()
    }
  }
}
</script>

<style scoped>











 



</style>
