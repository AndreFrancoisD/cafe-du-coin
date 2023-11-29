
<template>
    <div class="content">
        <div class="column">
            <h1>LISTE DES JEUX</h1>
            <ul>
                <li v-for="(game, i) in games" :key="i">

                    {{ game.title }} ({{ game.returned ? 'disponible' : 'emprunté' }})
                    <button class="btn btn-default" :value=game.id @click="getHistory(game)">history</button>
                </li>
            </ul>
        </div>
        <div class="column" id="history">

        </div>
    </div>
</template>

<script  lang="ts">

import axios, { toFormData } from 'axios';

import { getAuthToken } from '../utils/auth';
import { createApp } from 'vue';
import HistoryVue from './History.vue';
const REST_ENDPOINT = 'http://localhost:3000/';

type Game = {
    id: number,
    title: string,
    returned: boolean
}

type HistoryItem = {
    id: number,
    borrow_date: Date,
    return_date: Date
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

            const token = getAuthToken();

            axios({
                url: `${REST_ENDPOINT}api/v1/game`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    this.games = [];
                    this.games.push(...result.data);
                })
                .catch((error) => {
                    // If token expired
                    if (error.response != null && error.response.status == 401) {
                        this.$router.push('/login')
                    }
                    //TODO: handle other kind of errors
                });
        },

        async getGame(id: number) {

            return new Promise((resolve, reject) => {
                const token = getAuthToken();

                axios({
                    url: `${REST_ENDPOINT}api/v1/game/${id}`,
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then((result) => {
                        if (result.data.length > 0)
                            resolve(result.data[0]);
                        else throw new Error('This game does not exist.')
                    })
                    .catch((error) => {
                        // If token expired
                        if (error.response != null && error.response.status == 401) {
                            this.$router.push('/login')
                        }
                        reject(error);
                        //TODO: handle other kind of errors
                    });

            })


        },

        async getHistory(game: Game) {

            const token = getAuthToken();

            axios({
                url: `${REST_ENDPOINT}api/v1/history/${game?.id}`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    this.openHistoryPanel(game, result.data);
                })
                .catch((error) => {
                    // If token expired
                    if (error.response != null && error.response.status == 401) {
                        this.$router.push('/login')
                    }
                    //TODO: handle other kind of errors
                });
        },

        openHistoryPanel(game: Game, history: HistoryItem[]) {

            const tempDiv = document.createElement('div');
            const target = document.querySelector('#history') as HTMLDivElement
            const instance = createApp(HistoryVue).mount(tempDiv);

            //TODO: override type for ComponentPublicInstance
            //@ts-ignore
            instance.game = game;
            //@ts-ignore
            instance.history = history;
            //@ts-ignore
            instance.parent = this;

            // Remove history of another game if displayed.
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
            target.appendChild(tempDiv);
        }
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