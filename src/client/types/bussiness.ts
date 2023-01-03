export interface User {
	id: number
	name: string
	email: string
	coins: number
	xp: number
	locale: string
	roles: string[]
	isVerified: boolean
}

export interface UserDetails extends User {
	scores: []
	userItems: []
	countries: []
}
