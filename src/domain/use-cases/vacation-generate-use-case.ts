import { VacationGenerateService } from '../../infra/service/vacation-generate-service'
import { Employee } from '../model/employee'

export interface VacationGenerateUseCase {
	generate(params: VacationGenerateUseCase.Params): Promise<VacationGenerateUseCase.Result>
}

export namespace VacationGenerateUseCase {
	export type Params = Employee[]

	export type Result = Array<{
		militaryRank: string
		personalNumber: number
		lastPromotion: Date
		name: string
		vacationMonth: string
	}>

	export type Dependencies = {
		vacationGenerateService: VacationGenerateService
	}
}
