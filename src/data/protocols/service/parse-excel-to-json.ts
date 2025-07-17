import { Employee } from '../../../domain/model/employee'

export interface ParseToJson {
	toJson(param: ParseToJson.Param): Promise<ParseToJson.Result>
}

export namespace ParseToJson {
	export type Param = string
	export type Result = {
		isValid: boolean
		data?: Employee[]
		error?: Error
	}
}
