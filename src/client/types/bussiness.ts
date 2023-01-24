export interface User {
	id: number
	name: string
	email: string
	img?: string
	coins?: number
	xp: number
	level: number
	levelXpMax: number
	levelXpMin: number
	locale: string
	roles: string[]
	isVerified: boolean
}

export interface Effect {
	type: string
	value: number
}

export interface Country {
	id: number
	name: string
	code: string
	flag: string
	continent: string
	initLife: number
	life: number
	lifeMax: number
	shield: number
	shieldMax: number
	initPrice: number
	claimDate: Date
	effects: Effect[]
	price: number
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
	img?: string
	effects: Effect[]
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

export interface Level {
	id: number
	difficulty: number
	label: string
	description: string
}

export interface Game {
	id: number
	title: string
	description: string
	img: string
	tags: string
	server: string
	levels: Level[]
}

export interface UserApp extends UserDetails {
	levelProgress: number
}

export interface CountryApp extends Country {
	lifePercentage: number
	shieldPercentage: number
}

export interface ClaimRewards {
	coins: number
	items: ItemSlot[]
}
