export interface ChatUser {
	id: number
	name: string
	color: string
	isAdmin: boolean
	isVerified: boolean
}

export interface Message {
	user: ChatUser
	content: string
	publishAt: number
}
