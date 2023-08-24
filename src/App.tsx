import React, { useEffect, useState } from 'react';
import { SimpleDialogContainer, simplePrompt } from 'react-simple-dialogs';

import { JsonTable } from './components/JsonTable/JsonTable';

const localStorageToken = localStorage.getItem('json-generator-token');

const showPrompt = async () => {
	const token = await simplePrompt('Please provide json generator token');

	return token;
};

function App() {
	const [token, setToken] = useState(localStorageToken);

	useEffect(() => {
		if (token) {
			return;
		}

		showPrompt()
			.then((newToken) => {
				localStorage.setItem('json-generator-token', newToken);
				setToken(newToken);
			});
	}, [token]);

	if (!token) {
		return <SimpleDialogContainer />;
	}

	return (
		<div className="App">
			<JsonTable token={token} />
		</div>
	);
}

export default App;
