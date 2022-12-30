import { toRefs } from 'vue'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import type { Country, CountryApp } from '../types/bussiness'
import { api } from './api'

const geoStore = useGeoguessuuuStore()

const { currentUser } = toRefs(geoStore)

export class CountryService {
	static async getCountries(): Promise<Country[]> {
		return (
			await api<Country[]>(`/country/`, {
				method: 'GET',
			})
		).items
	}

	static async buy(country: CountryApp): Promise<Country> {
		if (country.user) {
			if (country.user.id === currentUser.value.id) {
				throw new Error('You already own this country')
			}
			throw new Error('Someone already owns this country')
		}

		if (country.price > (currentUser.value.coins ?? 0)) {
			throw new Error("You don't have enough coins")
		}

		return (
			await api<Country>(`/country/${country.id}/buy`, {
				method: 'POST',
			})
		).items
	}
}
