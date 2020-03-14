<template>
  <v-app-bar style="-webkit-app-region: drag;" :clipped-left="false" height="32" dense flat app color="#fff" >
    <v-toolbar-title style="margin-left: 20px; width: 140px; font-family: 'Berkshire Swash', cursive;">
      <span class="hidden-sm-and-down ml-3">Andrews </span>
    </v-toolbar-title>
    <v-spacer />{{ $route.path }} <v-spacer />
    <!-- <v-btn x-small color="light-grey" style="-webkit-app-region: no-drag;" to="/dashboard">dashboard</v-btn><v-spacer /> -->
    <!-- <v-btn x-small style="-webkit-app-region: no-drag;" @click="getUserTimesheets">getUserTimesheets</v-btn><v-spacer /> -->
    <span v-if="isUserLoggedIn"> {{ user.firstName }}</span>
    <v-spacer />
    <div v-if="isUserLoggedIn && networkOnLine" class="nav-item">
      <v-icon color="light-grey"  large>mdi-magnify</v-icon>
      <!-- <v-badge :content="getOpenTasksByProfile" :value="getOpenTasksByProfile" color="green" overlap> -->
        <v-icon  large>mdi-bell-outline</v-icon>
      <!-- </v-badge> -->
    </div>
    <v-icon color="light-grey" class="ml-12" large>mdi-close-outline</v-icon>
  </v-app-bar>
</template>

<script>
import store, {MODULES} from '@/newstore'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'NavBar',
  props: {
    refreshingApp: Boolean,
  },

  mounted() {
    try {
      //console.log(parseApi.currentUser('firstName') + ' is logged in to parse')
    } catch (e) {
      //console.log('user is logged out of parse')
    }
  },
  computed: {
    // ...mapGetters('authentication', ['isUserLoggedIn']),
    // ...mapGetters('tasks', ['getOpenTasksByProfile']),
    // ...mapState('User', ['user']),
    // ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    networkOnLine(){
   return true
    },
    user(){
   return this.$store.getters['User/getUser']
    },
    isUserLoggedIn(){
   return store.getters[MODULES.User.getters.isAuthenticated]()
    }


  },
  watch: {
    user(val) {},
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
    },
    // async getUserTimesheets() {
    //   await this.$store.dispatch('timesheets/getUserTimesheets', this.user.objectId)
    // },
  },
}
</script>

<style></style>
