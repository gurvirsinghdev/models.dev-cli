import React, {useEffect} from 'react';
import AppProvider from './components/AppContext.js';
import {useWidth} from './components/useWidth.js';
import ProvidersPanel from './components/ProvidersPanel.js';
import {useInput} from 'ink';
import {useAltScreen} from './components/useAltScreen.js';

export default function App() {
	const width = useWidth();
	const leftWidth = Math.floor(width * 0.35);
	// const rightWidth = width - leftWidth;

	const {enterAlt, exitAlt} = useAltScreen();
	useEffect(function () {
		enterAlt();
		return () => exitAlt();
	}, []);
	useInput(function (input) {
		if (input === 'q') {
			exitAlt();
			process.exit();
		}
	});

	return (
		<AppProvider>
			<ProvidersPanel width={leftWidth} />
		</AppProvider>
	);
}
