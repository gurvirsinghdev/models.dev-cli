import React, {useEffect, useState} from 'react';

export interface Model {
	id: string;
	name: string;
	family: string;
	attachment: boolean;
	reasoning: boolean;
	tool_call: boolean;
	structured_output: boolean;
	temperature: boolean;
	knowledge: string;
	release_date: string;
	last_updated: string;
	modalities: {input: string[]; output: string[]};
	open_weights: boolean;
	cost: {input: number; output: number; cache_read: number};
	limit: {context: number; output: number};
}

export interface Provider {
	id: string;
	env: string[];
	npm: string;
	api: string;
	name: string;
	doc: string;
	models: Record<string, Model>;
}

interface AppContextProps {
	loaded: boolean;
	selectedProvider: string | null;
	setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
	data: Record<string, Provider> | null;
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

export const useAppContext = function () {
	if (AppContext === undefined) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return React.useContext(AppContext)!;
};

export const useProviders = function () {
	const {data} = useAppContext();
	const providers = Object.values(data ?? {});

	return providers.map(provider => ({
		id: provider.id,
		supportedModelsCount: Object.keys(provider.models).length,
	}));
};

export const useSelectedProvider = function () {
	const {selectedProvider, setSelectedProvider} = useAppContext();
	return {selectedProvider, setSelectedProvider};
};

interface AppProviderProps {
	children: React.ReactNode;
}
export default function AppProvider({children}: AppProviderProps) {
	const [loaded, setLoaded] = useState(false);
	const [data, setData] = useState<Record<string, Provider> | null>(null);

	const [selectedProvider, setSelectedProvider] = React.useState<string | null>(
		null,
	);

	useEffect(function () {
		const fetchData = async function () {
			const apiUrl = 'https://models.dev/api.json';
			const apiResponse = await fetch(apiUrl).then(response => response.json());
			setLoaded(true);
			setData(apiResponse);
		};
		fetchData();
	}, []);

	useEffect(
		function () {
			if (data) {
				const values = Object.values(data);
				const firstProviderId = values[0]?.id ?? null;
				setSelectedProvider(firstProviderId);
			}
		},
		[data],
	);

	return (
		<AppContext.Provider
			value={{loaded, data, selectedProvider, setSelectedProvider}}
		>
			{children}
		</AppContext.Provider>
	);
}
