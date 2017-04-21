import AlarmTime from './AlarmTime';
import ClockTime from './ClockTime';
import { clockControls } from './cssSelectors';
import { checkAlarmDateIsTomorrow, currentTimeToDateObject } from './timeHelpers';


export default class AlarmClock {
	constructor() {
		this.handleSetAlarm = this.handleSetAlarm.bind(this);
		this.handleCancelAlarm = this.handleCancelAlarm.bind(this);
		this.handleDismissAlarm = this.handleDismissAlarm.bind(this);

		this.alarmGoesOff = this.alarmGoesOff.bind(this);
		this.flashAlarm = this.flashAlarm.bind(this);

		this.setupClockElements();
		this.setupClockControls();

		this.alarmCountdown = null;
		this.flashInterval = null;
	}

	setupClockElements() {
		const timeNow = new Date();
		this.clockTime = new ClockTime(timeNow);
		this.alarmTime = new AlarmTime();
	}

	setupClockControls() {
		this.clockContainer = document.body.getElementsByClassName(clockControls.clockContainer)[0];
		this.alarmSetButton = document.body.getElementsByClassName(clockControls.setAlarmButton)[0];
		this.alarmCancelButton = document.body.getElementsByClassName(clockControls.cancelAlarmButton)[0];
		this.alarmDismissButton = document.body.getElementsByClassName(clockControls.dismissAlarmButton)[0];

		this.alarmSetButton.addEventListener('click', this.handleSetAlarm);
		this.alarmCancelButton.addEventListener('click', this.handleCancelAlarm);
		this.alarmDismissButton.addEventListener('click', this.handleDismissAlarm);
	}

	handleSetAlarm() {
		const currentClockTime = this.clockTime.getCurrentTime();
		const currentAlarmTime = this.alarmTime.getCurrentAlarmSelection();
		const alarmIsTomorrow = checkAlarmDateIsTomorrow(currentClockTime, currentAlarmTime);

		const referenceTime = new Date();
		const clockDateObject = currentTimeToDateObject(currentClockTime, referenceTime, false);
		const alarmDateObject = currentTimeToDateObject(currentAlarmTime, referenceTime, alarmIsTomorrow);

		const timeDelta = alarmDateObject - clockDateObject;
		this.alarmCountdown = setTimeout(this.alarmGoesOff, timeDelta);

		this.displayAlarm(currentAlarmTime, alarmIsTomorrow);
		this.hideControl(this.alarmSetButton);
		this.showControl(this.alarmCancelButton);
	}

	handleCancelAlarm() {
		clearTimeout(this.alarmCountdown);

		this.alarmTime.showAlarmSelection();
		this.hideControl(this.alarmCancelButton);
		this.showControl(this.alarmSetButton);
	}

	handleDismissAlarm() {
		clearInterval(this.flashInterval);
		this.clockContainer.style.opacity = 1;

		this.alarmTime.showAlarmSelection();
		this.hideControl(this.alarmDismissButton);
		this.showControl(this.alarmSetButton);
	}

	displayAlarm(alarmSetTime, isTomorrow) {
		this.alarmTime.hideAlarmSelection();
		this.alarmTime.showCurrentAlarm(alarmSetTime, isTomorrow);
	}

	hideControl(controlSelector) {
		controlSelector.classList.add('hidden');
	}

	showControl(controlSelector) {
		controlSelector.classList.remove('hidden');
	}

	alarmGoesOff() {
		this.flashAlarm();
		this.alarmTime.showAlarmAlert();

		this.hideControl(this.alarmCancelButton);
		this.showControl(this.alarmDismissButton);
	}

	flashAlarm () {
		let clockOpacity = 1;
		let makeLighter = true;
		
		function changeOpacity(clockContainer) {
			if (makeLighter === true) {
				clockOpacity -= 0.1;
			} else {
				clockOpacity += 0.1;
			}

			clockContainer.style.opacity = clockOpacity.toFixed(1);

			if (clockOpacity <= 0.5) {
				makeLighter = false;
			} else if (clockOpacity === 1) {
				makeLighter = true;
			}
		}

		this.flashInterval = setInterval(changeOpacity, 100, this.clockContainer);
	}
}