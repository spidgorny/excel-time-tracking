export class AppStateBase {

	_storage = window.localStorage;

	_callbacks: Function[] = [];

	fetch(name: string, defaultValue: any = null) {
		const val = this._storage.getItem(name);
		if (!val) {
			return defaultValue;
		}
		return JSON.parse(val);
	}

	update(name: string, value: any) {
		this._storage.setItem(name, JSON.stringify(value));
	}

	subscribe(call: Function) {
		console.log('subscribe');
		this._callbacks.push(call);
	}

	notify() {
		console.log('notify', this._callbacks.length);
		for (const callMe of this._callbacks) {
			callMe();
		}
	}

}
