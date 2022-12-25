import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Country, UserDetails } from '@/client/types/bussiness'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const { user } = sessionStore

export const useGeoguessuuuStore = defineStore('geo-guessuuu', () => {
	// State
	const authUser = ref<UserDetails | null>(user)

	const countries = ref<Country[]>([])

	// Getter

	// Action

	return {
		authUser,
		countries,
	}
})
