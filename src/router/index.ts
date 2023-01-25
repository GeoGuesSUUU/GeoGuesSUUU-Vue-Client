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
			path: '/chat',
			redirect: (_to) => {
				return { name: 'loading', query: { name: 'chat' } }
			},
		},
		{
			path: '/user/:id(\\d+)',
			redirect: (_to) => {
				return {
					name: 'loading',
					query: { name: 'user', params: JSON.stringify(_to.params) },
				}
			},
		},
		{
			path: '/game-page/:id(\\d+)',
			redirect: (_to) => {
				return {
					name: 'loading',
					query: { name: 'game-page', params: JSON.stringify(_to.params) },
				}
			},
		},
		{
			path: '/',
			redirect: (_to) => {
				return { name: 'loading' }
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
				{
					path: '/chat',
					name: 'chat',
					component: () => import('../components/TheChat/TheChat.vue'),
				},
				{
					path: '/user/:id(\\d+)',
					name: 'user',
					component: () => import('../components/UserPage/UserPage.vue'),
				},
				{
					path: '/game-page/:id(\\d+)',
					name: 'game-page',
					component: () =>
						import('../components/CallGamePage/CallGamePage.vue'),
				},
			],
		},
		{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
	],
})

export default router
