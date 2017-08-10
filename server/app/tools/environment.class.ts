/**
 * This class allow to get environment variable predefined for application.
 */
export default class Environment {
	/**
	 * This function check that all environment variable necessary
	 * for the application to work are defined.
	 */
	public static check(): Boolean {
		if (!process.env.SERVER_PORT ||
			!process.env.SERVER_BASEURL ||
			!process.env.MONGODB_URL)
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
	 * SERVER_PORT
	 */
	public static get port(): Number {
		return process.env.SERVER_PORT || null;
	}

	/**
	 * SERVER_BASEURL
	 */
	public static get baseurl(): String {
		return process.env.SERVER_BASEURL || null;
	}

	/**
	 * MONGODB_URL
	 */
	public static get mongodb_url(): String {
		return process.env.MONGODB_URL || null;
	}
}
