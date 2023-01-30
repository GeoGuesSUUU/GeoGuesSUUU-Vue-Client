<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { updateUserProfile } from '@/client/services/event-service'
import { NotifyService, NotifyType } from '@/client/services/notify-service'
import { UserService } from '@/client/services/user-service'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()

const { currentUser } = toRefs(geoStore)

const username = ref(currentUser.value?.name)
const locale = ref(currentUser.value?.locale)
const img = ref(currentUser.value?.img)
const pwd = ref(undefined)

async function submit() {
	if (!currentUser.value) return
	try {
		const userUpdated = await UserService.update(currentUser.value.id, {
			name: username.value,
			locale: locale.value,
			img: img.value,
			password: pwd.value,
		})
		currentUser.value.name = userUpdated.name
		currentUser.value.locale = userUpdated.locale
		currentUser.value.img = userUpdated.img
		updateUserProfile(currentUser.value)
		NotifyService.notify('Update Data Success !', NotifyType.SUCCESS)
	} catch (error) {
		NotifyService.notify('Update Data Failed', NotifyType.DANGER)
	}
}
</script>

<template>
	<div
		class="modal fade"
		id="userModifyModal"
		tabindex="1051"
		aria-labelledby="userModifyModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="userModifyModalLabel">
						User Modify
					</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-floating mb-3">
							<input
								type="text"
								class="form-control"
								id="floatingName"
								placeholder="..."
								v-model="username" />
							<label for="floatingName">Username</label>
						</div>
						<div class="form-floating mb-3">
							<input
								type="text"
								class="form-control"
								id="floatingName"
								placeholder="..."
								v-model="pwd" />
							<label for="floatingName">Password</label>
						</div>
						<div class="form-floating mb-3">
							<select class="form-select form-control" v-model="locale">
								<option value="en-US">English</option>
								<option value="fr">French</option>
								<option value="es">Spanish</option>
								<option value="de">German</option>
								<option value="it">Italian</option>
								<option value="zh-CN">Chinese</option>
							</select>
							<label for="floatingName">Locale</label>
						</div>
						<div class="form-floating mb-3">
							<input
								type="text"
								class="form-control"
								id="floatingName"
								placeholder="..."
								v-model="img" />
							<label for="floatingName">Image URL</label>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal">
						Close
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="submit"
						data-bs-dismiss="modal">
						Submit
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./UserModifyModal.scss"></style>
