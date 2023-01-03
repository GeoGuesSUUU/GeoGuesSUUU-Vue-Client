import type { UserDetails } from './bussiness'

export interface ApiReponse {
	response: {
		status: number
		request: string
		method: string
		total?: number
	}
	items: any
}

export interface ApiLoginReponse extends Omit<ApiReponse, 'items'> {
	items: {
		user: UserDetails
		token: string
	}
}
