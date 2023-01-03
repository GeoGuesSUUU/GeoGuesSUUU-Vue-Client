// import { LoginView } from 'src/views/LoginView'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
		},
		// {
		// 	path: '/register',
		// 	name: 'register',
		// 	component: HomeView,
		// },
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
	],
})

export default router
