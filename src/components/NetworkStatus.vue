<template>
<div>
       <!-- <img src="@/assets/logo.svg" :class="loading ? 'rotate' : 'notrotate'" width="24" /> -->
           <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="loading"
      :color="online? 'success' : 'error'"
      @click="loader = 'loading4'"
     x-small
            fab

    >
      <!-- Icon Loader -->
      <img src="@/assets/logo.svg" :class="loading ? 'rotate' : 'notrotate'" width="24" />
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </template>
    </v-btn>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Parse from 'parse'
      const LiveQueryClient = Parse.LiveQueryClient;
export default {
name: 'NetworkStatus',
  data: vm => ({
    //   loading: false
    }),
      computed: {
    ...mapState(['loading']),
    ...mapState(['online']),
  },

  created(){
// let client = new LiveQueryClient({
//   applicationId: '',
//   serverURL: '',
//   javascriptKey: '',
//   masterKey: ''
// });

// client.on('open', () => {
//   console.log('connection opened');
//     this.online = true
// });
//   client.on('error', (error) => {
//   console.log('connection error');
//   this.online = false
//   this.clientErrored()
// });
// client.on('close', () => {
//   console.log('connection opened');
//     this.online = false
// });

// this.openClient()
  },
  methods:{
  openClient(){
client.open();
      },

 clientErrored(){

      },
  }

}
</script>

<style>

</style>