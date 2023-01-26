<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { GameService } from '@/client/services/game-service'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import GameCardVue from './components/GameCard/GameCard.vue'

const geoStore = useGeoguessuuuStore()

const { gameList } = toRefs(geoStore)
const { upsetGameList } = geoStore
onMounted(async () => {
	upsetGameList(await GameService.getGames())
})
</script>

<template>
	<div class="container-fluid">
		<div class="row mb-2">
			<GameCardVue
				v-for="(game, index) of gameList"
				:key="index"
				:game="game"></GameCardVue>
		</div>
	</div>
</template>

<style scoped src="./GamePage.scss"></style>
