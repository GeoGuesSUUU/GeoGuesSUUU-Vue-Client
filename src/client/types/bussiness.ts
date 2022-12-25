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

export interface Country {
	id: 0
	name: string
	code: string
	flag: string
	continent: string
	initLife: 0
	countryItems: []
	user?: User
	ownedAt: Date
}
