<template>
  <div>
    <!-- {{ books }} -->
    <p class="text-h5 mt-4">Browse all our books!</p>
    <v-btn class="mr-5 red white--text mb-5" @click="deleteBooksss()">DELETE</v-btn>
    <v-data-table
      :headers="headers"
      :items="books"
      item-key="bid"
      :items-per-page="10"
      show-select
      v-model="selected"
      class="elevation-1"
    >
      <!-- eslint-disable-next-line -->
      <template v-slot:item.image="{ item }">
        <v-img
          @click="
            dialog = true;
            auswahl = item;
          "
          :src="item.image"
          width="75"
        ></v-img>
      </template>

      <!-- eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          color="green darken-2"
          @click="
            editdialog = true;
            edited = item;
            title = edited.title;
            country = edited.country;
            language = edited.language;
          "
        >
          mdi-pencil
        </v-icon>
        <v-icon disable color="red darken-2" small @click="deleteBook(item.bid)">mdi-delete</v-icon>
        <v-btn class="ml-2 orange white--text" :to="`/about/${item.bid}`">D</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="350">
      <v-card>
        <v-img @click="dialog = true" :src="auswahl.image" width="350px"></v-img>
        <v-card-actions>
          <v-btn class="mx-auto" color="primary" text @click="dialog = false"> <b>Cancel</b> </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editdialog" width="350">
      <v-card>
        <v-card-title class="text-h5"> Edit Books </v-card-title>

        <div class="mr-5 ml-5 mt-5 mb-5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :rules="titleRules"
              required
              v-model="title"
              label="Title"
              :counter="50"
            ></v-text-field>
            <v-text-field
              :rules="authorRules"
              v-model="author"
              label="Author"
              required
              :counter="20"
            ></v-text-field>
            <v-text-field :rules="pagesRules" v-model="pages" label="Pages" required></v-text-field>
          </v-form>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              editdialog = false;
              author = '';
              pages = '';
            "
          >
            <b>Cancel</b>
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="
              editdialog = false;
              patchBook(edited.bid);
              reset;
            "
          >
            <b>Save</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  props: {
    books: {
      type: Array,
    },
  },
  data() {
    return {
      selected: [],
      dialog: false,
      editdialog: false,
      auswahl: '',
      edited: '',
      title: '',
      author: '',
      pages: '',
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 50) || 'Title must be less than 50 characters',
        (v) => (v && v.length >= 5) || 'Length is too short! Must be greater than 5',
      ],
      authorRules: [
        (v) => !!v || 'Please provide the Author!',
        (v) => (v && v.length <= 20) || 'Author must be less than 20 characters',
        (v) => (v && v.length >= 3) || 'Author greater than 3 characters',
      ],
      pagesRules: [
        (v) => !!v || 'Pages is required',
        (v) => (v && v <= 2000) || 'Pages must be below 2000',
        //numeric check
      ],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Pages', value: 'pages' },
        { text: 'Image', value: 'image', sortable: false },
        { text: 'Author', value: 'name' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    // patchBook() {
    //   this.edited.title = this.title;
    //   this.edited.country = this.country;
    //   this.edited.language = this.language;
    // },
    // deleteBook(bookid) {
    //   this.books = this.books.filter((el) => el.id != bookid);
    // },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    deleteBook(value) {
      return this.$emit('deleteBook', value);
    },
    deleteBooksss() {
      this.$emit('deleteBooksss', this.selected);
    },
    async patchBook(bid) {
      const { data } = await axios({
        url: 'http://127.0.0.1:3000/book/' + bid,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          title: this.title,
          name: this.author,
          pages: Number(this.pages),
        },
      });
      console.log(data);
      this.$emit('refreshBook');
    },
  },
};
</script>
