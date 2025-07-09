import { Router } from 'express'

export default (router: Router): void => {
	router.get('/generate', () => console.log('hello world'))
}
