import { VacationGenerateImplementation } from '../../data/use-cases/vacation-generate-implementation'
import { VacationGenerateUseCase } from '../../domain/use-cases/vacation-generate-use-case'
import { VacationGenerateService } from '../../infra/service/vacation-generate-service'

export const makeVacationGenerateUseCase = (): VacationGenerateImplementation => {
	const vacationGenerateService = new VacationGenerateService()
	const dependencies: VacationGenerateUseCase.Dependencies = {
		vacationGenerateService
	}
	const vacationGenerateUseCase = new VacationGenerateImplementation(dependencies)
	return vacationGenerateUseCase
}
