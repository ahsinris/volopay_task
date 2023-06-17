const joi = require('joi');

const q3TotalItemsValidator = async (req, res, next) => {
    try {
        let schema = joi.object({
            department: joi.string().min(2).max(30).required(),
            start_date: joi.string().required(),
            end_date: joi.string().required(),
        })
        await schema.validateAsync({ ...req.body, ...req.query, ...req.params });
        next()
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.details[0].message
        });
    }

}
const q4TotalItemsValidator = async (req, res, next) => {
    try {
        let schema = joi.object({
            item_by: joi.string().min(2).max(30).required(),
            start_date: joi.string().required(),
            end_date: joi.string().required(),
            n: joi.number().required()
        })
        await schema.validateAsync({ ...req.body, ...req.query, ...req.params });
        next()
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.details[0].message
        });
    }

}

const percentageValidator = async (req, res, next) => {
    try {
        let schema = joi.object({
            start_date: joi.string().required(),
            end_date: joi.string().required(),
        })
        await schema.validateAsync({ ...req.body, ...req.query, ...req.params });
        next()
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.details[0].message
        });
    }

}


const monthlySalesValidator = async (req, res, next) => {
    try {
        let schema = joi.object({
            product: joi.string().required(),
            year: joi.required(),
        })
        await schema.validateAsync({ ...req.body, ...req.query, ...req.params });
        next()
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.details[0].message
        });
    }

}

module.exports = {
    q3TotalItemsValidator, q4TotalItemsValidator, monthlySalesValidator, percentageValidator
}