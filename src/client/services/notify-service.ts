import { createToast, type Position } from 'mosha-vue-toastify'

export enum NotifyType {
	DEFAULT = 'default',
	INFO = 'info',
	WARNING = 'warning',
	SUCCESS = 'success',
	DANGER = 'danger',
}

export class NotifyService {
	static async notify(
		message: string,
		type: NotifyType = NotifyType.DEFAULT
	): Promise<void> {
		createToast(message, {
			position: (localStorage.getItem('notif-position') ??
				'bottom-right') as Position,
			type: type,
			transition: 'bounce',
			showIcon: true,
		})
	}
}
