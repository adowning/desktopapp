<template>
  <v-container fluid pl-0 pr-0>
    <v-layout row>
      <v-flex>
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex xs12 md6 xl4>
              <!-- <v-expansion-panels multiple v-model="computedPanels" ma-0 pa-0> -->
              <v-expansion-panel v-for="timesheet in computedTimesheets" :key="timesheet.id">
                <v-expansion-panel-content>
                  <panel-header slot="header" :device="timesheet.id" :label="timesheet.startTime" />
                  <v-tabs grow>
                    <v-tab v-for="tab in tabs" :key="tab.name" class="caption">
                      {{ tab.name }}
                    </v-tab>
                    <v-tab-item v-for="(tab, index) in tabs" :key="index" lazy>
                      <panel-charts :timesheet="timesheet.id" :filter="tabs[index]" />
                    </v-tab-item>
                  </v-tabs>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- </v-expansion-panels> -->
            </v-flex>
          </v-layout>
        </v-container>
        <back-to-top visibleoffset="80" right="14px" bottom="20px">
          <v-btn color="info" fab small>
            <v-icon>expand_less</v-icon>
          </v-btn>
        </back-to-top>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { MODULES } from '@/newstore'
import { LIMIT_REDUCE, TIME_REDUCE } from './ReduceFunctions'
export default {
  name: 'Home',
  data: () => ({
    tabs: [
      {
        name: 'tabs.last10',
        key: 'LAST_10',
        offsetFromNowInMillis: NaN,
        limit: 10,
        reduceFunction: LIMIT_REDUCE,
      },
      {
        name: 'tabs.last4hours',
        key: 'LAST_4_HOURS',
        offsetFromNowInMillis: 4 * 60 * 60 * 1000,
        limit: 1000,
        reduceFunction: TIME_REDUCE,
      },
      {
        name: 'tabs.last24hours',
        key: 'LAST_24_HOURS',
        offsetFromNowInMillis: 24 * 60 * 60 * 1000,
        limit: 1000,
        reduceFunction: TIME_REDUCE,
      },
      {
        name: 'tabs.last7days',
        key: 'LAST_7_DAYS',
        offsetFromNowInMillis: 7 * 24 * 60 * 60 * 1000,
        limit: 1000,
        reduceFunction: TIME_REDUCE,
      },
    ],
  }),
  computed: {
    computedTimesheets() {
      return this.$store.getters[MODULES.Timesheet.getters.getTimesheets]
      //   return this.$store.getters[MODULES.Timesheet.getters.getTimesheets]
    },
    computedPanels: {
      get() {
        let panels = this.$store.getters[MODULES.AppPreferences.getters.getPanels]()
        return panels ? panels : []
      },
      set(panels) {
        this.$store.commit(MODULES.AppPreferences.mutations.setPanels, panels)
      },
    },
  },
  created() {
    this.$store.dispatch(MODULES.Timesheet.actions.subscribeToTimesheets)
    this.$eventHub.$on('update:togglePanels', this.togglePanels)
  },
  beforeDestroy() {
    this.$eventHub.$off('update:togglePanels')
  },
  watch: {
    computedPanels: function() {
      this.$eventHub.$emit('update:toggleIcon', this.showExpandMore() ? 'expand_more' : 'expand_less')
    },
  },
  methods: {
    showExpandMore() {
      if (this.computedPanels.length == 0) {
        return true
      }
      return this.computedPanels.every(value => {
        return value ? false : true
      })
    },
    togglePanels() {
      if (this.showExpandMore()) {
        this.computedPanels = [...Array(this.computedTimesheets.length).keys()].map(() => true)
      } else {
        this.computedPanels = []
      }
    },
  },
}
</script>

<style scoped></style>
