<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div v-if="currentPost" class="card col-md-12">
          <g-image :src="currentPost.image" :alt="currentPost.title" class="card-img-top"/>
          <div class="card-body">
            <h5 class="card-title">{{ currentPost.title }}</h5>
            <p class="card-text">{{ currentPost.body }}</p>
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
  data() {
    return {
      postSlug: ''
    }
  },
  computed: {
    posts() {
      return this.$page.allPosts.edges.map(edge => edge.node)
    },
    currentPost() {
      return this.posts.find(p => p.slug === this.postSlug)
    }
  },
  mounted() {
    const { slug: postSlug } = this.$route.params

    this.postSlug = postSlug
  }
}
</script>