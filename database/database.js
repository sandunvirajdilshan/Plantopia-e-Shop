const dbConnection = require("./sqlite");
const bcrypt = require('bcrypt');


//:-<=============================Products=============================>

//=> List Products

const readProduct = async () => {
  const query = `SELECT * FROM products`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, (err, products) => {
      if (err) {
        reject(err);
      } else {
        resolve(products);
      }
    });
  });
};

//=> Add Products

const addProduct = async (id, productName, productPrice, productDescription,imagePath, date, time) => {
  const query = `INSERT INTO products(id, productName, productPrice, productDescription,imagePath, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id, productName, productPrice, productDescription,imagePath, date, time], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully inserted Product" });
      }
    });
  });
};

//=> Update Products

const updateProduct = async (productName, productPrice, productDescription,imagePath, date, time, id) => {
  const query = `UPDATE products SET productName = ?, productPrice = ?, productDescription = ?,imagePath = ?, date = ?, time = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [productName, productPrice, productDescription,imagePath, date, time, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully updated Product" });
      }
    });
  });
};

//=> Delete Products

const deleteProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = ?`;
  const sqlResetAutoIncrement = `UPDATE SQLITE_SEQUENCE SET seq = (SELECT MAX(id) FROM products) WHERE name = 'products'`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully deleted Product" });
        dbConnection.run(sqlResetAutoIncrement, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};

//=> Get Product Informations

const readProductInfo = async (id) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.get(query, [id], function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};



//:-<=============================User=============================>

//=> Read Users

const readUser = async () => {
  const query = `SELECT * FROM userpsw`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

//=> Read User by email

const readUserByEmail = async (email) => {
  const query = `SELECT * FROM userpsw WHERE email = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.get(query, [email], (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

//=> Get Login Details of User

const userLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM userpsw WHERE email = ?`;
    dbConnection.get(query, [email], (err, row) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else if (row) {
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            console.error(err.message);
            reject('Server Error');
          } else if (result) {
            resolve();
          } else {
            reject('Invalid login details');
          }
        });
      } else {
        reject('Invalid login details');
      }
    });
  });
};

//=> Get User ID

const idUser = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM userpsw WHERE email = ?';

    dbConnection.get(query, [email], (err, row) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else if (row) {
        resolve(row.id);
      } else {
        reject('User not found');
      }
    });
  });
};

//=> Create User

const addUser = (firstName, lastName, email, password, date, time) => {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else {
        const query = `INSERT INTO userpsw (firstName, lastName, email, password, date, time) VALUES (?, ?, ?, ?, ?, ?)`;
        dbConnection.run(query, [firstName, lastName, email, hash, date, time], (err) => {
          if (err) {
            console.error(err.message);
            reject('Server Error');
          } else {
            resolve();
          }
        });
      }
    });
  });
};

//=> Update User

const updateUser = (id, firstName, lastName, email, date, time) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE userpsw SET firstName = ?, lastName = ?, email = ?, date = ?, time = ? WHERE id = ?`;
    dbConnection.run(query, [firstName, lastName, email, date, time, id], (err) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else {
        resolve();
      }
    });
  });
};

//=> Update Password

const updatePassword = (email, newPassword) => {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, (err, hash) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else {
        const query = `UPDATE userpsw SET password = ? WHERE email = ?`;
        dbConnection.run(query, [hash, email], (err) => {
          if (err) {
            console.error(err.message);
            reject('Server Error');
          } else {
            resolve();
          }
        });
      }
    });
  });
};


//=> Delete User

const deleteUser = async (id) => {
  const query = `DELETE FROM userpsw WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully deleted User" });
      }
    });
  });
};

//=> Read User informations

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM userpsw WHERE id = ?`;
    dbConnection.get(query, [id], (err, row) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else {
        resolve(row);
      }
    });
  });
};


//:-<=============================AdminPasswords=============================>

//=> Get Admin ID:

const idAdmin = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM adminpsw WHERE username = ?';

    dbConnection.get(query, [username], (err, row) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else if (row) {
        resolve(row.id);
      } else {
        reject('User not found');
      }
    });
  });
};


//=> Get Login Details of Admin

const adminLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM adminpsw WHERE username = ?`;
    dbConnection.get(query, [username], (err, row) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else if (row) {
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            console.error(err.message);
            reject('Server Error');
          } else if (result) {
            resolve();
          } else {
            reject('Invalid login details');
          }
        });
      } else {
        reject('Invalid login details');
      }
    });
  });
};

//=> Add an Admin

const addAdmin = (username, password) => {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else {
        const query = `INSERT INTO adminpsw (username, password) VALUES (?, ?)`;
        dbConnection.run(query, [username, hash], (err) => {
          if (err) {
            console.error(err.message);
            reject('Server Error');
          } else {
            resolve();
          }
        });
      }
    });
  });
};

//=> Read Admin informations

const getAdmin = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM adminpsw WHERE id = ?`;
    dbConnection.get(query, [id], (err, row) => {
      if (err) {
        console.error(err.message);
        reject('Server Error');
      } else {
        resolve(row);
      }
    });
  });
};


//:-<=============================AddToCart=============================>

//=> Add To Cart

const addToCart = async (id, user_id, productName, productPrice, quantity) => {
  const query = `INSERT INTO cart(id, user_id, productName, productPrice, quantity) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id,user_id, productName, productPrice, quantity ], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully inserted Product in to Cart" });
      }
    });
  });
};

//=> Get Cart

const getCart = async (user_id) => {
  const query = `SELECT * FROM cart WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, [user_id], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//=> Detele from Cart

const deleteCartItem = async (id) => {
  const query = `DELETE FROM cart WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully deleted Cart Item" });
      }
    });
  });
};

//=> Delete All Cart

const deleteAllCartItem = async (user_id) => {
  const query = `DELETE FROM cart WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [user_id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully deleted Cart Item" });
      }
    });
  });
};





//:-<=============================Orders=============================>

//=> Save Order

const saveOrder = async (id, order_id, user_id, amount, status, date, time, details, address) => {
  const query = `INSERT INTO orders(id, order_id, user_id, amount, status, date, time, details, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id, order_id, user_id, amount, status, date, time, details, address ], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully Save Order" });
      }
    });
  });
};

//=> List Orders

const readOrder = async () => {
  const query = `SELECT * FROM orders`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, (err, orders) => {
      if (err) {
        reject(err);
      } else {
        resolve(orders);
      }
    });
  });
};

//=> Get Order Details

const getOrder = async (user_id) => {
  const query = `SELECT * FROM orders WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, [user_id], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//=> Update Order
 
const updateOrder = async (user_id, order_id, status) => {
  const query = `UPDATE orders SET status = ? WHERE user_id = ? AND order_id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [status, user_id, order_id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully Updated Order" });
      }
    });
  });
}

//=> Detele from Cart

const deleteOrder = async (id) => {
  const query = `DELETE FROM orders WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully deleted Order" });
      }
    });
  });
};






//:-<=============================Card=============================>

//=> Save Card

const saveCard = async (id, userId, cardNumber, cardHolderName, expirationDate, cvv) => {

  const query = `INSERT INTO cards(id, userId, cardNumber, cardHolderName, expirationDate, cvv) VALUES (?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id, userId, cardNumber, cardHolderName, expirationDate, cvv], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully Save Order" });
      }
    });
  });
};


//=> Get Card

const getCardDetails = async (userId) => {
  const query = `SELECT * FROM cards WHERE userId = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, [userId], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}



//:-<=============================WishList=============================>

//=> Add To WishList

const addToWishlist = async (id, user_id, productName, productPrice, productDescription, imagePath) => {
  const query = `INSERT INTO wishlist(id, user_id, productName, productPrice, productDescription, imagePath) VALUES (?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id,user_id, productName, productPrice, productDescription, imagePath ], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully inserted Product in to WishList" });
      }
    });
  });
};

//=> Get Cart

const getWishlist = async (user_id) => {
  const query = `SELECT * FROM wishlist WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.all(query, [user_id], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//=> Detele from Cart

const deleteWishlistItem = async (id) => {
  const query = `DELETE FROM wishlist WHERE id = ?`;
  return new Promise((resolve, reject) => {
    dbConnection.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ status: "Successfully deleted WishList Item" });
      }
    });
  });
};







module.exports = {
  readProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  readProductInfo,
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
};
