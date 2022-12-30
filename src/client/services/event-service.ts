import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

function callModalInventory(type: string, countryId: number): void {
	eventEmitter.emit('@CallModalInventory', { type, countryId })
}

export { eventEmitter, callModalInventory }
