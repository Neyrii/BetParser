import fetch from 'node-fetch'
import { Response } from 'node-fetch'
import * as cheerio from 'cheerio'
import { HTTPResponseError} from "./error/HTTPResponseError.js"

const checkStatus = function(response: Response) {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
}

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

export async function cheerio_fetch(url: string){
    const response = await fetch(url);
    try {
        checkStatus(response);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
    let html = await response.text()
    return (cheerio.load(html))
}