import Vue from 'vue'
import VueRouter from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import Edit from "@/components/Money/Edit.vue"
import EditLabel from "@/views/EditLabel.vue"
import Add from "@/components/Money/Add.vue"
import EditTags from "@/components/Money/EditTags.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money/edit',
    component: Edit,
  },
  {
    path: '/money/editTags/:id',
    component: EditTags,
  },
  {
    path: '/money/edit/add/:types',
    component: Add,
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path:'/labels/edit/:id',
    component:EditLabel
  },
  {
    path: '/statistics',
    component: Statistics
  }
]

const router = new VueRouter({
  routes
})

export default router
