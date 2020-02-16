const path = require("path");
const multer = require("multer");
const client = require("../knexfile");
const knex = require("knex")(client);

const storage = multer.diskStorage({
  destination: "./uploads/food",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage }).single("foodImage");

const uploadFoodImage = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({ status: false, message: err.message });
    } else {
      res.json({
        status: true,
        message: "Image Uploaded",
        data: req.file.filename
      });
    }
  });
};

function addFood(req, res) {
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const image = req.body.image;

  knex("food")
    .insert({ name, category, price, image })
    .then(() => res.json({ status: true, message: "Food added!!!" }))
    .catch(err => res.json({ status: false, message: err.message }));
}

function getFood(req, res) {
  knex("food")
    .select()
    .then(data => res.json({ status: true, message: "Data available.", data }))
    .catch(err => res.json({ status: false, message: err.message }));
}

function getFoodByCategory(req, res) {
  const category = req.params.category;
  knex("food")
    .select()
    .where({ category })
    .then(data => res.json({ status: true, message: "Data available.", data }))
    .catch(err => res.json({ status: false, message: err.message }));
}

function deleteFood(req, res) {
  const id = req.params.id;
  knex("food")
    .delete()
    .where({ id })
    .then(() => res.json({ status: true, message: "Food deleted!!!" }))
    .catch(err => res.json({ status: false, message: err.message }));
}

function updateFood(req, res) {
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;
  const image = req.body.image;
  const id = req.params.id;

  knex("food")
    .update({ name, category, price, image })
    .where({ id })
    .then(() => res.json({ status: true, message: "Food updated" }))
    .catch(err => res.json({ status: false, message: err.message }));
}

module.exports = {
  uploadFoodImage,
  addFood,
  getFood,
  getFoodByCategory,
  deleteFood,
  updateFood
};
