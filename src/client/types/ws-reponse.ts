export interface WebSocketReponse<T = any> {
	event: string
	response: T
}
