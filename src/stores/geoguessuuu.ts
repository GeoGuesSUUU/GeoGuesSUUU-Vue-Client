import { defineStore } from 'pinia'
import { ref, computed, toRefs } from 'vue'
import type {
	CountryApp,
	Country,
	UserApp,
	ItemSlot,
	Item,
	ItemStore,
	Game,
	MapColor,
} from '@/client/types/bussiness'
import { SERVER_DOMAIN } from '@/constants'
import { useSessionStore } from '@/stores/session'

export const useGeoguessuuuStore = defineStore('geo-guessuuu', () => {
	const sessionStore = useSessionStore()

	const { user: userRef } = toRefs(sessionStore)

	// State

	const mapColor = ref<MapColor>(
		JSON.parse(localStorage.getItem('map-color') as string) ?? {
			no_onwer: '#ff0',
			you: '#0f0',
			other: '#f00',
		}
	)

	const countriesRef = ref<Country[]>([])
	const itemStoreRef = ref<ItemStore[]>([])
	const gameListRef = ref<Game[]>([])

	// Getters

	const currentUser = computed((): UserApp => {
		return <UserApp>{
			...userRef.value,
			isAdmin: userRef.value?.roles.includes('ROLE_ADMIN'),
			levelProgress: (() => {
				if (!userRef.value) return 0
				const min = userRef.value.levelXpMin
				const xp = userRef.value.xp
				const max = userRef.value.levelXpMax
				return Math.floor(((xp - min) * 100) / (max - min))
			})(),
		}
	})

	const countries = computed((): CountryApp[] => {
		return countriesRef.value.map((element: Country) => {
			return <CountryApp>{
				...element,
				lifePercentage: Math.round((element.life * 100) / element.lifeMax),
				shieldPercentage: Math.round(
					(element.shield * 100) / element.shieldMax
				),
			}
		})
	})

	const itemsStore = computed(() => itemStoreRef.value)

	const gameList = computed(() => gameListRef.value)

	const authUserLevelProgress = computed(() => {
		if (!userRef.value) return 0
		return Math.round((userRef.value.xp * 100) / userRef.value.levelXpMax)
	})

	// Actions

	function upsetCountry(country: Country): void {
		const index = countriesRef.value.findIndex(
			(_country) => _country.id === country.id
		)
		if (index !== -1) {
			countriesRef.value[index] = country
		}
	}

	function upsetCountryItem(countryId: number, item: Item): void {
		const index = countriesRef.value.findIndex(
			(_country) => _country.id === countryId
		)
		if (index === -1) return
		const indexItem = countriesRef.value[index].countryItems?.findIndex(
			(_itemSlot) => _itemSlot.itemType.id === item.id
		)
		if (!indexItem) return
		else if (indexItem === -1) {
			countriesRef.value[index].countryItems?.push({
				quantity: 1,
				itemType: item,
			})
		} else {
			;(countriesRef.value[index].countryItems as ItemSlot[])[indexItem]
				.quantity++
		}
	}

	function upsetCountries(_countries: Country[]): void {
		countriesRef.value = _countries
	}

	function upsetItemsStore(_items: ItemStore[]): void {
		itemStoreRef.value = _items
	}

	function upsetGameList(_games: Game[]): void {
		gameListRef.value = _games
	}

	function addItemsInInventory(items: ItemSlot[]) {
		items.forEach((element) => {
			if (!userRef.value || !userRef.value.userItems) return
			const index = userRef.value.userItems.findIndex(
				(_item) => _item.itemType.id === element.itemType.id
			)

			if (index !== -1) {
				userRef.value.userItems[index].quantity += element.quantity
			} else {
				userRef.value.userItems.push(element)
			}
		})
	}

	function removeItemInInventory(item: ItemSlot) {
		if (!userRef.value || !userRef.value.userItems) return
		const index = userRef.value.userItems.findIndex(
			(_item) => _item.itemType.id === item.itemType.id
		)

		if (index !== -1) {
			if (userRef.value.userItems[index].quantity > 1) {
				userRef.value.userItems[index].quantity--
			} else {
				userRef.value.userItems.splice(index, 1)
			}
		}
	}

	function updateClaimDate(id: number) {
		const index = countriesRef.value.findIndex((_country) => _country.id === id)
		if (index !== -1) {
			countriesRef.value[index].claimDate = new Date()
		}
	}

	function withdrawCoins(coinsCount: number): void {
		if (userRef.value?.coins) userRef.value.coins -= coinsCount
	}

	function addCoins(coinsCount: number): void {
		if (userRef.value?.coins) userRef.value.coins += coinsCount
	}

	function updateLifeAndShield(ref: {
		id: number
		life: number
		lifeMax: number
		shield: number
		shieldMax: number
	}) {
		const index = countriesRef.value.findIndex(
			(_country) => _country.id === ref.id
		)
		if (index !== -1) {
			countriesRef.value[index].life = ref.life
			countriesRef.value[index].lifeMax = ref.lifeMax
			countriesRef.value[index].shield = ref.shield
			countriesRef.value[index].shieldMax = ref.shieldMax
		}
	}

	function updateAfterAttack(country: Country) {
		updateLifeAndShield(country)
		const index = countriesRef.value.findIndex(
			(_country) => _country.id === country.id
		)
		if (index !== -1) {
			countriesRef.value[index].user = country.user
		}
	}

	function getItemImage(item: Item): string {
		if (item.img) {
			if (item.img.startsWith('/assets/img/')) {
				return SERVER_DOMAIN + item.img
			}
			return item.img
		}
		return '/src/assets/item_default.svg'
	}

	function changeMapColor(no_owner?: string, you?: string, other?: string) {
		const color = {
			no_onwer: no_owner ?? '#ff0',
			you: you ?? '#0f0',
			other: other ?? '#f00',
		}
		localStorage.setItem('map-color', JSON.stringify(color))
		mapColor.value = color
	}

	return {
		currentUser,
		countries,
		itemsStore,
		gameList,
		authUserLevelProgress,
		mapColor,
		upsetCountries,
		upsetCountry,
		upsetCountryItem,
		upsetItemsStore,
		upsetGameList,
		addItemsInInventory,
		updateClaimDate,
		removeItemInInventory,
		updateLifeAndShield,
		updateAfterAttack,
		getItemImage,
		withdrawCoins,
		addCoins,
		changeMapColor,
	}
})
