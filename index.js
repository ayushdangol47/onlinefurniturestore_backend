const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const userHandler = require("./handler/user-handler");
const foodHandler = require("./handler/food-handler");
const orderHandler = require("./handler/order-handler");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

//API User
app.post("/user/upload", userHandler.uploadProfileImage);
app.post("/user/register", userHandler.register);
app.post("/user/login", userHandler.login);
app.get("/user/:id", userHandler.getUserById);
app.put("/user/upload/change/:id", userHandler.changeProfileImage);

//API Food
app.post("/food/upload", foodHandler.uploadFoodImage);
app.post("/food", foodHandler.addFood);
app.get("/food", foodHandler.getFood);
app.get("/food/:category", foodHandler.getFoodByCategory);
app.put("/food/:id", foodHandler.updateFood);
app.delete("/food/:id", foodHandler.deleteFood);

//API Order
app.post("/order", orderHandler.addOrder);
app.get("/order", orderHandler.getOrder);
app.get("/order/:userID", orderHandler.getOrderByUser);
app.put("/order/:id", orderHandler.updateOrder);
app.delete("/order/:id", orderHandler.deleteOrder);

app.listen(3000, () => console.log("Server running on port 3000"));
