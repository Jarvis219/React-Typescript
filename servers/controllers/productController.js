import Product from "../model/productModel";
import _ from "lodash";

// danh sách sản phẩm
export const listProduct = (req, res) => {
  let limit = req.query.limit ? +req.query.limit : 100;
  // let classify = req.query.classify ? req.query.classify : "";

  // {
  //   classify: new RegExp(classify),
  // }
  let skip = req.query.skip ? +req.query.skip : 0;

  Product.find()
    .limit(limit)
    .skip(skip)
    .sort({
      updatedAt: -1
    })
    .populate("category", "name")
    .exec((err, data) => {
      Product.countDocuments((err, count) => {
        if (err) {
          return res.status(400).json({
            error: "product does not exit",
          });
        }
        res.json({
          data,
          count
        });
      })
    });
};

// lấy về sp theo dựa trên id
export const productByID = (req, res, next, id) => {
  Product.findById(id)
    .populate("category", "name")
    .exec((err, product) => {
      if (err || !product) {
        res.status(400).json({
          error: "product not found",
        });
      }
      req.product = product;
      next();
    });
};
// trả về sản phẩm theo id
export const readProduct = (req, res) => {
  return res.json(req.product);
};
// xóa sp theo id
export const removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: "delete product failure",
      });
    }
    res.json({
      message: "Delete product successfully",
    });
  });
};

// thêm sp
export const createProduct = (req, res) => {
  const products = new Product(req.body);

  products.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      data,
      message: "Create product successfully",
    });
  });
};

export const updateProduct = (req, res) => {
  let products = req.product;
  products = _.assignIn(products, req.body);

  products.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "update product success",
      });
    }
    res.json({
      data,
      message: "Update product successfully",
    });
  });
};

// Trả về sản phẩm cùng danh mục

export const listRelated = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 4;
  Product.find({
      _id: {
        $ne: req.product, // loại trừ
      },
      category: req.product.category, // lấy theo thể loại
    })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      res.json(data);
    });
};

// tìm kiếm theo name
export const listSearch = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 12;
  let name = req.query.name ? req.query.name : "";
  Product.find({
      name: {
        $regex: `${name}`,
        $options: "$i",
      },
    })
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Product not found",
        });
      }
      res.json(data);
    });
};



export const filterCategory = (req, res) => {
  let category = req.query.category ? req.query.category : '';
  const ObjectId = require('mongodb').ObjectId;
  const id = new ObjectId(category)
  Product.findOne({
    "category": id
  }).exec((err, like) => {
    if (err) {
      return res.status(400).json({
        err,
        error: "like does not exist"
      })
    }
    res.json(
      like
    )
  })
}