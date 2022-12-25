// import { LoginView } from 'src/views/LoginView'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoadingView from '../views/LoadingView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/loading',
			name: 'loading',
			component: LoadingView,
		},
		{
			path: '/',
			redirect: (_to) => {
				return { name: 'loading' }
			},
		},
		{
			path: '/games',
			redirect: (_to) => {
				return { name: 'loading', query: { name: 'games' } }
			},
		},
		{
			path: '/store',
			redirect: (_to) => {
				return { name: 'loading', query: { name: 'store' } }
			},
		},
		{
			path: '/home',
			name: 'app',
			component: HomeView,
			alias: '/',
			children: [
				{
					path: '/',
					name: 'home',
					component: () => import('../components/HomePage/HomePage.vue'),
				},
				{
					path: '/games',
					name: 'games',
					component: () => import('../components/GamePage/GamePage.vue'),
				},
				{
					path: '/store',
					name: 'store',
					component: () => import('../components/StorePage/StorePage.vue'),
				},
			],
		},
		{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
	],
})

export default router
