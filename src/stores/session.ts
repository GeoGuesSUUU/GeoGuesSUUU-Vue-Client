import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/client/services/api'
import type { ApiLoginReponse } from '@/client/types/api-response'
import type { UserDetails } from '../client/types/bussiness'

export const useSessionStore = defineStore('session', () => {
	// State

	const defaultEmail = ref<string>(localStorage.getItem('email') || '')
	const defaultPassword = ref<string>(localStorage.getItem('password') || '')
	const token = ref<string>(localStorage.getItem('token') || '')
	const isDarkMode = ref<boolean>(
		localStorage.getItem('darkmode') === 'true' || false
	)
	const notifPosition = ref<string>(
		localStorage.getItem('notif-position') ?? 'bottom-right'
	)
	document
		.getElementsByTagName('html')[0]
		?.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light')

	const user = ref<UserDetails | null>(null)

	// Getter

	// Action

	function setDefaultEmail(email: string): void {
		localStorage.setItem('email', email)
		defaultEmail.value = email
	}

	function setDefaultPassword(password: string): void {
		localStorage.setItem('password', password)
		defaultPassword.value = password
	}

	function setToken(_token: string): void {
		localStorage.setItem('token', _token)
		token.value = _token
	}

	function setDarkMode(_darkmodeState: boolean): void {
		localStorage.setItem('darkmode', _darkmodeState ? 'true' : 'false')
		isDarkMode.value = _darkmodeState
	}

	function changeNotifPosition(_notifPosition: string): void {
		localStorage.setItem('notif-position', _notifPosition)
		notifPosition.value = _notifPosition
	}

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
			setDefaultEmail(email)
			setDefaultPassword(password)
			setToken(reponse.items.token)
		} catch (e) {
			setDefaultPassword('')
			setToken('')
			user.value = null
			throw e
		}
	}

	async function login(
		email = defaultEmail.value,
		password = defaultPassword.value
	) {
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
			setDefaultEmail(email)
			setDefaultPassword(password)
			setToken(reponse.items.token)
		} catch (e) {
			setDefaultPassword('')
			setToken('')
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
		isDarkMode,
		setDarkMode,
		notifPosition,
		changeNotifPosition,
	}
})
