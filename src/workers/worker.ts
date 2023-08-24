/* eslint-disable no-restricted-globals */
self.addEventListener('message', (event) => {
	const [url, apiKey] = event.data as string[];

	fetch(url, {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	})
		.then(response => response.json())
		.then((data) => {
			postMessage(data);
		});
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
