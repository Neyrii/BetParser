export class HTTPResponseError extends Error {
    response;

	constructor(response: any, ...args: any) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
	}
}