<template>
  <v-container class="fill-height pa-0 ma-0 messaging fluid" id="messaging">
    <!-- <template v-if="!$vuetify.breakpoint.smAndDown">
      <v-layout row>
        <v-flex lg3 class="white">
          <chat-history> </chat-history>
        </v-flex>
        <v-flex lg9>
          <chat-window></chat-window>
        </v-flex>
      </v-layout>
    </template> -->
    <template>
      <v-layout column>
        <!-- <v-flex sm12 class="white" v-if="showSidebar"> -->
        <v-flex sm12 class="white" >
          <chat-history> </chat-history>
        </v-flex>
        <!-- <v-flex sm12 v-if="showWindow">
          <chat-window></chat-window>
        </v-flex> -->
      </v-layout>
    </template>
  </v-container>
</template>
<script>
import ChatHistory from './EmployeeHistory'
// import ChatWindow from './EmployeeWindow'
export default {
  components: {
    ChatHistory,
    // ChatWindow
  },
  data() {
    return {}
  },
  computed: {
    showSidebar() {
      return this.$route.params.uuid === undefined
    },
    showWindow() {
      return this.$route.params.uuid !== undefined
    }
  }
}
</script>