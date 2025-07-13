import { VacationGenerate } from '../../data/protocols/service/vacation-generate'

type Employee = {
	militaryRank: string
	personalNumber: number
	lastPromotion: Date
	name: string
	options: number[]
	allocated: boolean
}

type MonthAllocation = {
	employees: Employee[]
	maxSlots: number
	full: boolean
}

export class VacationGenerateService implements VacationGenerate {
	generate(params: VacationGenerate.Params): VacationGenerate.Result {
		const allocationList = [...params]
		const unallocatedEmployees: Employee[] = []
		const SLOTS_PER_MONTH = Math.ceil(params.length / 12)
		const months: MonthAllocation[] = Array.from({ length: 12 }, () => ({
			employees: [],
			maxSlots: SLOTS_PER_MONTH,
			full: false
		}))

		for (let employee of allocationList) {
			for (let i = 0; i < 3; i++) {
				if (!employee.allocated) {
					const monthSlots = months[employee.options[i]]
					if (monthSlots.full) {
						for (const [index, employeeAllocated] of monthSlots.employees.entries()) {
							if (this.isOlder(employee, employeeAllocated)) {
								employee.allocated = true
								employeeAllocated.allocated = false
								;[employee] = monthSlots.employees.splice(index, 1, employee)
								i = 0
							}
						}
					}
					if (!monthSlots.full) {
						employee.allocated = true
						monthSlots.employees.push(employee)
						monthSlots.full = monthSlots.employees.length >= monthSlots.maxSlots && true
					}
				}
			}
			if (!employee.allocated) {
				unallocatedEmployees.push(employee)
			}
		}

		for (const month of months) {
			for (let [index, employee] of unallocatedEmployees.entries()) {
				if (!month.full) {
					employee.allocated = true
					;[employee] = unallocatedEmployees.splice(index, 1)
					month.employees.push(employee)
					month.full = month.employees.length >= month.maxSlots && true
				}
			}
		}
		const vacationListResult = []
		const listOfMonths = [
			'Janeiro',
			'Fevereiro',
			'Março',
			'Abril',
			'Maio',
			'Junho',
			'Julho',
			'Agosto',
			'Setembro',
			'Outubro',
			'Novembro',
			'Dezembro'
		]
		for (const [indexMonth, month] of months.entries()) {
			for (const allocatedEmployee of month.employees) {
				const { options, ...employee } = allocatedEmployee
				vacationListResult.push({ ...employee, vacationMonth: listOfMonths[indexMonth] })
			}
		}
		return vacationListResult
	}

	private isOlder(firstEmployee: Employee, secondEmployee: Employee): boolean {
		const militaryRankLabels = ['SD', 'CB', '3SGT', '2SGT', '1SGT', 'ST']
		const firstEmployeeIndexRank = militaryRankLabels.findIndex((position) => firstEmployee.militaryRank === position)
		const secondEmployeeIndexRank = militaryRankLabels.findIndex(
			(position) => secondEmployee.militaryRank === position
		)
		if (firstEmployeeIndexRank > secondEmployeeIndexRank) {
			return true
		}
		if (firstEmployee.lastPromotion < secondEmployee.lastPromotion) {
			return true
		}
		if (firstEmployee.personalNumber < secondEmployee.personalNumber) {
			return true
		}
		return false
	}
}
