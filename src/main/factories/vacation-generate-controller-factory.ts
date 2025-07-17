import { VacationGenerateController } from '../../application/controller/vacation-generate-controller'
import { Controller } from '../../application/protocols/controller'
import { SheetJsAdapter } from '../../infra/adapters/sheetjs-adapter'
import { makeVacationGenerateUseCase } from './vacation-generate-implementation-factory'

export const makeVacationGenerateController = (): Controller => {
	const vacationGenerateUseCase = makeVacationGenerateUseCase()
	const sheetJsAdapter = new SheetJsAdapter()
	const dependencies: VacationGenerateController.Dependencies = {
		parse: sheetJsAdapter,
		vacationGenerate: vacationGenerateUseCase
	}
	const vacationGenerateController = new VacationGenerateController(dependencies)
	return vacationGenerateController
}
