import Environment from "./environment.class";

/**
 * Class with function only executed when NODE_ENV is "development".
 */
export default class Debug {
	/**
	 * Private function returning status of debug mode.
	 * @return true if NODE_ENV is "development".
	 */
	public static get on(): Boolean {
		return (Environment.node_env == "development") ? true : false;
	}

	/**
	 * Log on console, on standart output.
	 * @param message 
	 * @param optionalParams 
	 */
	public static log(message?: any, ...optionalParams: any[]) {
		if (this.on) {
			console.log(message);
			for (let item of optionalParams)
				console.log(item);
		}
	}

	/**
	 * Log on console, on error output.
	 * @param message 
	 * @param optionalParams 
	 */
	public static error(message?: any, ...optionalParams: any[]) {
		if (this.on) {
			console.error(message);
			for (let item of optionalParams)
				console.log(item);
		}
	}
}
