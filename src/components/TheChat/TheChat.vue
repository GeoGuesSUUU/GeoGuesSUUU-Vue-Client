<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ChatSocket } from '../../client/web-services/chat-socket'
import ChatMessage from './components/ChatMessage/ChatMessage.vue'

const messageInput = ref('')

const chat = new ChatSocket()

onMounted(() => {
	const chatElement = document.getElementById('chat') as HTMLElement
	chat.onAfterConnected.value = () => {
		setTimeout(() => {
			chatElement.scrollTop = chatElement.scrollHeight
		}, 100)
	}
	chat.onAfterNewMessage.value = () => {
		setTimeout(() => {
			chatElement.scrollTop = chatElement.scrollHeight
		}, 100)
	}
})

function saveColor(): void {
	chat.saveColor()
}

function sendMessage(event: Event): void {
	event.preventDefault()
	chat.sendMessage(messageInput.value)
	messageInput.value = ''
}

onUnmounted(() => {
	chat.close()
})
</script>

<template>
	<div class="d-flex card border-secondary m-3">
		<div class="card-header">
			Online Chat
			<span class="badge-online badge bg-secondary">
				<span v-if="chat.isConnected.value">
					<span
						class="online-post d-inline-block rounded-circle p-1 mx-1"></span>
					<span id="user-online">{{ chat.userOnline }}</span>
					online
				</span>
				<span v-else>
					<i class="reloading-icon bi bi-arrow-clockwise"></i>
					Reconnection in
					<span id="reconnect-counter">{{ chat.connectionTimer }}</span>
					seconds...
				</span>
			</span>
		</div>
		<div class="card-body text-secondary">
			<div id="chat">
				<ChatMessage
					v-for="(message, index) of chat.messages.value"
					v-bind:key="index"
					:message="message"></ChatMessage>
			</div>
			<div>
				<form
					v-on:submit="sendMessage($event)"
					id="chat-form"
					class="d-flex flex-row justify-content-center">
					<input
						type="color"
						class="form-control form-control-color"
						id="color-picker"
						title="Choose your color"
						v-model="chat.color.value"
						v-on:change="saveColor()" />
					<label for="message"></label>
					<input
						type="text"
						id="message"
						class="form-control"
						placeholder="Envoyer un message"
						autocomplete="false"
						v-model="messageInput" />
					<button type="submit" id="sendBtn" class="btn btn-secondary">
						Send
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<style scoped src="./TheChat.scss"></style>
