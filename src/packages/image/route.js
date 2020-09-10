import express from 'express'
import ImageCtrl from './controller'

const router = express.Router()

router.post('/', ImageCtrl.uploadImage)

export default router
