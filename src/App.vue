<template>
  <div id="app">
    <nav-bar />
    <v-app id="inspire" :dark="darkMode">
     <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
    </v-app>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import NavBar from './components/NavBar'
export default {
  name: 'app',
  components: { NavBar },
  computed: {
    ...mapState(['darkMode']),
  },
  data() {
    return {
      layout: `div`,
      currentSession: null,
    }
  },
  created() {
    //  try{
    //  this.currentSession  = await Parse.Session.current()
    //  }catch(e){
    //   handleParseError(e)
    //  }
  },
  watch: {
    onDarkThemeChanged(value) {
      this.$vuetify.theme.dark = value
    },
  },
}
</script>

<style lang="scss">
$body-font-family: '@/assets/fonts/HelveticaNowText-Thin';
html {
  font-family: $body-font-family, sans-serif !important;
  max-height: 690px !important;
  max-width: 1190px !important;

  overflow-y: hidden !important; /* Hide scrollbars */
  overflow-x: hidden !important; /* Hide scrollbars */
}
// .container {
//   padding: 6px !important;
//   margin-left: 50px !important;
//   margin-right: 0px !important;
//   padding-right: 0px !important;
// }

#app {
  font-family: $body-font-family, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  // overflow: hidden; /* Hide scrollbars */
  -moz-osx-font-smoothing: grayscale;
  // color: #164b73;
  padding-top: 0%;
  padding-left: 0%;

  // overflow-y: hidden !important; /* Hide scrollbars */
  // overflow-x: hidden !important; /* Hide scrollbars */
  // background-position: -663px -6px;
  // background-size: 100% 100%;
  max-height: 680px !important;
  max-width: 1200px !important;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.rotate {
  animation: rotation 8s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

/* Glow for dropdown/card-hover*/
.dark-mode .v-menu__content,
.dark-mode .v-card--hover:hover {
  box-shadow: 0 5px 20px rgba(142, 255, 252, 0.74);
}

.dark-mode .logo {
  filter: brightness(0);
}
.v-list--two-line .v-list-item,
.v-list-item--two-line {
  min-height: 44px;
}
.v-form {
  margin-left: 4px;
}
.v-list--two-line .v-list-item,
.v-list-item--two-line {
  max-height: 34px;
}
.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}
.card-img-overlay {
  display: none;
  transition: all 0.5s;
}
.card-img-overlay button {
  margin-top: 20vh;
}
.card:hover .card-img-overlay {
  display: block;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
