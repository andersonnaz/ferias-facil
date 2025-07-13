import { ParseToJson } from '../../data/protocols/service/parse-excel-to-json'
import { ExportToExcel } from '../../data/protocols/service/export-to-excel'
import * as XLXS from 'xlsx'
import { Employee } from '../../domain/model/employee'

export class SheetJsAdapter implements ExportToExcel, ParseToJson {
	async toJson(filePath: ParseToJson.Param): Promise<ParseToJson.Result> {
		const workbook = await XLXS.readFile(filePath)
		const sheetName = workbook.SheetNames[0]
		const sheet = workbook.Sheets[sheetName]
		return XLXS.utils.sheet_to_json<Employee>(sheet)
	}

	async toExcel({ filePath, data }: ExportToExcel.Param): Promise<ExportToExcel.Result> {
		const workSheet = XLXS.utils.json_to_sheet(data)
		const workbook = XLXS.utils.book_new()
		XLXS.utils.book_append_sheet(workbook, workSheet, 'Dados')
		return XLXS.writeFile(workbook, filePath)
	}
}
