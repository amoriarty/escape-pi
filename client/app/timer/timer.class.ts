import * as Events from 'events';
import { TriggerInterface } from './timer.interface';

/**
 * Class for manage events after certain period of time.
 */
export default class Timer extends Events.EventEmitter {
	private _interval: NodeJS.Timer;
	private _elapsed = 0;
	private _running: Boolean = false;
	private _triggers: TriggerInterface[] = [];

	/**
	 * Create interval.
	 */
	constructor() {
		super();
		this._interval = setInterval(() => this._loop(), 1000);
	}

	/**
	 * Accessor for elapsed second since start.
	 */
	public get elapsed() {
		return this._elapsed;
	}

	/**
	 * Accessor for running state.
	 */
	public get running() {
		return this._running;
	}

	/**
	 * Allow adding a trigger at a specific time.
	 * @param trigger The trigger to add as a TriggerInterface.
	 */
	public set trigger(trigger: TriggerInterface) {
		this._triggers.push(trigger);
	}

	/**
	 * Start the timer.
	 */
	public start() {
		this._running = true;
	}

	/**
	 * Pause the timer.
	 */
	public pause() {
		this._running = false;
	}

	/**
	 * Pause the timer and reset elapsed seconds to 0.
	 */
	public stop() {
		this.pause();
		this._elapsed = 0;
	}

	/**
	 * Function to call when want to delete instance.
	 * Will stop interval starting at constructor.
	 */
	public deconstructor() {
		clearInterval(this._interval);
	}

	/**
	 * Function called every seconds since constructor called.
	 */
	private _loop() {
		if (!this.running) return ;
		this._elapsed += 1;

		for (let trigger of this._triggers) {
			if (trigger.at == this.elapsed) {
				this.emit('trigger', trigger);
			}
		}
	}
}
