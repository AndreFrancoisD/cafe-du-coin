<template>
    <div class="center">
        <span>CAFE DU COIN</span>
        <div class="input-group">
            <label>Nom utilisateur</label>
            <input type="text" v-model="username" class="right">
        </div>

        <div class="input-group">
            <label>Mot de passe</label>
            <input type="password" v-model="password" class="right">
        </div>

        <button type="button" class="button right" v-on:click="login">Connection</button>
        
    </div>
</template>

<script lang="ts">

import { loginUser } from '../utils/auth';


export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                await loginUser(this.username, this.password);
                this.$router.push('/');
            }
            catch (err) {
                alert(`Error: ${err}`);
            }
        }
    }
}
</script>

<style>

</style>