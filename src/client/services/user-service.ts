import { toRefs } from 'vue'
import { api } from '@/client/services/api'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import type { UserApp, UserModify } from '../types/bussiness'

export class UserService {
	static async getUserById(id: number): Promise<UserApp> {
		const geoStore = useGeoguessuuuStore()
		const { currentUser } = toRefs(geoStore)
		if (currentUser.value.id === id) {
			return (
				await api<UserApp>(`/user/${id}/private`, {
					method: 'GET',
				})
			).items
		}
		const user = (
			await api<UserApp>(`/user/${id}`, {
				method: 'GET',
			})
		).items
		return <UserApp>{
			...user,
			isAdmin: user?.roles.includes('ROLE_ADMIN'),
			levelProgress: (() => {
				const min = user.levelXpMin
				const xp = user.xp
				const max = user.levelXpMax
				return Math.round(((xp - min) * 100) / (max - min))
			})(),
		}
	}

	static async update(id: number, body: UserModify) {
		const user = (
			await api<UserApp>(`/user/${id}`, {
				method: 'PUT',
				body,
			})
		).items
		return <UserApp>{
			...user,
			isAdmin: user?.roles.includes('ROLE_ADMIN'),
			levelProgress: (() => {
				const min = user.levelXpMin
				const xp = user.xp
				const max = user.levelXpMax
				return Math.round(((xp - min) * 100) / (max - min))
			})(),
		}
	}
}
