<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GameService } from '@/client/services/game-service'

const router = useRouter()
const pageContent = ref<string | null>(null)

function reloadScripts(gamePage: HTMLElement): void {
	const scripts = gamePage.querySelectorAll('script')
	console.log(scripts)
	scripts.forEach((script) => {
		script.remove()
		const newScript = document.createElement('script')
		const att = script.getAttribute('src')
		if (att) newScript.setAttribute('src', att)
		newScript.innerHTML = script.innerHTML
		gamePage.appendChild(newScript)
	})
}

function deleteScripts(gamePage: HTMLElement): void {
	const scripts = gamePage.querySelectorAll('script')
	console.log(scripts)
	scripts.forEach((script) => script.remove())
}

onMounted(async () => {
	const gameId = +router.currentRoute.value.params.id
	const game = await GameService.getGameByID(gameId)
	pageContent.value = game.server
	pageContent.value = await GameService.getGamePage(
		game.server.split('/').pop() as string
	)
	const gamePage = document.getElementById('game-page-content')
	if (gamePage) {
		gamePage.innerHTML = pageContent.value
		setTimeout(() => reloadScripts(gamePage), 1000)
	}
})
onUnmounted(() => {
	const gamePage = document.getElementById('game-page-content')
	if (gamePage) {
		deleteScripts(gamePage)
	}
})
</script>

<template>
	<div v-if="pageContent" id="game-page-content"></div>
</template>

<style scoped src="./CallGamePage.scss"></style>
