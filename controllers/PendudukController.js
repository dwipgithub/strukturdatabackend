import { get, insert } from "../models/PendudukModel.js"

export const getPenduduk = (req, res) => {
    get(req, (err, results) => {
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}

export const insertPenduduk = (req, res) => {
    insert(req, (err, result) => {
        if (err === null) {
            const message = 'data inserted successfully'
            res.status(200).send({
                status: true,
                message: message
            })
        } else {
            res.status(400).send({
                status: false,
                message: err
            })
        }
    })
}