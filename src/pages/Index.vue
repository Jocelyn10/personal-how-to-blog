<template>
  <Layout>
    <div class="container">
      <div v-if="firstPost" class="row">
        <div style="margin: auto;" class="card col-md-10">
          <g-image :src="firstPost.image" :alt="firstPost.title" class="card-img-top"/>
          <div class="card-body">
            <h5 class="card-title">{{ firstPost.title }}</h5>
            <p class="card-text">{{ firstPost.body }}</p>
            <g-link :to="`/posts/${firstPost.slug}`" target="_blank" 
                    class="btn btn-primary">View Post</g-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-md-12 text-center">
            <p>No Posts Yet</p>
          </div>
        </div>
      </div>
      <!-- second level posts -->
      <div v-if="otherPosts" class="row mt-4">
        <div v-for="(post, index) in otherPosts" :key="index" class="card col-md-4">
          <g-image :src="post.image" :alt="post.title" class="card-img-top"/>
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.body }}</p>
            <g-link :to="`/posts/${post.slug}`" target="_blank" 
                    class="btn btn-primary">View Post</g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allPosts {
    edges {
      node {
        category
        date
        title
        body
        image
        slug
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  computed: {
    posts() {
      return this.$page.allPosts.edges.map(edge => edge.node)
    },
    numberOfPosts() {
      return this.posts.length
    },
    firstPost() {
      if (!this.numberOfPosts) return false
      return this.posts[0]
    },
    otherPosts() {
      if (this.numberOfPosts <= 1) return false
      return this.posts.slice(1)
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
