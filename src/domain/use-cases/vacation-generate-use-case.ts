import { SheetJsAdapter } from '../../infra/adapters/sheetjs-adapter'
import { VacationGenerateService } from '../../infra/service/vacation-generate-service'

export interface VacationGenerateUseCase {
	generate(params: VacationGenerateUseCase.Params): Promise<VacationGenerateUseCase.Result>
}

export namespace VacationGenerateUseCase {
	export type Params = string

	export type Result = {
		isSuccess: boolean
		filePath: string
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
		parse: SheetJsAdapter
	}
}
