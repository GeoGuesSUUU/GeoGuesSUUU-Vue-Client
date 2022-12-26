export interface User {
	id: number
	name: string
	email: string
	coins?: number
	xp: number
	level: number
	levelXpMax: number
	levelXpMin: number
	locale: string
	roles: string[]
	isVerified: boolean
}

export interface Country {
	id: 0
	name: string
	code: string
	flag: string
	continent: string
	initLife: 0
	countryItems?: []
	user?: User
	ownedAt: Date
}

export interface Item {
	id: number
	name: string
	description: string
	type: string
	rarity: string
	fantastic: true
}

export interface ItemSlot {
	quantity: number
	itemType: Item
}

export interface UserDetails extends User {
	scores: []
	userItems?: ItemSlot[]
	countries: Country[]
}

export interface UserApp extends UserDetails {
	levelProgress: number
}
