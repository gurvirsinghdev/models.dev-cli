import {useStdout} from 'ink';

export const useAltScreen = function () {
	const {stdout} = useStdout();
	return {
		enterAlt: () => {
			stdout.write('\x1b[?1049h');
			stdout.write('\x1b[?25l');
		},
		exitAlt: () => {
			stdout.write('\x1b[?25h');
			stdout.write('\x1b[?1049l');
		},
	};
};
