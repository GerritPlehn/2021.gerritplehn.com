import Vue from 'vue'
import Page from '~/components/Page.vue'
import Teaser from '~/components/Teaser.vue'
import Grid from '~/components/Grid.vue'
import Feature from '~/components/Feature.vue'
import FeaturedPosts from '~/components/FeaturedPosts.vue'
import PostTeaser from '~/components/PostTeaser.vue'
import BlogPost from '~/components/BlogPost.vue'
import BlogPosts from '~/components/BlogPosts.vue'

Vue.component('page', Page)
Vue.component('teaser', Teaser)
Vue.component('grid', Grid)
Vue.component('feature', Feature)
Vue.component('featured-posts', FeaturedPosts)
Vue.component('post-teaser', PostTeaser)
Vue.component('blog-post', BlogPost)
Vue.component('blog-posts', BlogPosts)