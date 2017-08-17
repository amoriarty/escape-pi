/**
 * This class allow to get environment variable predefined for application.
 */
export default class Environment {
	/**
	 * This function check that all environment variable necessary
	 * for the application to work are defined.
	 */
	public static check(): Boolean {
		if (this.socket_url == null ||
			this.pi_name == null ||
			this.videos_path == null ||
			this.door_trigger == null)
			return false;
		return true;
	}

	/**
	 * NODE_ENV
	 */
	public static get node_env(): String {
		return process.env.NODE_ENV || null;
	}

	/**
	 * SOCKET_URL
	 */
	public static get socket_url(): String {
		return process.env.SOCKET_URL || null;
	}

	/**
	 * PI_NAME
	 */
	public static get pi_name(): String {
		return process.env.PI_NAME || null;
	}

	/**
	 * VIDEOS_PATH
	 */
	public static get videos_path(): String {
		return process.env.VIDEOS_PATH || null;
	}

	/**
	 * DOOR_TRIGGER
	 */
	public static get door_trigger(): Boolean {
		if (process.env.DOOR_TRIGGER == undefined)
			return null;
		return process.env.DOOR_TRIGGER === "true" ? true : false;
	}
}
