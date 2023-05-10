<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Add/Edit Book</h1>
        <hr>
        <form-tag @bookEditEvent="submitHandler" name="bookForm" event="bookEditEvent">
          <div v-if="this.book.slug !==''" class="mb-3">
            <img :src="`${this.imgPath}/covers/${this.book.slug}.jpg`" class="img-fluid img-thumbnail book-cover" alt="cover">
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Cover Image</label>
            <input v-if="book.id===0" ref="coverInput" class="form-control" type="file" id="formFile" required accept="image/jpg" @change="loadCoverImage">
            <input v-else ref="coverInput" class="form-control" type="file" id="formFile" accept="image/jpg" @change="loadCoverImage">
          </div>

          <text-input
            v-model="book.title"
            label="Title"
            type="text"
            name="title"
            :value="book.title"
            required="true"
          ></text-input>

          <select-input
            name="author-id"
            v-model="book.author_id"
            :items="authors"
            required="required"
            label="Authors"
          ></select-input>

          <text-input
              v-model="book.publication_year"
              label="Publication Year"
              type="number"
              name="publication-year"
              :value="book.publication_year"
              required="true"
          ></text-input>

          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea required v-model="book.description" class="form-control" id="description" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="genres" class="form-label">Genres</label>
            <select ref="genres"
              id="genres"
              class="form-select"
              required
              size="7"
              v-model="book.genre_ids"
              multiple
            >
              <option v-for="g in genres" :value="g.value" :key="g.value">{{g.text}}</option>
            </select>
          </div>

          <hr>

          <div class="float-start">
            <input type="submit" class="btn-primary btn me-2" value="Save">
            <router-link to="/admin/books" class="btn btn-outline-secondary">Cancel</router-link>
          </div>

          <div class="float-end">
            <a v-if="book.id > 0"
               class="btn btn-danger" href="javascript:void(0);" @click="confirmDelete(book.id)"> Delete </a>
          </div>

          <div class="clearfix"></div>

        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import Security from "@/components/security.js"
import FormTag from "@/components/forms/FormTag.vue"
import TextInput from "@/components/forms/TextInput.vue"
import SelectInput from "@/components/forms/SelectInput.vue"
import router from "@/router";
import notie from 'notie'

export default {
  name:"BookEdit",
  beforeMount() {
    Security.requireToken()

    //get book for edit if id > 0
    if (this.$route.params.bookId > 0){
      fetch(`${process.env.VUE_APP_API_URL}/admin/books/${this.$route.params.bookId}`, Security.requestOptions(""))
          .then(response => response.json())
          .then(data => {
            if (data.error){
              this.$emit('error', data.message)
            } else {
              this.book = data.data
              let genreArray = []
              for (let i = 0; i < this.book.genres.length; i++){
                genreArray.push(this.book.genres[i].id)
              }
              this.book.genre_ids = genreArray
            }
          })
    }

    // get list of authors for drop down
    fetch(`${process.env.VUE_APP_API_URL}/admin/authors/all`, Security.requestOptions(""))
        .then(response => response.json())
        .then(data => {
          if (data.error){
            this.$emit('error', data.message)
          } else {
            this.authors = data.data
          }
        })
  },
  data(){
    return {
      book :{
        id: 0,
        title: '',
        author_id: 0,
        publication_year: null,
        description: '',
        cover: '',
        slug: '',
        genres: [],
        genre_ids: [],
      },
      authors: [],
      imgPath: process.env.VUE_APP_IMAGE_URL,
      genres: [
        {value: 1, text: "Science Fiction"},
        {value: 2, text: "Fantasy"},
        {value: 3, text: "Romance"},
        {value: 4, text: "Thriller"},
        {value: 5, text: "Mystery"},
        {value: 6, text: "Horror"},
        {value: 7, text: "Classic"},
      ],
    }
  },
  methods: {
    submitHandler(){
      const payload = {
        id: this.book.id,
        title: this.book.title,
        author_id: parseInt(this.book.author_id, 10),
        publication_year: parseInt(this.book.publication_year, 10),
        description: this.book.description,
        cover: this.book.cover,
        slug: this.book.slug,
        genre_ids: this.book.genre_ids,
      }
      console.log(payload)

      // console.log(payload)
      fetch(`${process.env.VUE_APP_API_URL}/admin/books/save`, Security.requestOptions(payload))
          .then(response => response.json())
          .then(data => {
            if(data.error){
              this.$emit('error', data.message)
            } else {
              this.$emit('success', "Changes saved")
              router.push("/admin/books")
            }
          })
          .catch(error =>{
            this.$emit('error', error)
          })
    },
    loadCoverImage(){
      // get a reference to the input using ref
      const file = this.$refs.coverInput.files[0]

      // encode the file using the FileReader api
      const reader = new FileReader()
      reader.onloadend = () => {
        this.book.cover = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "")
      }
      reader.readAsDataURL(file)
    },
    confirmDelete(id){
      notie.confirm({
        text: "Are you sure you want to delete this book?",
        submitText: "Delete",
        submitCallback: () => {
          let payload = {
            id: id,
          }

          fetch(`${process.env.VUE_APP_API_URL}/admin/books/delete`, Security.requestOptions(payload))
              .then(response => response.json())
              .then(data => {
                if(data.error){
                  this.$emit('error', data.message)
                } else {
                  this.$emit('success', "Book deleted")
                  router.push("/admin/books")
                }
              })
        }
      })
    }
  },
  components: {
    "form-tag": FormTag,
    "text-input": TextInput,
    "select-input": SelectInput
  }
}
</script>

<style scoped>
.book-cover{
  max-width: 10em;
}
</style>