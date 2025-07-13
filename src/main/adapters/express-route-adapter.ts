import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../application/protocols/controller'

export const adaptRoute = (controller: Controller) => {
	return async (request: Request, response: Response) => {
		const httpRequest: HttpRequest = {
			file: request.file
		}
		const httpResponse: HttpResponse = await controller.handle(httpRequest)
		response.status(httpResponse.statusCode).json(httpResponse.body)
	}
}
