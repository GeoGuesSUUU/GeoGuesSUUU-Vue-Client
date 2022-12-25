import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/client/services/api'
import type { ApiLoginReponse } from '@/client/types/api-response'
import type { UserDetails } from '../client/types/bussiness'

const defaultEmail = localStorage.getItem('email') || ''
const defaultPassword = localStorage.getItem('password') || ''
const token = localStorage.getItem('token') || ''

export const useSessionStore = defineStore('session', () => {
	// State

	const user = ref<UserDetails | null>(null)

	// Getter

	// Action

	async function register(name: string, email: string, password: string) {
		try {
			const reponse = await api<ApiLoginReponse>(
				'/user/register',
				{
					method: 'POST',
					body: {
						name,
						email,
						password,
					},
				},
				false
			)

			user.value = reponse.items.user
			localStorage.setItem('email', email)
			localStorage.setItem('password', password)
			localStorage.setItem('token', reponse.items.token)
		} catch (e) {
			localStorage.setItem('password', '')
			localStorage.setItem('token', '')
			user.value = null
			throw e
		}
	}

	async function login(email = defaultEmail, password = defaultPassword) {
		try {
			const reponse = await api<ApiLoginReponse>(
				'/user/login',
				{
					method: 'POST',
					body: {
						email,
						password,
					},
				},
				false
			)

			user.value = reponse.items.user
			localStorage.setItem('email', email)
			localStorage.setItem('password', password)
			localStorage.setItem('token', reponse.items.token)
		} catch (e) {
			localStorage.setItem('password', '')
			localStorage.setItem('token', '')
			user.value = null
			throw e
		}
	}

	async function logout() {
		localStorage.setItem('password', '')
		localStorage.setItem('token', '')
	}

	return {
		user,
		token,
		defaultEmail,
		defaultPassword,
		register,
		login,
		logout,
	}
})
