export function isValid<T extends object>(data: T | IResponseError): data is T {
	return !('error' in data);
}
