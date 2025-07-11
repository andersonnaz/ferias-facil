export interface Controller {
	handle(HttpRequest: HttpRequest): Promise<HttpResponse>
}

export interface HttpRequest {
	params?: any
	body?: any
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
