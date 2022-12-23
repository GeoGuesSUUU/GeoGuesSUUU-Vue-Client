import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/client/services/api'
import type { User } from '@/client/types/bussiness'

const defaultEmail = localStorage.getItem('email') || ''
const defaultPassword = localStorage.getItem('password') || ''

export const useSessionStore = defineStore('session', () => {
	// State
	const user = ref<User | null>(null)

	async function login(email = defaultEmail, password = defaultPassword) {
		try {
			const token = await api(
				'/token',
				{
					method: 'POST',
					body: {
						username: email,
						password: password,
					},
				},
				false
			)

			localStorage.setItem('email', email)
			localStorage.setItem('password', password)
			localStorage.setItem('token', token)

			// FIXME: wait login api request
		} catch (e) {
			localStorage.setItem('password', '')
			user.value = null
			throw e
		}
	}

	async function logout() {
		localStorage.setItem('password', '')
		window.location.reload()
	}

	return {
		user,
		defaultEmail,
		defaultPassword,
		login,
		logout,
	}
})
