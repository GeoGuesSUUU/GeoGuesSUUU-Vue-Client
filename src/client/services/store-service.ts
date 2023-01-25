import type { ItemStore, User } from '../types/bussiness'
import { api } from './api'

export class StoreService {
	static async getItemsStore(): Promise<ItemStore[]> {
		return (
			await api<ItemStore[]>(`/store-item/`, {
				method: 'GET',
			})
		).items
	}

	static async buy(itemID: number): Promise<User> {
		return (
			await api<User>(`/store-item/${itemID}/buy`, {
				method: 'POST',
			})
		).items
	}
}
