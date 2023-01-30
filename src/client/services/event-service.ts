import EventEmitter from 'events'
import type { Country, UserApp } from '@/client/types/bussiness'

const eventEmitter = new EventEmitter()

function callModalInventoryEmit(type: string, countryId: number): void {
	eventEmitter.emit('@CallModalInventory', { type, countryId })
}

function callModalMonumentEmit(countryId: number): void {
	eventEmitter.emit('@CallModalMonument', { countryId })
}

function upWorldMapEmit(): void {
	eventEmitter.emit('@UpWorldMap')
}

function updateCountryEmit(country: Country): void {
	eventEmitter.emit('@UpCountry', country)
}

function updateUserProfile(user: UserApp): void {
	eventEmitter.emit('@UpUserProfile', user)
}

export {
	eventEmitter,
	callModalInventoryEmit,
	callModalMonumentEmit,
	upWorldMapEmit,
	updateCountryEmit,
	updateUserProfile,
}
