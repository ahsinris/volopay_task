const dbConn = require('../config/mysql.config')
const { months } = require('../constants')

async function SoldSeats(reqData) {

    const { department, start_date, end_date } = reqData

    const [data] = await dbConn.query(`
            SELECT COUNT(seats) as total_seats
            FROM software_seats 
            WHERE 
                department = ? AND
                date(date) >= ? AND 
                date(date) <= ? 
        `, [department, start_date, end_date])

    const total_seats = data.length ? data[0].total_seats : 0

    return {
        total_seats
    }
}
async function SoldItems(reqData) {

    const { item_by, start_date, end_date, n } = reqData

    let select_value = 'SUM(seats) as qty'

    if (item_by == "price") {
        select_value = 'SUM(amount) as price'
    }

    const [data] = await dbConn.query(
        `SELECT 
            ${select_value}, 
            software
        FROM software_seats
        WHERE
            date(date) >= ? AND 
            date(date) <= ?
        GROUP BY software LIMIT 1 OFFSET ?
    `, [start_date, end_date, (n - 1)])


    return {
        data
    }
}

async function percentageOfSoldItemsService(reqData) {

    const { start_date, end_date } = reqData

    const [seats] = await dbConn.query(`
        SELECT 
            SUM(seats) as total_seats
        FROM software_seats 
        WHERE 
            date(date) >= ? AND 
            date(date) <= ?`, [start_date, end_date])

    const totalSeats = seats.length ? seats[0].total_seats : 0

    const [departmentSeats] = await dbConn.query(`
        SELECT 
            SUM(seats) as total_seats,
            department
        FROM software_seats 
        WHERE 
            date(date) >= ? AND 
            date(date) <= ?
        GROUP BY department`, [start_date, end_date])

    let finalData = {}

    for (let i = 0; i < departmentSeats.length; i++) {

        const departmentName = departmentSeats[i].department
        const seats = departmentSeats[i].total_seats

        finalData[departmentName] = ((seats / totalSeats) * 100).toFixed(2) + " %"
    }


    return {
        data: finalData
    }
}
async function monthlySales(reqData) {

    const { product, year } = reqData



    const [data] = await dbConn.query(`
        SELECT 	
            SUM(amount) as amount, 
            month(date) as month 
        FROM software_seats
        WHERE 
            software = ? AND
            year(date) = ?
        GROUP BY month 
        ORDER BY month`, [product, year])


    let jasonMapData = {}
    for (let i = 0; i < data.length; i++) {

        jasonMapData[data[i].month] = data[i].amount
    }

    let finalData = []
    for (let i = 1; i <= 12; i++) {
        if (jasonMapData[i]) {
            finalData.push({
                month: months[i],
                amount: jasonMapData[i]
            })
        }
        else {
            finalData.push({
                month: months[i],
                amount: 0
            })
        }
    }

    return {
        data: finalData
    }
}

module.exports = {
    SoldSeats, SoldItems, percentageOfSoldItemsService, monthlySales
}