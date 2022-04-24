export const getFormattedDate = (date: string) => {
	let new_date = new Date(date);
	let day = new_date.getDate();
	let month = new_date.toLocaleString('default', { month: 'long' });
	let year = new_date.getFullYear();
	return `${day} ${month} ${year}`;
};
