import React from 'react';
import {Box, Text} from 'ink';
import {useProviders, useSelectedProvider} from './AppContext.js';

interface ProviderPanelProps {
	width: number;
}

export default function ProvidersPanel({width}: ProviderPanelProps) {
	const providers = useProviders();
	const {selectedProvider} = useSelectedProvider();

	return (
		<Box width={width} borderStyle={'round'} flexDirection={'column'}>
			<Text color={'yellow'}>Providers</Text>

			{providers.map(provider => (
				<Text key={provider.id} inverse={provider.id === selectedProvider}>
					{provider.id}
				</Text>
			))}
		</Box>
	);
}
