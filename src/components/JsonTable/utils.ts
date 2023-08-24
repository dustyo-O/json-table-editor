export const string2String = (value: string) => value;
export const string2Number = (value: string) => +value;
export const string2Boolean = (value: string) => value === 'true';

export const isJson = (string: string) => {
	try {
		JSON.parse(string);
	} catch (e) {
		return false;
	}
	return true;
};
