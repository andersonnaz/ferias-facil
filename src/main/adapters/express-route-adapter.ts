import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../application/protocols/controller'
import fs from 'fs'

export const adaptRoute = (controller: Controller) => {
	return async (request: Request, response: Response) => {
		const httpRequest: HttpRequest = {
			file: request.file
		}
		const httpResponse: HttpResponse = await controller.handle(httpRequest)
		response.status(httpResponse.statusCode).download(httpResponse.body.filePath)
		response.on('finish', () =>
			fs.unlink(httpResponse.body.filePath, (error) => {
				if (error) {
					console.error('cant delete file')
				}
			})
		)
	}
}
