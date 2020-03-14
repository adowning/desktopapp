
<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="2"
            sm="6"
          >
            <v-card  width="1200" elevation="0">
           <v-card-text center>
               <v-img src="../assets/img/Bad-512.png" aspect-ratio="1.7" contain></v-img>
                   <!-- <v-alert type="warning"> -->
      <v-card-title>
 Some whatchamacallit done broke </v-card-title>
    <!-- </v-alert> -->
     <v-card-actions>
                   <v-btn class="ma-2" outlined  block color="primary" to="/">
      Reload instance
    </v-btn>
     </v-card-actions>  
           </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      lang: {
        type: String,
        default: 'en',
      },
    },
    created () {
      this.$ssrContext && this.$ssrContext.res.status(404)
    },
  }
</script>