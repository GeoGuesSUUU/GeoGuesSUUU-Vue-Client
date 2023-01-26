<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GameService } from '@/client/services/game-service'
import type { Game } from '@/client/types/bussiness'
import GameCardVue from './components/GameCard/GameCard.vue'

const games = ref<Game[]>([])
onMounted(async () => {
	games.value = await GameService.getGames()
})
</script>

<template>
	<div class="container-fluid">
		<div class="row mb-2">
			<GameCardVue
				v-for="(game, index) of games"
				:key="index"
				:game="game"></GameCardVue>
		</div>
	</div>
</template>

<style scoped src="./GamePage.scss"></style>
