<template>
  <v-app class="chat">
    <!-- <template>
      <v-navigation-drawer class="pa-0 chat-drawer primary" fixed permanent app width="68">
        <chat-menu :items="menus" class="chat-drawer--menu"> </chat-menu>
      </v-navigation-drawer>
      <v-content class="chat-main">
        <router-view />
      </v-content>
    </template> -->
    <!-- <template v-else>
      <v-toolbar color="primary" fixed dark>
        <v-btn icon @click="handleClick">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content class="chat-main">
        <transition>
          <router-view></router-view>
        </transition>
      </v-content>
      <v-bottom-navigation :value="true" absolute color="primary" app fixed v-if="!hideBottomNav">
        <v-btn dark text :value="item.to.path" v-for="(item, index) in menus" :key="index" :to="item.to">
          <span>{{ item.text }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </template> -->
  </v-app>
</template>

<script>
import API from './api'
import ChatMenu from '@/components/employees/EmployeeMenu'
export default {
  components: {
    // ChatMenu,
  },
  data: () => ({
    menus: [
      {
        text: 'Chat',
        icon: 'chat',
        to: { path: '/chat/messaging' },
      },
      {
        text: 'Contacts',
        icon: 'contacts',
        to: { path: '/chat/contact' },
      },
      {
        text: 'File',
        icon: 'insert_drive_file',
        to: { path: '/chat/media' },
      },
      {
        text: 'Settings',
        icon: 'settings',
        to: { path: '/chat/settings' },
      },
    ],
  }),
  computed: {
    hideBottomNav() {
      return this.$route.params.uuid !== undefined && this.$route.name === 'ChatMessaging'
    },
  },
  methods: {
    handleClick() {
      this.$router.go(-1)
    },
  },
}
</script>
