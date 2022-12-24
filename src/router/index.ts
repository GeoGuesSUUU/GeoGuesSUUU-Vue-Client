// import { LoginView } from 'src/views/LoginView'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
			path: '/',
			name: 'app',
			component: HomeView,
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
