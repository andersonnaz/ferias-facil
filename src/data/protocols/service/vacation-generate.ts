export interface VacationGenerate {
	generate(params: VacationGenerate.Params): VacationGenerate.Result
}

export namespace VacationGenerate {
	export type Params = Array<{
		militaryRank: string
		personalNumber: number
		lastPromotion: Date
		name: string
		options: Array<number>
		allocated: boolean
	}>

	export type Result = Array<{
		militaryRank: string
		personalNumber: number
		lastPromotion: Date
		name: string
		vacationMonth: number
	}>
}
