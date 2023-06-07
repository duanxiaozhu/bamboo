import Vue from 'vue'
import VueRouter from 'vue-router'
import Money from '@/views/Money.vue'
import Statistics from '@/views/Statistics.vue'
import Edit from "@/components/Money/Edit.vue"
import Add from "@/components/Money/Add.vue"
import Details from "@/views/Details.vue"
import EditDetails from "@/components/Details/EditDetails.vue" 

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
    path: '/money/edit/add/:types',
    component: Add,
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/details',
    component: Details
  },
  {
    path: '/details/edit/:id',
    component: EditDetails
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
