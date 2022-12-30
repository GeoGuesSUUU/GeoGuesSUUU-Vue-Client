import { defineStore } from 'pinia'
import { ref, computed, toRefs } from 'vue'
import type {
	CountryApp,
	Country,
	UserApp,
	ItemSlot,
} from '@/client/types/bussiness'
import { useSessionStore } from '@/stores/session'

export const useGeoguessuuuStore = defineStore('geo-guessuuu', () => {
	const sessionStore = useSessionStore()

	const { user: userRef } = toRefs(sessionStore)

	// State

	const countriesRef = ref<Country[]>([])

	// Getters

	const currentUser = computed((): UserApp => {
		return <UserApp>{
			...userRef.value,
			levelProgress: (() => {
				if (!userRef.value) return 0
				const min = userRef.value.levelXpMin
				const xp = userRef.value.xp
				const max = userRef.value.levelXpMax
				return Math.round(((xp - min) * 100) / (max - min))
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

	function upsetCountries(_countries: Country[]): void {
		countriesRef.value = _countries
	}

	function addItemsInInventory(items: ItemSlot[]) {
		items.forEach((element) => {
			if (!userRef.value || !userRef.value.userItems) return
			const index = userRef.value.userItems.findIndex(
				(_item) => _item.itemType.id === element.itemType.id
			)

			if (index && index !== -1) {
				userRef.value.userItems[index] = element
			} else {
				userRef.value.userItems[index].quantity += element.quantity
			}
		})
	}

	function updateClaimDate(id: number) {
		const index = countriesRef.value.findIndex((_country) => _country.id === id)
		if (index !== -1) {
			countriesRef.value[index].claimDate = new Date()
		}
	}

	return {
		currentUser,
		countries,
		authUserLevelProgress,
		upsetCountries,
		upsetCountry,
		addItemsInInventory,
		updateClaimDate,
	}
})
