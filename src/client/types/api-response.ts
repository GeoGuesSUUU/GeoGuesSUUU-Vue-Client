import type { UserDetails } from './bussiness'

export interface ApiReponse<T = any> {
	response: {
		status: number
		request: string
		method: string
		total?: number
	}
	items: T
}

export interface ApiLoginReponse extends Omit<ApiReponse, 'items'> {
	items: {
		user: UserDetails
		token: string
	}
}
