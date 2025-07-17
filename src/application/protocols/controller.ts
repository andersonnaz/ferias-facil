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

export const invalidParamError = (error: Error): HttpResponse => {
	return {
		statusCode: 406,
		body: error
	}
}

export const serverError = (error: Error): HttpResponse => {
	return {
		statusCode: 500,
		body: error
	}
}
