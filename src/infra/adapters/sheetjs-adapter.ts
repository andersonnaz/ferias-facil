import { ParseToJson } from '../../data/protocols/service/parse-excel-to-json'
import { ExportToExcel } from '../../data/protocols/service/export-to-excel'
import * as XLXS from 'xlsx'

interface EmployeeDataPortuguese {
	graduacao: string
	numeral: number
	ultimaPromocao: Date
	nome: string
	opcao1: string
	opcao2: string
	opcao3: string
}

export class SheetJsAdapter implements ExportToExcel, ParseToJson {
	async toJson(filePath: ParseToJson.Param): Promise<ParseToJson.Result> {
		const workbook = await XLXS.readFile(filePath)
		const sheetName = workbook.SheetNames[0]
		const sheet = workbook.Sheets[sheetName]
		const vacationList = XLXS.utils.sheet_to_json<EmployeeDataPortuguese>(sheet)
		const vacationListEmployees = vacationList.map((employee) => {
			if (!employee.ultimaPromocao) {
				employee.ultimaPromocao = new Date(0)
			}
			return {
				militaryRank: employee.graduacao,
				personalNumber: employee.numeral,
				lastPromotion: employee.ultimaPromocao,
				name: employee.nome,
				options: [
					this.parseMonthToNumber(employee.opcao1),
					this.parseMonthToNumber(employee.opcao2),
					this.parseMonthToNumber(employee.opcao3)
				],
				allocated: false
			}
		})
		return vacationListEmployees
	}

	async toExcel({ filePath, data }: ExportToExcel.Param): Promise<ExportToExcel.Result> {
		const vacationList = data.map((employee) => {
			const date = XLXS.SSF.parse_date_code(employee.lastPromotion)
			if (date.d == 0) {
				return {
					graduacao: employee.militaryRank,
					numeral: employee.personalNumber,
					nome: employee.name,
					mesDasFerias: employee.vacationMonth
				}
			}
			return {
				graduacao: employee.militaryRank,
				numeral: employee.personalNumber,
				ultimaPromocao: `${date.d}/${date.m}/${date.y}`,
				nome: employee.name,
				mesDasFerias: employee.vacationMonth
			}
		})
		const workSheet = XLXS.utils.json_to_sheet(vacationList)
		const workbook = XLXS.utils.book_new()
		XLXS.utils.book_append_sheet(workbook, workSheet, 'Dados')
		return XLXS.writeFile(workbook, filePath)
	}

	private parseMonthToNumber(month: string): number {
		const listOfMonths = [
			'janeiro',
			'fevereiro',
			'março',
			'abril',
			'maio',
			'junho',
			'julho',
			'agosto',
			'setembro',
			'outubro',
			'novembro',
			'dezembro'
		]
		return listOfMonths.findIndex((element) => element === month.toLowerCase())
	}
}
