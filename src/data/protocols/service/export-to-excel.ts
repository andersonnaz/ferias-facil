export interface ExportToExcel {
	toExcel(param: ExportToExcel.Param): Promise<ExportToExcel.Result>
}

export namespace ExportToExcel {
	export type Param = {
		filePath: string
		data: any[]
	}
	export type Result = any
}
