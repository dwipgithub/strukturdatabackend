import express from 'express'
import { getProvinsi, showProvinsi, insertProvinsi, updateProvinsi } from '../controllers/ProvinsiController.js'
import { getAgama, showAgama, insertAgama, updateAgama } from '../controllers/AgamaController.js'
import { getPenduduk, insertPenduduk } from '../controllers/PendudukController.js'

const router = express.Router()

// Provinsi
router.get('/api-strukturdata/provinsi', getProvinsi)
router.get('/api-strukturdata/provinsi/:id', showProvinsi)
router.post('/api-strukturdata/provinsi', insertProvinsi)
router.patch('/api-strukturdata/provinsi/:id', updateProvinsi)

// Agama
router.get('/api-strukturdata/agama', getAgama)
router.get('/api-strukturdata/agama/:id', showAgama)
router.post('/api-strukturdata/agama', insertAgama)
router.patch('/api-strukturdata/agama/:id', updateAgama)

// Penduduk
router.get('/api-strukturdata/penduduk', getPenduduk)
router.post('/api-strukturdata/penduduk', insertPenduduk)


export default router