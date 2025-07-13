import { VacationGenerateImplementation } from '../../data/use-cases/vacation-generate-implementation'
import { VacationGenerateUseCase } from '../../domain/use-cases/vacation-generate-use-case'
import { SheetJsAdapter } from '../../infra/adapters/sheetjs-adapter'
import { VacationGenerateService } from '../../infra/service/vacation-generate-service'

export const makeVacationGenerateUseCase = (): VacationGenerateImplementation => {
	const parse = new SheetJsAdapter()
	const vacationGenerateService = new VacationGenerateService()
	const dependencies: VacationGenerateUseCase.Dependencies = {
		parse,
		vacationGenerateService
	}
	const vacationGenerateUseCase = new VacationGenerateImplementation(dependencies)
	return vacationGenerateUseCase
}
