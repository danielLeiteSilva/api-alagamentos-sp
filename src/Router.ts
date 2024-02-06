import express, { Router } from 'express'
import Alive from './Controllers/Alive'

const router: Router = express.Router()

router.get('/api/v1', Alive)
router.get('/api/v1/alagamentos', )