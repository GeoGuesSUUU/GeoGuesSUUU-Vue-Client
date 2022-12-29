import type { Country } from '../types/bussiness'
import { api } from './api'

export class CountryService {
	static async getCountries(): Promise<Country[]> {
		return (
			await api<Country[]>(`/country/`, {
				method: 'GET',
			})
		).items
	}
}
