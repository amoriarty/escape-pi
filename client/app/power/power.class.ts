import * as exec from 'child_process';

export default class Power {
	shutdown() {
		exec.execSync('shutdown -h now');
	}

	reboot() {
		exec.execSync('reboot');
	}

	killomx() {
		exec.execSync('killall omxplayer.bin');
	}
}
