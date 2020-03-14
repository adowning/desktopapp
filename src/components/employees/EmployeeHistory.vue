<template>
  <div class="chat-history">
    <v-text-field
      solo
      clearable
      hide-details
      prepend-inner-icon="search"
      label="Search"
    ></v-text-field>
    <vue-perfect-scrollbar class="chat-history--scrollbar">
      <v-divider></v-divider>
      <v-list two-line class="chat-history--list">
        <v-subheader>History</v-subheader>
        <template v-for="(item, index) in chats">
          <v-divider :key="index"></v-divider>
          <v-list-item
            class="chat-list"
            :key="item.title + index"
            :to="chatRoute(item.uuid)"
          >
            <v-list-item-avatar :color="randomAvatarColor(item)">
              <img :src="item.user.avatar" v-if="item.users.length === 1" />
              <span v-else class="white--text headline">{{
                firstLetter(item.title)
              }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ computeTitle(item) }}</v-list-item-title>
              <v-list-item-subtitle>Some Latest message</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{
                formatChatTime(item.created_at)
              }}</v-list-item-action-text>
              <v-circle dot small :color="chatStatusColor(item)"></v-circle>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import { Groups } from './api'
import { getUserById } from './user'
import VCircle from './VCircle'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  components: {
    VuePerfectScrollbar,
    VCircle
  },
  data: () => ({
    chats: Groups
  }),
  methods: {
 randomElement (arr)  {
  return arr[Math.floor(Math.random() * arr.length)]
},

    chatRoute(id) {
      return '/chat/messaging/' + id
    },
    firstLetter(title) {
      return title.charAt(0)
    },
    formatChatTime(s) {
      return new Date(s).toLocaleDateString()
    },
    computeTitle(item) {
      let username = item.users.length === 1 ? getUserById(item.users[0]).username : ''
      return item.users.length === 1 ? username : item.title
    },
    randomAvatarColor(item) {
        var color = item.users.length === 1 ? '' : this.randomElement(['blue', 'indigo', 'success', 'error', 'pink'])
      return color
    },
    chatStatusColor(item) {
      var color =  this.randomElement(['blue', 'indigo', 'success', 'error', 'pink'])
        console.log(color)

       return color
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-history{

}
</style>