const { SoldSeats, SoldItems, percentageOfSoldItemsService, monthlySales } = require('../services/base.service')


async function total_seats(req, res) {
    try {

        const { start_date, end_date } = req.query
        if (start_date > end_date) {
            return res.status(400).json({
                message: "start_date should be lesser than end_date"
            })
        }


        const data = await SoldSeats(req.query);

        if (data.success === false) {
            return res.status(data.status || 400).json({
                message: data.message || 'Something went wrong'
            })
        }

        return res.status(200).json({
            message: "Success",
            data
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Server Issue " + e
        })
    }
}


async function Items(req, res) {
    try {

        const { start_date, end_date, item_by } = req.query
        if (start_date > end_date) {
            return res.status(400).json({
                message: "start_date should be lesser than end_date"
            })
        }

        if (item_by !== "quantity" && item_by !== "price") {
            return res.status(400).json({
                status: 400,
                message: "itemby should be quantity or price"
            })

        }

        const result = await SoldItems(req.query);


        if (result.success === false) {
            return res.status(result.status || 400).json({
                message: result.message || 'Something went wrong'
            })
        }

        return res.status(200).json({
            message: "Success",
            data: result.data
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Server Issue " + e
        })
    }
}

async function ItemsByPrice(req, res) {
    try {

        const { start_date, end_date } = req.query
        if (start_date > end_date) {
            return res.status(400).json({
                message: "start_date should be lesser than end_date"
            })
        }

        const data = await SoldItemsByPrice(req.query);

        if (data.success === false) {
            return res.status(data.status || 400).json({
                message: data.message || 'Something went wrong'
            })
        }

        return res.status(200).json({
            message: "Success",
            data
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Server Issue " + e
        })
    }
}

async function percentageOfSoldItems(req, res) {
    try {

        const { start_date, end_date } = req.query
        if (start_date > end_date) {
            return res.status(400).json({
                message: "start_date should be lesser than end_date"
            })
        }

        const result = await percentageOfSoldItemsService(req.query);

        if (result.success === false) {
            return res.status(result.status || 400).json({
                message: result.message || 'Something went wrong'
            })
        }

        return res.status(200).json({
            message: "Success",
            data: result.data
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Server Issue " + e
        })
    }
}
async function SalesMonthlywise(req, res) {
    try {
        const result = await monthlySales(req.query);

        if (result.success === false) {
            return res.status(result.status || 400).json({
                message: result.message || 'Something went wrong'
            })
        }

        return res.status(200).json({
            message: "Success",
            data: result.data
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Server Issue " + e
        })
    }
}




module.exports = {
    total_seats, Items, ItemsByPrice, percentageOfSoldItems, SalesMonthlywise
}