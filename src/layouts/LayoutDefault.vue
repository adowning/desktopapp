<template>
  <div class="LayoutDefault">
    <!-- <nav-bar /> -->
    <!-- <slot> -->
    <side-nav />
    <!-- </slot> -->
    <main class="LayoutDefault__main">
      <transition name="fade" mode="out-in">
        <slot />
      </transition>
    </main>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav'
// import NavBar from '@/components/NavBar'
import { mapState } from 'vuex'

export default {
  name: `LayoutDefault`,
  components: {
    SideNav,
    // NavBar,
  },
  data() {
    return {
      // currentUser: null,
    }
  },
  computed: {
    ...mapState('User', ['user']),
  },
  //  async created() {
  //     // Simulate fetching user data.
  //     this.currentUser = await Parse.
  //     // setTimeout(() => {
  //     //   this.user = { name: `John Doe` }
  //     // }, 2000)
  //   },
}
</script>

<style lang="scss">
.LayoutDefault {
  // max-width: 42em;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1em;
  padding-left: 1em;
  &__nav {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #c0c0c0;
  }
  &__user {
    float: right;
  }
  &__main {
    padding-top: 1.5em;
    padding-bottom: 2em;
  }
  &__footer {
    padding-top: 1em;
    padding-bottom: 1em;
    border-top: 1px solid #c0c0c0;
  }
}
</style>
