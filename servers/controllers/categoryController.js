import Category from "../model/categoryModel";

export const createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "add category failure",
      });
    }
    res.json({
      data,
      message: "Create category successfully",
    });
  });
};

export const listCategory = (req, res) => {
  // eslint-disable-next-line array-callback-return
  Category.find((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "category does not exit",
      });
    }
    res.json(data);
  });
};

export const categoryByID = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "category does not exit",
      });
    }
    req.category = category;
    next();
  });
};
export const readCategory = (req, res) => {
  return res.json(req.category);
};

export const removeCategory = (req, res) => {
  let category = req.category;
  category.remove((err, data) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Delete category failure",
      });
    }
    res.json({
      data,
      message: "Category deleted successfully",
    });
  });
};

export const updateCategory = (req, res) => {
  let category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "update category failure",
      });
    }
    res.json({
      data,
      message: "Update category successfully",
    });
  });
};

export const listRelatedCate = (req, res) => {
  Category.find({
      _id: {
        $ne: req.category
      },
    })
    .populate("category", "_id name")
    .exec((err, cate) => {
      if (err) {
        res.status(400).json({
          error: "Category not found",
        });
      }
      res.json(cate);
    });
};