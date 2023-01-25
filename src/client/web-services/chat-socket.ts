import { ref, toRefs } from 'vue'
import type { Message } from '@/client/types/chat'
import type { WebSocketReponse } from '@/client/types/ws-reponse'
import { SERVER_CHAT, CHAT_RECONNECTION_TIME_MS } from '@/constants'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()
const { currentUser } = toRefs(geoStore)

export const CHAT_EMIT = {
	GET_MESSAGES: '@GetMessages',
}

export const CHAT_EVENT = {
	NEW_MESSAGE: '@Message',
	ALL_MESSAGES: '@Messages',
	NEW_CONNECTION: '@ConnectionCount',
}

let inReconnection = false

export class ChatSocket {
	private socket!: WebSocket | null
	isConnected = ref<boolean>(false)
	connectionTimer = ref(30)

	userOnline = ref<number | null>(0)
	messages = ref<Message[]>([])
	color = ref(window.localStorage.getItem('chat-color') ?? '#00DB87')

	// CallBack
	onAfterNewMessage = ref((_message?: Message) => {})
	onAfterConnected = ref((_messages?: Message[]) => {})

	constructor() {
		this.connection()
	}

	close(): void {
		this.socket?.close()
	}

	private connection(): void {
		this.socket = new WebSocket(SERVER_CHAT)
		this.socket.onopen = () => this.onOpen()
		this.socket.onclose = () => this.onClose()
		this.socket.onerror = () => this.onClose()
		this.socket.onmessage = (event: MessageEvent) => this.onMessage(event)
	}

	private reconnection(): void {
		if (inReconnection) return
		inReconnection = true
		console.warn('Connection lost, retry in 30 seconds...')
		this.connectionTimer.value = 30
		const interval = setInterval(() => {
			if (this.connectionTimer.value === 0) return
			this.connectionTimer.value--
		}, 1000)
		setTimeout(() => {
			inReconnection = false
			clearInterval(interval)
			this.connection()
		}, CHAT_RECONNECTION_TIME_MS ?? 30000)
	}

	private onOpen(): void {
		this.isConnected.value = true
		this.socket?.send(
			JSON.stringify({
				event: CHAT_EMIT.GET_MESSAGES,
			})
		)
	}

	private onClose(): void {
		this.isConnected.value = false
		this.userOnline.value = null
		this.reconnection()
	}

	private onMessage(event: MessageEvent): void {
		try {
			const response: WebSocketReponse = JSON.parse(event.data)
			switch (response.event) {
				case CHAT_EVENT.NEW_MESSAGE:
					this.addMessage(response.response)
					break
				case CHAT_EVENT.ALL_MESSAGES:
					this.setMessages(response.response)
					break
				case CHAT_EVENT.NEW_CONNECTION:
					this.setUserOnline(response.response.count)
					break
			}
		} catch (e) {
			console.error(e)
		}
	}

	private addMessage(message: Message) {
		this.messages.value.push(message)
		this.onAfterNewMessage.value(message)
	}

	private setMessages(messages: Message[]) {
		this.messages.value = messages
		this.onAfterConnected.value(messages)
	}

	private setUserOnline(count: number) {
		this.userOnline.value = count
	}

	saveColor(): void {
		window.localStorage.setItem('chat-color', this.color.value)
	}

	sendMessage(message: string): void {
		if (message.length < 1) return
		const messageToSend = {
			event: '@SendMessage',
			user: {
				id: currentUser.value.id,
				name: currentUser.value.name,
				color: this.color.value ?? '#00DB87',
				isAdmin: currentUser.value.isAdmin,
				isVerified: currentUser.value.isVerified,
			},
			content: message,
			publishAt: Date.now(),
		}
		this.socket?.send(JSON.stringify(messageToSend))
		this.addMessage(messageToSend as Message)
	}
}
