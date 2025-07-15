export interface ExportToExcel {
	toExcel(param: ExportToExcel.Param): Promise<ExportToExcel.Result>
}

export namespace ExportToExcel {
	export type Param = {
		filePath: string
		data: Array<{
			militaryRank: string
			personalNumber: number
			lastPromotion: Date
			name: string
			vacationMonth: string
		}>
	}
	export type Result = void
}
