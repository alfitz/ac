import { CurrentTime } from './timeHelpers';
import { clockElements } from './cssSelectors';


export default class ClockTime {
	constructor(timeNow) {
		this.clockTick = this.clockTick.bind(this);
		this.getClockDOMElements();
		this.initializeCurrentTime(timeNow);
	}

	getClockDOMElements() {
		this.hoursDigit = document.getElementsByClassName(clockElements.hoursDigit)[0];
		this.minutesDigit = document.getElementsByClassName(clockElements.minutesDigit)[0];
		this.secondsDigit = document.getElementsByClassName(clockElements.secondsDigit)[0];
	}

	initializeCurrentTime(timeNow) {
		this.currentTime = new CurrentTime(
			timeNow.getHours(),
			timeNow.getMinutes(),
			timeNow.getSeconds(),
		);

		this.updateTimeDisplay(
			this.currentTime.hours,
			this.hoursDigit,
		);
		this.updateTimeDisplay(
			this.currentTime.minutes,
			this.minutesDigit,
		);
		this.updateTimeDisplay(
			this.currentTime.seconds,
			this.secondsDigit,
		);

		this.windClock();
	}

	updateTimeDisplay(timeValue, timeElement) {
		timeElement.innerHTML = timeValue <= 9 ? '0' + timeValue :timeValue;
	}

	setHours() {
		if (this.currentTime.hours === 23) {
			this.currentTime.hours = 0;
		} else {
			this.currentTime.hours += 1;
		}

		this.updateTimeDisplay(this.currentTime.hours, this.hoursDigit);	
	}

	setMinutes() {
		if (this.currentTime.minutes === 59) {
			this.currentTime.minutes = 0;
			this.setHours();
		} else {
			this.currentTime.minutes += 1;
		}

		this.updateTimeDisplay(this.currentTime.minutes, this.minutesDigit);	
	}

	setSeconds() {
		if (this.currentTime.seconds === 59) {
			this.currentTime.seconds = 0;
			this.setMinutes();
		} else {
			this.currentTime.seconds += 1;
		}

		this.updateTimeDisplay(this.currentTime.seconds, this.secondsDigit);
	}

	clockTick() {
		this.setSeconds();
	}

	windClock() {
		setInterval(this.clockTick, 1000);
	}

	getCurrentTime() {
		return this.currentTime;
	}
}