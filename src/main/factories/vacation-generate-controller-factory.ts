import { VacationGenerateController } from '../../application/controller/vacation-generate-controller'
import { Controller } from '../../application/protocols/controller'
import { makeVacationGenerateUseCase } from './vacation-generate-implementation-factory'

export const makeVacationGenerateController = (): Controller => {
	const vacationGenerateUseCase = makeVacationGenerateUseCase()
	const dependencies: VacationGenerateController.Dependencies = {
		vacationGenerate: vacationGenerateUseCase
	}
	const vacationGenerateController = new VacationGenerateController(dependencies)
	return vacationGenerateController
}
