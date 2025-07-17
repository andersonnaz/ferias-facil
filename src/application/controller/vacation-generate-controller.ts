import { VacationGenerateImplementation } from '../../data/use-cases/vacation-generate-implementation'
import { Employee } from '../../domain/model/employee'
import { SheetJsAdapter } from '../../infra/adapters/sheetjs-adapter'
import { Controller, HttpRequest, HttpResponse, invalidParamError, serverError, success } from '../protocols/controller'

export class VacationGenerateController implements Controller {
	private readonly vacationGenerate: VacationGenerateImplementation
	private readonly parse: SheetJsAdapter

	constructor({ vacationGenerate, parse }: VacationGenerateController.Dependencies) {
		this.vacationGenerate = vacationGenerate
		this.parse = parse
	}

	async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { file } = HttpRequest
			const vacationList = await this.parse.toJson(file.path)
			if (!vacationList.isValid) {
				return invalidParamError(vacationList.error as Error)
			}
			const result = await this.vacationGenerate.generate(vacationList.data as Employee[])
			await this.parse.toExcel({
				filePath: file.path,
				data: result
			})
			return success(file.path)
		} catch (error) {
			return serverError(error as Error)
		}
	}
}

export namespace VacationGenerateController {
	export type Dependencies = {
		vacationGenerate: VacationGenerateImplementation
		parse: SheetJsAdapter
	}
}
