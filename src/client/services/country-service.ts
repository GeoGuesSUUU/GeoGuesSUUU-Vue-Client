import type {
	Country,
	CountryApp,
	ClaimRewards,
	Item,
	UserApp,
} from '../types/bussiness'
import { api } from './api'

export class CountryService {
	static async getCountries(): Promise<Country[]> {
		return (
			await api<Country[]>(`/country/`, {
				method: 'GET',
			})
		).items
	}

	static async buy(country: CountryApp, user: UserApp): Promise<Country> {
		if (country.user) {
			if (country.user.id === user.id) {
				throw new Error('You already own this country')
			}
			throw new Error('Someone already owns this country')
		}

		if (country.price > (user.coins ?? 0)) {
			throw new Error("You don't have enough coins")
		}

		return (
			await api<Country>(`/country/${country.id}/buy`, {
				method: 'POST',
			})
		).items
	}

	static async claim(id?: number): Promise<ClaimRewards> {
		if (id) {
			return (
				await api<ClaimRewards>(`/country/${id}/claim`, {
					method: 'POST',
				})
			).items
		}

		return (
			await api<ClaimRewards>(`/country/claim`, {
				method: 'POST',
			})
		).items
	}

	static async attack(country: CountryApp, item: Item): Promise<Country> {
		return (
			await api<Country>(`/country/${country.id}/attack/${item.id}`, {
				method: 'POST',
			})
		).items
	}

	static async support(country: CountryApp, item: Item): Promise<Country> {
		return (
			await api<Country>(`/country/${country.id}/support/${item.id}`, {
				method: 'POST',
			})
		).items
	}

	static async addEquipment(country: CountryApp, item: Item): Promise<void> {
		await api(`/country/equipment/${country.id}/add/${item.id}`, {
			method: 'POST',
		})
	}
}
