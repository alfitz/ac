import { CurrentTime } from './timeHelpers';
import { alarmElements } from './cssSelectors';

export default class AlarmTime {
	constructor() {
		this.getAlarmDOMElements();
	}
	
	getAlarmDOMElements(hours) {
		this.alarmSelectionContainer = document.body.getElementsByClassName(alarmElements.selectionContainer)[0];
		this.alarmDisplayContainer = document.body.getElementsByClassName(alarmElements.displayContainer)[0];
		this.alarmTime = document.body.getElementsByClassName(alarmElements.alarmTime)[0];
		this.alarmAlert = document.body.getElementsByClassName(alarmElements.alarmAlert)[0];

		this.hoursSelection = document.body.getElementsByClassName(alarmElements.hoursSelector)[0];
		this.minutesSelection = document.body.getElementsByClassName(alarmElements.minutesSelector)[0];
		this.secondsSelection = document.body.getElementsByClassName(alarmElements.secondsSelector)[0];
	}
	
	getCurrentAlarmSelection() {
			const currentSelection = new CurrentTime(
				parseInt(this.hoursSelection.options[this.hoursSelection.selectedIndex].value),
				parseInt(this.minutesSelection.options[this.minutesSelection.selectedIndex].value),
				parseInt(this.secondsSelection.options[this.secondsSelection.selectedIndex].value),
			);

			return currentSelection;
	}

	hideAlarmSelection() {
		this.alarmSelectionContainer.classList.add('hidden');
	}

	showAlarmSelection() {
		this.alarmSelectionContainer.classList.remove('hidden');

		if (!this.alarmDisplayContainer.classList.contains('hidden')) {
			this.alarmDisplayContainer.classList.add('hidden');
		}

		if (!this.alarmAlert.classList.contains('hidden')) {
			this.alarmAlert.classList.add('hidden');
		}
	}

	showAlarmAlert() {
		this.alarmDisplayContainer.classList.add('hidden');
		this.alarmAlert.classList.remove('hidden');
	}

	updateTimeDisplay(timeValue) {
		return timeValue <= 9 ? '0' + timeValue : timeValue;
	}

	showCurrentAlarm(alarmSetTime, isTomorrow) {
		this.alarmDisplayContainer.classList.remove('hidden');
		let returnString = isTomorrow === true ? ' tomorrow at ' : ' today at ';
		returnString += this.updateTimeDisplay(alarmSetTime.hours) + ':' + this.updateTimeDisplay(alarmSetTime.minutes) + ':' + this.updateTimeDisplay(alarmSetTime.seconds);
		this.alarmTime.innerHTML = returnString;
	}
}