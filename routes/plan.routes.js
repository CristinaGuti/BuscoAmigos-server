
const router = require("express").Router()
const { verifyToken } = require('../middlewares/verifyToken')

const Plan = require('./../models/Plan.model')
const TypePlan = require('./../models/TypePlan.model')
const { verifyToken } = require("../middlewares/verifyToken")


router.get("/getPlans", (req, res, next) => {

    Plan
        .find()
        .populate('typePlan')
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getOnePlan/:plan_id", (req, res, next) => {

    const { plan_id } = req.params

    Plan
        .findById(plan_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.get("/getTypePlan", (req, res, next) => {

    TypePlan
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/savePlan", verifyToken, (req, res, next) => {

    const { title, description, origin, destination, typePlan } = req.body
    const { _id: owner } = req.payload

    Plan
        .create({ title, description, origin, destination, typePlan, owner })
        .then(response => res.json(response))
        .catch(err => next(err))
})





// router.post("/editPlan/:plan_id", verifyToken, (req, res, next) => {

//     const { title, description, origin, destination, type } = req.body
//     const { _id: owner } = req.payload

//     Plan

//         .findByIdAndUpdate(plan => res.render('ruta', { plan }))
//         .create({ title, description, origin, destination, type, owner })
//         .then(response => res.json(response))
//         .catch(err => next(err))
// })


module.exports = router