import express from 'express'
import { getProvinsi, showProvinsi, insertProvinsi, updateProvinsi } from '../controllers/ProvinsiController.js'
import { getAgama, showAgama, insertAgama, updateAgama } from '../controllers/AgamaController.js'
import { getPenduduk, insertPenduduk } from '../controllers/PendudukController.js'

const router = express.Router()

// Provinsi
router.get('/indonesia/provinsi', getProvinsi)
router.get('/indonesia/provinsi/:id', showProvinsi)
router.post('/indonesia/provinsi', insertProvinsi)
router.patch('/indonesia/provinsi/:id', updateProvinsi)

// Agama
router.get('/indonesia/agama', getAgama)
router.get('/indonesia/agama/:id', showAgama)
router.post('/indonesia/agama', insertAgama)
router.patch('/indonesia/agama/:id', updateAgama)

// Penduduk
router.get('/indonesia/penduduk', getPenduduk)
router.post('/indonesia/penduduk', insertPenduduk)


export default router