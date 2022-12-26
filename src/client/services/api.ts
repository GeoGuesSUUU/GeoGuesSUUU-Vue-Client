import axios from 'axios'
import { useSessionStore } from '@/stores/session'

interface ApiRequest {
	method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
	body?: object
}

export const BASE_URL = 'http://localhost:8000/api'

export async function api<T = any>(
	url: string,
	data: ApiRequest,
	token = true
): Promise<Awaited<T>> {
	const session = useSessionStore()

	return (
		await axios(url, {
			method: data.method,
			baseURL: BASE_URL,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: token ? `Bearer ${session.token}` : '',
			},
			data: data?.body,
		})
	).data
}
