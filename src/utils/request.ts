export const request = async (url: string, method?: string, data?: any) => {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((response) => response.json());
};
