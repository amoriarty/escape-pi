import * as exec from 'child_process';

export default class Power {
	shutdown() {
		exec.execSync('shutdown -h now');
	}

	reboot() {
		exec.execSync('reboot');
	}

	killomx() {
		try {
			exec.execSync('killall omxplayer.bin');
			exec.execSync('killall omxplayer');
		}
		catch (error) { }
	}
}
