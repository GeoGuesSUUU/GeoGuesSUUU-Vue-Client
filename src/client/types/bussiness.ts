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
	countryItems?: ItemSlot[]
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
	price: number
	effects: Effect[]
}

export interface ItemSlot {
	quantity: number
	itemType: Item
}

export interface ItemStore {
	id: number
	itemType: Item
	type: string
	trending: boolean
	promotion: number
	promoPrice: number
}

export interface Level {
	id: number
	difficulty: number
	label: string
	description: string
	game: Game
	scores?: Score[]
}

export interface Score {
	id: number
	score: number
	createdAt: Date
	time: number
	level: Level
	user?: User
}

export interface UserDetails extends User {
	scores: Score[]
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
	isAdmin: boolean
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

export interface MapColor {
	no_onwer: string
	you: string
	other: string
}
