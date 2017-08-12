/**
 * This tool class is done for never have undefined item in a list.
 */
export default class List<T> {
	private _items: T[] = [];

	/**
	 * Setter to push an element in list.
	 * @param item Item to push.
	 */
	public set add(item: T) {
		this._items.push(item);
	}

	/**
	 * Return the array, without undefined values.
	 */
	public get items() {
		let result: T[] = [];

		for (let item of this._items) {
			if (item == undefined)
				continue ;
			result.push(item);
		}
		return result;
	}

	/**
	 * Delete item pass in parameter from the list.
	 * @param item Item to delete.
	 */
	public del(item: T) {
		let index = this._items.indexOf(item);

		delete this._items[index];
	}

	public find(validator: (item: T) => boolean): T {
		return this.items.find(validator);
	}
}
