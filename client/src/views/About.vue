<template>
  <div class="d-flex flex-wrap justify-center flex-wrap mt-10">
    {{ books }}
    <v-card class="ma-5" width="1000" elevation="5">
      <!-- <v-img height="300" :src="`http://localhost:8080/${books.image}`" /> -->
      <v-card-title>{{ books.title }}</v-card-title>
      <v-card-text class="black--text"
        ><b>{{ books.name }}</b></v-card-text
      >
      <v-list-item-content>
        <v-card-text>
          <div class="grey--text my-4 text-subtitle-1">Pages: {{ books.pages }}</div>
        </v-card-text>
      </v-list-item-content>

      <v-card-actions>
        <v-btn class="grey light-3 mb-2 mr-2 white--text my-0" to="/"> Zurück </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      books: [],
    };
  },
  props: {
    bid: {
      type: Number,
    },
  },
  created() {
    this.getBooksByID();
  },
  methods: {
    async getBooskByID() {
      try {
        const { data } = await axios({
          url: 'http://127.0.0.1:3000/book/' + this.bid,
          method: 'GET',
        });
        this.books = data[0];
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
