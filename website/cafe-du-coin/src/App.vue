<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isLoggedIn } from './utils/auth'
</script>

<template>
  <RouterView />
</template>

<script lang="ts">
export default {
  methods: {
    // Check if an existing token exists.
    isLoggedIn() {
      return isLoggedIn()
    }
  }
}
</script>