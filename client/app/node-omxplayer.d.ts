declare var Omx: NodeOmxPlayerStatic;

declare module 'node-omxplayer' {
	export = Omx;
}

interface NodeOmxPlayerStatic {
	(source?, output?, loop?, initialVolume?, showOsd?);
}
