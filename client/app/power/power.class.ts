import * as exec from 'child_process';
import Debug from '../tools/debug.class';

export default class Power {
	public static shutdown() {
		try { exec.execSync('shutdown -h now'); }
		catch (error) {
			Debug.error('An error occures when trying to shutdown: ' + error);
		}
	}

	public static reboot() {
		try { exec.execSync('reboot'); }
		catch (error) {
			Debug.error('An error occures when trying to reboot: ' + error);
		}
	}
}
