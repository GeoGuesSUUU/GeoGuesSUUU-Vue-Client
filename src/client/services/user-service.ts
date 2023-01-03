import { toRefs } from 'vue'
import { api } from '@/client/services/api'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import type { UserApp } from '../types/bussiness'

const geoStore = useGeoguessuuuStore()

const { currentUser } = toRefs(geoStore)

export class UserService {
	static async getUserById(id: number): Promise<UserApp> {
		if (currentUser.value.id === id) {
			return (
				await api<UserApp>(`/user/${id}/private`, {
					method: 'GET',
				})
			).items
		}
		return (
			await api<UserApp>(`/user/${id}`, {
				method: 'GET',
			})
		).items
	}
}
