import { VacationGenerateUseCase } from '../../domain/use-cases/vacation-generate-use-case'
import { SheetJsAdapter } from '../../infra/adapters/sheetjs-adapter'
import { VacationGenerateService } from '../../infra/service/vacation-generate-service'

export class VacationGenerateImplementation implements VacationGenerateUseCase {
	private readonly vacationGenerateService: VacationGenerateService
	private readonly parse: SheetJsAdapter

	constructor({ vacationGenerateService, parse }: VacationGenerateUseCase.Dependencies) {
		this.vacationGenerateService = vacationGenerateService
		this.parse = parse
	}

	async generate(filePath: VacationGenerateUseCase.Params): Promise<VacationGenerateUseCase.Result> {
		const vacationList = await this.parse.toJson(filePath)
		const vacationGenerateResult = this.vacationGenerateService.generate(vacationList)
		const vacationListExportedToExcel = await this.parse.toExcel({ filePath, data: vacationGenerateResult })
		return {
			isSuccess: true,
			data: vacationListExportedToExcel
		}
	}
}
