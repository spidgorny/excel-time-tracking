export class Storage {
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

	subscribe(call: Function, comment?: string) {
		let index = this._callbacks.push(call) - 1;
		console.log('subscribe', index, call.name, comment);
		return index;
	}

	unsubscribe(index: number, comment?: string) {
		console.log('unsubscribe', index, comment);
		delete this._callbacks[index];
	}

	notify() {
		// console.log("notify", this._callbacks.length);
		// for (const callMe of this._callbacks) {
		// console.time(callMe.name);
		// callMe && callMe();
		// console.timeEnd(callMe.name);
		// }
	}
}
