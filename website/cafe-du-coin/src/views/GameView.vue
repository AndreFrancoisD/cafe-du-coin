<script setup lang="ts">
import Games from '../components/Games.vue'
import { nextTick, onUpdated } from 'vue'

const toto = () => {
  console.log('toto');
}
</script>

<template @gameupdated="toto()">
  <main>
    <Games />
  </main>
</template>