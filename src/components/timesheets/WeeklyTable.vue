<template>
  <v-data-table :headers="headers" :items="items" :loading="$store.getters.getLoading"></v-data-table>
</template>

<script>
import moment from 'moment'
import { MODULES } from '@/newstore'
/*
    notes: { type: 'Array', defaultValue: ['initial'] },
    status: { type: 'Number', defaultValue: 0 },
    startTimestamp: { type: 'Number' },
    endTimestamp: { type: 'Number' },
    startTime: { type: 'Date' },
    endTime: { type: 'Date' },
    approved: { type: 'Boolean', defaultValue: false },
    duration: { type: 'Number', defaultValue: 0 },
    deviceId: { type: 'String' },
    user: { type: 'Pointer', targetClass: '_User', required: true },
*/
export default {
  data() {
    return {
      headers: [
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'email', value: 'email', sortable: false },
      ],
      daydelta: 0,
    }
  },
  computed: {
    pagination: {
      get() {
        return this.$store.getters.getPagination
      },
      set(value) {
        this.$store.commit('setPagination', value)
      },
    },
    items() {
      //   return this.$store.getters.getCollection
      return this.$store.getters[MODULES.Timesheet.getters.getCollection]
    },
  },
  watch: {
    pagination: {
      handler(newPagination, oldPagination) {
        if (newPagination.page !== oldPagination.page) {
          this.queryByWeek()
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.queryByWeek()
  },
  methods: {
    queryByWeek() {
      const today = moment().add('days', this.daydelta)
      //   const from_date = today.startOf('week')
      // const to_date = today.endOf('week')
      // console.log({
      //  from_date: from_date.toString(),
      //     today: moment().toString(),
      //  to_date: to_date.toString(),
      // });

      this.$store.dispatch('Timesheet/queryByWeek', {
        day: today,
        // page: this.pagination.page,
        // per_page: this.pagination.itemsPerPage,
      })
    },
  },
}
</script>

<style></style>
