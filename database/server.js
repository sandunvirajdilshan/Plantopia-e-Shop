const express = require("express");
const router = express.Router();

const {
  readProduct,
  addProduct,
  deleteProduct,
  readProductInfo,
  updateProduct,
  addAdmin,
  idAdmin,
  getAdmin,
  adminLogin,
  readUser,
  readUserByEmail,
  userLogin,
  addUser,
  updatePassword,
  updateUser,
  deleteUser,
  getUser,
  idUser,
  addToCart,
  getCart,
  deleteCartItem,
  deleteAllCartItem,
  saveOrder,
  readOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  saveCard,
  getCardDetails,
  addToWishlist,
  getWishlist,
  deleteWishlistItem
} = require("./database.js");



//:-<=============================Products=============================>

//=> List products

router.get("/listProducts", async function (req, res) {
  console.log("Request received to list Products");
  let data = await readProduct();

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Add Products

router.post("/addProduct", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to add Product. Req body: " + JSON.stringify(reqBody));
  let data = await addProduct(reqBody.id, reqBody.name, reqBody.price, reqBody.description,reqBody.imagePath, reqBody.date, reqBody.time);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Update Products

router.post("/editProduct/:id", async function (req, res) {
  let reqBody = req.body;
  let id = req.params.id;
  let data = await updateProduct(reqBody.name, reqBody.price, reqBody.description,reqBody.imagePath, reqBody.date, reqBody.time, id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Delete Products

router.post("/deleteProduct", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to delete Product. Req body: " + JSON.stringify(reqBody));
  let data = await deleteProduct(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Get Product Infomations

router.post("/getProductInfo", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get Product Info");
  let data = await readProductInfo(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});



//:-<=============================User=============================>

//=> Read User

router.get("/listUsers", async function (req, res) {
  console.log("Request received to list Users");
  let data = await readUser();

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Read User by Email

router.get("/listUserByEmail/:email", async function (req, res) {
  const email = req.params.email;
  console.log("Request received to get User email",email);
  let data = await readUserByEmail(email);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Get Login Details of User

router.post('/user-login-detail', async function (req, res) {
  const { email, password } = req.body;
  try {
    await userLogin(email, password);
    res.status(200).json({ success: true, token: generateAuthToken() });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false });
  }
});

//=> Get User ID

router.get('/user-id/:email', async function (req, res) {
  try {
    const email = req.params.email;
    const id = await idUser(email);
    res.status(200).json({ success: true, id });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false });
  }
});

//=> Add User

router.post('/add-user', async function (req, res) {
  const { firstName, lastName, email, password, date, time } = req.body;
  console.log("Request received to add User");
  try {
    await addUser(firstName, lastName, email, password, date, time);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//=> Update User

router.put('/update-user/:id', async function (req, res) {
  const { id } = req.params;
  const { firstName, lastName, email, date, time } = req.body;
  console.log(`Request received to update user with ID: ${id}`);
  try {
    await updateUser(id, firstName, lastName, email, date, time);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//=> Update Password

router.put('/update-password', async function (req, res) {
  const { email, newPassword } = req.body;
  console.log("Request received to update password");
  try {
    await updatePassword(email, newPassword);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//=> Delete User

router.post("/delete-user", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to delete User. Req body: " + JSON.stringify(reqBody));
  let data = await deleteUser(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> get User Details

router.get('/user/:id', async function (req, res) {
  const { id } = req.params;
  console.log(`Request received to get user details with ID: ${id}`);
  try {
    const user = await getUser(id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



//:-<=============================AdminPasswords=============================>

//=> Get Admin ID

router.get('/admin-id/:username', async function (req, res) {
  try {
    const username = req.params.username;
    const id = await idAdmin(username);
    res.status(200).json({ success: true, id });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false });
  }
});


//=> Get Login Details of Admin

router.post('/admin-login-detail', async function (req, res) {
  const { username, password } = req.body;
  console.log("Request received to list Admins");
  try {
    await adminLogin(username, password);
    res.status(200).json({ success: true, token: generateAuthToken() });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false });
  }
});

//=> Add an Admin

router.post('/add-admin', async function (req, res) {
  const { username, password } = req.body;
  console.log("Request received to add Admin");
  try {
    await addAdmin(username, password);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//=> Get Admin Details

router.get('/admin/:id', async function (req, res) {
  const { id } = req.params;
  console.log(`Request received to get admin details with ID: ${id}`);
  try {
    const admin = await getAdmin(id);
    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

function generateAuthToken() {
  const token = Math.random().toString(36).substr(2);
  return token;
}


//:-<=============================Cart=============================>

//=> Add to Cart

router.post("/addToCart", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to insert product in to cart. Req body: " + JSON.stringify(reqBody));
  let data = await addToCart(reqBody.id, reqBody.user_id, reqBody.productName, reqBody.productPrice, reqBody.quantity);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Get Cart

router.post("/getCart", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get user Cart Info");
  let data = await getCart(reqBody.user_id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Delete Cart Item

router.post("/deleteCartItem", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to delete Cart Item. Req body: " + JSON.stringify(reqBody));
  let data = await deleteCartItem(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Delete All Data

router.post("/deleteAllCartItem", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to delete Cart Item. Req body: " + JSON.stringify(reqBody));
  let data = await deleteAllCartItem(reqBody.user_id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});




//:-<=============================Orders=============================>

//=> Save Order

router.post("/saveOrder", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to save order. Req body: " + JSON.stringify(reqBody));
  let data = await saveOrder(reqBody.id, reqBody.order_id, reqBody.user_id, reqBody.amount, reqBody.status, reqBody.date, reqBody.time, reqBody.details, reqBody.address );

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> List Orders

router.get("/getOrders", async function (req, res) {
  console.log("Request received to list Orders");
  let data = await readOrder();

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Get Order Details

router.post("/getOrder", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get user Order Info");
  let data = await getOrder(reqBody.user_id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Update Order

router.post("/updateOrder", async function (req, res) {
  const { user_id, order_id, status } = req.body;
  console.log("Request received to update user Order Info");
  try {
    const result = await updateOrder(user_id, order_id, status);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

//=> Delete Order

router.post("/deleteOrder", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to delete Order. Req body: " + JSON.stringify(reqBody));
  let data = await deleteOrder(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});






//:-<=============================Cards=============================>

//=> Save Card

router.post("/saveCard", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to save card details. Req body: " + JSON.stringify(reqBody));
  let data = await saveCard(reqBody.id, reqBody.userId, reqBody.cardNumber, reqBody.cardHolderName, reqBody.expirationDate, reqBody.cvv);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Get Card Details

router.post("/getCardDetails", async function (req, res) {
  const userId = req.body.userId;
  console.log("Request received to get card details for user ID: " + userId);

  try {
    const cardDetails = await getCardDetails(userId);
    res.setHeader("Content-Type", "application/json");
    res.json(cardDetails);
  } catch (error) {
    console.error("Error getting card details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





//:-<==============================WishList==============================>

//=> Add to WishList

router.post("/addToWishlist", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to insert product in to WishList. Req body: " + JSON.stringify(reqBody));
  let data = await addToWishlist(reqBody.id, reqBody.user_id, reqBody.productName, reqBody.productPrice, reqBody.productDescription, reqBody.imagePath);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Get WishList

router.post("/getWishlist", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get user WishList Info");
  let data = await getWishlist(reqBody.user_id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});

//=> Delete WishList Item

router.post("/deleteWishlistItem", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to delete WishList Item. Req body: " + JSON.stringify(reqBody));
  let data = await deleteWishlistItem(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.json(data);
});



module.exports = router;
