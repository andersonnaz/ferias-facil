export interface Controller {
	handle(HttpRequest: HttpRequest): Promise<HttpResponse>
}

export interface HttpRequest {
	file: any
}

export interface HttpResponse {
	statusCode: number
	body: any
}

export const success = (data: any): HttpResponse => {
	return {
		statusCode: 200,
		body: data
	}
}

export const badRequest = (data: any): HttpResponse => {
	return {
		statusCode: 404,
		body: data
	}
}

export const notAcceptable = (error: Error): HttpResponse => {
	class NotAcceptableError extends Error {
		constructor(paramName: string) {
			super(`Not Acceptable: ${paramName}`)
			this.name = 'NotAcceptableError'
		}
	}

	return {
		statusCode: 406,
		body: new NotAcceptableError(error.message)
	}
}

export const serverError = (error: Error): HttpResponse => {
	class ServerError extends Error {
		constructor(stack: string) {
			super('Internal Server Error')
			this.name = 'Server Error'
			this.stack = stack
		}
	}

	return {
		statusCode: 500,
		body: new ServerError(error.stack as string)
	}
}
