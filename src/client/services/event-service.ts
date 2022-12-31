import EventEmitter from 'events'
import type { Country } from '../types/bussiness'

const eventEmitter = new EventEmitter()

function callModalInventoryEmit(type: string, countryId: number): void {
	eventEmitter.emit('@CallModalInventory', { type, countryId })
}

function upWorldMapEmit(): void {
	eventEmitter.emit('@UpWorldMap')
}

function updateCountryEmit(country: Country): void {
	eventEmitter.emit('@UpCountry', country)
}

export {
	eventEmitter,
	callModalInventoryEmit,
	upWorldMapEmit,
	updateCountryEmit,
}
