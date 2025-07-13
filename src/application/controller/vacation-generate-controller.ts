import { VacationGenerateImplementation } from '../../data/use-cases/vacation-generate-implementation'
import { Controller, HttpRequest, HttpResponse, notAcceptable, serverError, success } from '../protocols/controller'

export class VacationGenerateController implements Controller {
	private readonly vacationGenerate: VacationGenerateImplementation

	constructor({ vacationGenerate }: VacationGenerateController.Dependencies) {
		this.vacationGenerate = vacationGenerate
	}

	async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { file } = HttpRequest
			const result = await this.vacationGenerate.generate(file.path)
			if (!result.isSuccess) {
				return notAcceptable(result.error as Error)
			}
			return success(result)
		} catch (error) {
			return serverError(error as Error)
		}
	}
}

export namespace VacationGenerateController {
	export type Dependencies = {
		vacationGenerate: VacationGenerateImplementation
	}
}
