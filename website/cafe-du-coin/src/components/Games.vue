<template>
    <div class="content">
        <div class="column">
            <h1>LISTE DES JEUX</h1>
            <ul>
                <li v-for="(game, i) in games" :key="i">

                    {{ game.title }} ({{ game.returned ? 'disponible' : 'emprunté' }})
                    <button class="btn btn-default" :value=game.id @click="getHistory(game.id)">history</button>
                </li>
            </ul>
        </div>
        <div class="column">
            <div style="min-width:500px"></div>
        </div>
    </div>
</template>

<script  lang="ts">

import axios from 'axios';

import { getAuthToken } from '../utils/auth';
const REST_ENDPOINT = 'http://localhost:3000/';

type Game = {
    id: number,
    title: string,
    returned: boolean
}
export default {
    name: 'Games',
    data(): { games: Game[], id: number } {
        return {
            games: [],
            id: -1,
        };
    },
    methods: {
        async addGames() {

            try {

                const token = getAuthToken();

                const res = await axios({
                    url: `${REST_ENDPOINT}api/v1/game`,
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                this.games.push(...res.data);
            }
            catch (err) {
                //handle error;
            }

        },

        async getHistory(id: number) {
            const token = getAuthToken();            
            const res = await axios({
                url: `${REST_ENDPOINT}api/v1/history/${id}`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log(res.data);
        },



    },
    created() {
        this.addGames();
    },
}

</script>

<style>
.content {
    display: flex;
    flex-direction: column-column;
}

.column {
    width: 50%;
}
</style>