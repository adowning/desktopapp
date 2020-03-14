<template>
    <div class="Employees">
      <v-container id="dashboard" class="ma-0 pa-0">
          <v-row>
  <v-tabs>
    <v-tab>Basic Info</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
  </v-tabs>
  x
  </v-row>
      </v-container>
    </div>
</template>
<script>
import Layout from '@/layouts/LayoutDefault'

export default {
  name: 'Employees',
  components: {
  },

  data: function() {
    return {
      
    }
  },
  created() {
    this.$emit(`update:layout`, LayoutDefault);
  },
}

</script>

