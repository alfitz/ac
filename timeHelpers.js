/* Simple class that holds hours, minutes, and seconds representing
a clock time and that can convert itself into a Date() object
based on a reference dateObject. */
function CurrentTime(hours, minutes, seconds) {
	this.hours = hours;
	this.minutes = minutes;
	this.seconds = seconds;
}

function currentTimeToDateObject(currentTimeObject, referenceDateObject, shouldAdvanceADay) {
		const dateObject = new Date(referenceDateObject.getTime());

		dateObject.setHours(currentTimeObject.hours);
		dateObject.setMinutes(currentTimeObject.minutes);
		dateObject.setSeconds(currentTimeObject.seconds);

		if (shouldAdvanceADay === true) {
			dateObject.setDate(dateObject.getDate() + 1);
		}

		return dateObject;
}

function checkAlarmDateIsTomorrow(currentClockTime, currentAlarmTime) {
		// Returns a boolean indicating whether the current
		// alarm set is for tomorrow, meaning that the date
		// should be advanced a day before calculating the
		// time delta to set the alarm.
		if (currentClockTime.hours > currentAlarmTime.hours) {
			return true;
		} else if (
			currentClockTime.hours === currentAlarmTime.hours
			&& currentClockTime.minutes > currentAlarmTime.minutes
		) {
			return true;
		} else if (
			currentClockTime.minutes === currentAlarmTime.minutes
			&& currentClockTime.seconds > currentAlarmTime.seconds
		) {
			return true;
		}

		return false;
	}

export { CurrentTime, currentTimeToDateObject, checkAlarmDateIsTomorrow };