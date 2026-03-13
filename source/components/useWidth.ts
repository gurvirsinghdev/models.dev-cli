import {useStdout} from 'ink';

export const useWidth = () => {
	const {stdout} = useStdout();
	return stdout.columns;
};
