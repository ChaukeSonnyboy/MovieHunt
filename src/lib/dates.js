/** @returns {string} YYYY-MM-DD */
export function formatISODate(d) {
	return d.toISOString().slice(0, 10);
}

export function todayISO() {
	return formatISODate(new Date());
}

export function tomorrowISO() {
	const d = new Date();
	d.setDate(d.getDate() + 1);
	return formatISODate(d);
}

export function daysAgoISO(days) {
	const d = new Date();
	d.setDate(d.getDate() - days);
	return formatISODate(d);
}
