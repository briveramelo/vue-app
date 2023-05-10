<template>
  <div class="container">
    <div class="row">

      <div class="col-md-2">
        <img v-if="ready" :src="`${imgPath}/covers/${book.slug}.jpg`" alt="cover" class="img-fluid img-thumbnail">
      </div>

      <div class="col-md-10">
        <template v-if="ready">
          <h3 class="mt-3"> {{book.title}} </h3>
          <hr>
          <p>
            <strong>Author:</strong> {{ book.author.author_name }}<br>
            <strong>Published:</strong> {{book.publication_year}}<br>
          </p>
          <p>
            {{book.description}}
          </p>
        </template>
        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Book",
  data(){
    return {
      book: {},
      imgPath: process.env.VUE_APP_IMAGE_URL,
      ready: false,
    }
  },
  mounted () {
    fetch(`${process.env.VUE_APP_API_URL}/books/${this.$route.params.bookName}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.$emit('error', data.message)
          } else {
            this.book = data.data
            console.log("title is", this.book.title)
            console.log(this.book)
            this.ready = true
          }
        })
  },
}
</script>
