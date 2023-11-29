<template>
  <h2 v-if="game">HISTORIQUE DE <i>{{ game?.title }}</i></h2>

  <span v-if="game && game?.returned" class="dispo">DIPONIBLE </span>
  <span v-if="game && !game?.returned" class="nondispo">NON DISPONIBLE</span>
  <!-- <button class="btn btn-default" style="margin: 10px;"  @click="borrowOrReturn()">return</button> -->
  <input v-if="game" type="button" :value="game?.returned ? 'PRETER' : 'RETOUR'" @click="borrowOrReturn(game)" />
  <ul>
    <li v-for="(item, i) in history" :key="i">
      <span>Emprunté le {{ new Date(item.borrow_date).toLocaleDateString() }}</span> - <span
        v-if="item.return_date != null">Rendu le {{ new Date(item.return_date).toLocaleDateString() }}</span>
    </li>
  </ul>
</template>
  
<script lang="ts">
import axios from 'axios';
import { getAuthToken, getUserInfo } from '../utils/auth';

const REST_ENDPOINT = 'http://localhost:3000/';

type HistoryItem = {
  id: number,
  borrow_date: string,
  return_date: string
}

type Game = {
  id: number,
  title: string,
  returned: boolean
}

type User = {
  id: number,
  name: string,
  email: string,
  pwd: string,
  username: string
}

export default {

  name: 'History',
  data(): { history: HistoryItem[], game: Game | null } {
    return {
      history: [],
      game: null,
    };
  },
  methods: {
    async borrowOrReturn(game: Game | null) {

      if (game == null) return;

      const token = getAuthToken();
      const user = getUserInfo() as User;

      axios({
        url: `${REST_ENDPOINT}api/v1/game/${game?.id}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          returned: !game?.returned,
          userId: user?.id
        },

      })
        .then((result) => {
          if (result.status == 200) {
            console.log(`Game ${game.title} updated`);
          
            
            this.$emit('gameupdated');
            //this.$forceUpdate();
          }
        })
        .catch((error) => {
          // If token expired
          if (error.response != null && error.response.status == 401) {
            this.$router.push('/login')
          }
          //TODO: handle other kind of errors
        });
    },
  }
}


</script>

<style>
.dispo {
  color: green;
}

.nondispo {
  color: red;
}
</style>