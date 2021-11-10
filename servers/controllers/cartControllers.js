/* eslint-disable array-callback-return */
import Cart from "../model/cartModel";
import _ from "lodash";

export const addCart = (req, res) => {
  const cart = new Cart(req.body);
  cart.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Add cart failure",
      });
    }
    res.json({
      data,
      message: "Add product to cart successfully",
    });
  });
};

export const listCart = (req, res) => {
  let limit = req.query.limit ? +req.query.limit : 100;
  let skip = req.query.skip ? +req.query.skip : 0;
  Cart.find()
    .populate("user product", "name name photo price sale ")
    .limit(limit)
    .skip(skip)
    .exec((err, data) => {
      Cart.countDocuments((err, count) => {
        if (err) {
          return res.status(400).json({
            error: "Cart does not exit",
          });
        }
        res.json(data, count);
      });
    });
};

export const listCartUser = (req, res) => {
  let user = req.query.user ? req.query.user : "";
  Cart.find({
    user: user,
  }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "Cart does not exit",
      });
    }
    res.json({ data });
  });
};

export const cartByID = (req, res, next, id) => {
  Cart.findById(id).exec((err, cart) => {
    if (err || !cart) {
      return res.status(400).json({
        error: "Cart does not exit",
      });
    }
    req.cart = cart;
    next();
  });
};

export const readCart = (req, res) => {
  return res.json(req.cart);
};

export const removeCart = (req, res) => {
  let cart = req.cart;
  cart.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Delete cart failure",
      });
    }
    res.json({
      data,
      message: "Cart delete successfully",
    });
  });
};

export const updateCart = (req, res) => {
  let cart = req.cart;

  cart = _.assignIn(cart, req.body);

  cart.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Update cart failure",
      });
    }
    res.json({
      data,
      message: "Update cart successfully",
    });
  });
};
