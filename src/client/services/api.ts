import { useSessionStore } from 'src/stores/session'

export const BASE_URL = 'https://localhost:8000/api'

interface ApiRequest {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	headers?: object
	body: object
}

export async function api(url: string, params: ApiRequest, token = true) {
	const session = useSessionStore()

	params = Object.assign(
		{
			mode: 'cors',
			cache: 'no-cache',
		},
		params
	)

	params.headers = Object.assign(
		{
			Authorization: `Bearer ${token ? session.token : ''}`,
			'Content-Type': 'application/json',
		},
		params.headers
	)

	const response = await fetch(BASE_URL + url, <RequestInit>params)
	const json = (await response.json()) || {}
	if (!response.ok) {
		const errorMessage = json.error || response.status
		throw new Error(errorMessage)
	}
	return json
}
