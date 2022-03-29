<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container>
        <router-view
          :books="books"
          @refreshBooks="getBooks"
          @deleteBook="deleteBook"
          @deleteBooksss="deleteBooksss"
      /></v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
// import books from '@/assets/books.json';
export default {
  name: 'App',
  data: () => ({
    // books: books,
    books: [],
  }),
  components: {
    NavBar,
  },
  created() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      try {
        const { data } = await axios({
          url: 'http://localhost:3000/books',
          method: 'GET',
        });
        this.books = data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(value) {
      try {
        const { data } = await axios({
          url: `http://127.0.0.1:3000/book/${value}`,
          method: 'DELETE',
        });
        this.books = data;
        this.getBooks();
      } catch (error) {
        console.error(error);
      }
    },
    deleteBooksss(selectedToDelete) {
      selectedToDelete.forEach(
        async (el) =>
          await axios({
            url: 'http://127.0.0.1:3000/book/' + el.bid,
            method: 'DELETE',
          }),
      );
      this.getBooks();
    },
  },
};
</script>
