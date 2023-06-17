const router = require('express').Router()
const { q3TotalItemsValidator, q4TotalItemsValidator, monthlySalesValidator, percentageValidator } = require('../validators/sales.validator')
const { total_seats, Items, ItemsByPrice, percentageOfSoldItems, SalesMonthlywise } = require('../controllers/base.controllers')

router.get('/total_items', q3TotalItemsValidator, total_seats)
router.get('/nth_most_total_item', q4TotalItemsValidator, Items)

router.get('/percentage_of_department_wise_sold_items', percentageValidator, percentageOfSoldItems)
router.get('/monthly_sales', monthlySalesValidator, SalesMonthlywise)


module.exports = router