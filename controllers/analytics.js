const moment = require('moment')
const Order = require('../models/Order.js')
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 })
    const ordersMap = getOrdersMap(allOrders)
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

    // count orders yesterday
    const yesterdayOrdersNumber = yesterdayOrders.length
    // orders count
    const totalOrdersNumber = allOrders.length
    // days count
    const daysNumber = Object.keys(ordersMap).length
    // one dey orders count
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
    // % for count orders
    // formula - ((orders yesterday \ count orders in Day) - 1) * 100
    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
    // total revenues
    const totalGain = calculatePrice(allOrders)
    // day revenues
    const gainPerDay = totalGain / daysNumber
    // yesterday revenues
    const yesterdayGain = calculatePrice(yesterdayOrders)
    // revenues percent
    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
    // revenue comparsion
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
    // count orders comparsion
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: ordersPercent > 0
      }
    })

  } catch (error) {
    errorHandler(res, error)
  }

}

module.exports.analytics = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 })
    const ordersMap = getOrdersMap(allOrders)
    const avarage = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

    const chart = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length
      return { label, order, gain }
    })

    res.status(200).json({ avarage, chart })
  } catch (error) {
    errorHandler(res, error)
  }
}

function getOrdersMap(orders = []) {
  const daysOrdes = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')

    if (date === moment().format('DD.MM.YYYY')) return
    if (!daysOrdes[date]) daysOrdes[date] = []

    daysOrdes[date].push(order)
  })
  return daysOrdes
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    return total += orderPrice
  }, 0)
}