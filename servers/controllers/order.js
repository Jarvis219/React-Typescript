import Order from '../model/orderModel';
import _ from 'lodash';

export const addOrder = (req, res) => {
    const order = new Order(req.body);
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                err,
                error: "Add order failure"
            })
        }
        res.json({
            data,
            message: 'Order product successfully'
        })
    })
}
export const listOrder = (req, res) => {
    // eslint-disable-next-line array-callback-return
    Order.find((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "order does not exit"
            })
        }
        res.json({
            data
        })
    })
}

export const orderByID = (req, res, next, id) => {
    Order.findById(id).exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "order does not exit"
            })
        }
        req.order = order;
        next()
    });
}

export const readOrder = (req, res) => {
    return res.json(req.order);
}
export const removeOrder = (req, res) => {
    let order = req.order;
    order.remove((err, deleteOrder) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Delete order failure"
            })
        }
        res.json({
            deleteOrder,
            message: "Order delete successfully"
        })
    })
}
export const updateOrder = (req, res) => {
    let order = req.order;
    order = _.assignIn(order, req.body);
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "update order failure"
            })
        }
        res.json({
            data
        })
    })
}

export const listTotal = (req, res) => {
    let q = req.query.q;
    let sort = req.query.sort ? req.query.sort : 1;
    // console.log(sort);
    var data;
    if (q) {
        data = Order.find(({
            $or: [{
                    "name": {
                        $regex: `${q}`,
                        $options: '$i'
                    }
                },
                {
                    "address": {
                        $regex: `${q}`,
                        $options: '$i'
                    }
                }, {
                    "status": {
                        $regex: `${q}`,
                        $options: '$i'
                    }
                }

            ]
        }))
    } else {
        data = Order.find();
    }
    data
        .sort({
            "sumMoney": sort
        })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }
            res.json({
                data
            })
        })
}