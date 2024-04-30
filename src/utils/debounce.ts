export const debounce = (func: Function, delay: number) => {
	let timeoutId: number;
	return (...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(func, delay, ...args);
	};
};
