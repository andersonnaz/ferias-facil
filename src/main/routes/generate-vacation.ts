import { Router } from 'express'
import multer from 'multer'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeVacationGenerateController } from '../factories/vacation-generate-controller-factory'

export default (router: Router): void => {
	const upload = multer({ dest: 'src/main/uploads' })
	router.post('/generate', upload.single('file'), adaptRoute(makeVacationGenerateController()))
}
