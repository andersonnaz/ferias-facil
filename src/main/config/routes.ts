import { Router, Express } from 'express'
import generateVacation from '../routes/generate-vacation'

export default (app: Express): void => {
	const router = Router()
	app.use('/api', router)
	generateVacation(router)
}
