import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/client/services/api'
import type { ApiLoginReponse } from '@/client/types/api-response'
import type { User } from '@/client/types/bussiness'

const defaultEmail = localStorage.getItem('email') || ''
const defaultPassword = localStorage.getItem('password') || ''

export const useSessionStore = defineStore('session', () => {
	// State
	const user = ref<User | null>(null)

	// Getter
	const token = computed(() => localStorage.getItem('token'))

	// Action
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
			console.log(reponse)
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
		window.location.reload()
	}

	return {
		user,
		token,
		defaultEmail,
		defaultPassword,
		login,
		logout,
	}
})
