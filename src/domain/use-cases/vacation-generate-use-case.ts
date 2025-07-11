import { VacationGenerateService } from '../../infra/service/vacation-generate-service'

export interface VacationGenerateUseCase {
	generate(params: VacationGenerateUseCase.Params): VacationGenerateUseCase.Result
}

export namespace VacationGenerateUseCase {
	export type Params = Array<{
		militaryRank: string
		personalNumber: number
		lastPromotion: Date
		name: string
		options: Array<number>
		allocated: boolean
	}>

	export type Result = {
		isSuccess: boolean
		data?: Array<{
			militaryRank: string
			personalNumber: number
			lastPromotion: Date
			name: string
			vacationMonth: string
		}>
		error?: Error
	}

	export type Dependencies = {
		vacationGenerateService: VacationGenerateService
	}
}
