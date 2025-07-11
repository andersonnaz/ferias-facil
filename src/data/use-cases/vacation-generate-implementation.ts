import { VacationGenerateUseCase } from '../../domain/use-cases/vacation-generate-use-case'
import { VacationGenerateService } from '../../infra/service/vacation-generate-service'

export class VacationGenerateImplementation implements VacationGenerateUseCase {
	private readonly vacationGenerateService: VacationGenerateService

	constructor({ vacationGenerateService }: VacationGenerateUseCase.Dependencies) {
		this.vacationGenerateService = vacationGenerateService
	}

	generate(params: VacationGenerateUseCase.Params): VacationGenerateUseCase.Result {
		const vacationGenerateResult = this.vacationGenerateService.generate(params)
		return {
			isSuccess: true,
			data: vacationGenerateResult
		}
	}
}
