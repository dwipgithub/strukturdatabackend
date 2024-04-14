import { get, show, insert, update } from "../models/AgamaModel.js"

export const getAgama = (req, res) => {
    get(req, (err, results) => {
        const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            message: message,
            data: results
        })
    })
}

export const showAgama = (req, res) => {
    show(req, (err, result) => {
        if (err === null) {
            const message = 'data found'
            res.status(200).send({
                status: true,
                message: message,
                data: result
            })
        } else {
            res.status(400).send({
                status: false,
                message: err,
                data: result
            })
        }
    })
}

export const insertAgama = (req, res) => {
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

export const updateAgama = (req, res) => {
    update(req, (err, results) => {
        // const message = results.length ? 'data found' : 'data not found'
        res.status(200).send({
            status: true,
            data: results
        })
    })
}