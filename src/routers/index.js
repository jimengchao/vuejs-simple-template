import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@pages/layout'
import IndexPage from '@pages/index'
Vue.use(VueRouter)


export default new VueRouter({
	routes: [
		{
			path: '/',
			component: Layout,
			redirect: '/index',
			children: [
				{
					path: 'index',
					component: IndexPage
				}
			]
		}
	]
})