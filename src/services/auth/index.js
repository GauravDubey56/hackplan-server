const DbServices = require("../db/service");
const Users = new DbServices("users");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../config").JWT_SECRET;
async function createUser({ email, fname, lname, mobile, password }) {
  try {
    if (!email && !mobile) {
      throw new Error("Cannot sign up without email or mobile");
    }
    const users = await db('users')
    const [emailUser, mobileUser] = await Promise.all([
      Users.getWhere(db, { email }, ["email", "user_id", "mobile"]),
      mobile
        ? Users.getWhere(db, { mobile }, ["mobile", "user_id", "email"])
        : Promise.resolve(),
    ]);

    if (emailUser && emailUser.length) {
      return {
        status: false,
        message: "User already exists with provided email",
      };
    }

    if (mobileUser && mobileUser.length) {
      return {
        status: false,
        message: "User already exists with provided mobile",
      };
    }

    const newUser = {
      ...(fname && { fname }),
      ...(lname && { lname }),
      ...(mobile && { mobile }),
      ...(email && { email }),
      username: email.split("@")[0],
      hash: await bcrypt.hash(password, 10),
      user_id: uuidv4()
    };

    const createdUser = await Users.insertItem(db, newUser);

    if (createdUser) {
      return {
        status: true,
        message: "User created successfully",
        data: {
          user: newUser,
        },
      };
    } else {
      return {
        status: false,
        message: "Could not sign up user at the moment",
        data: null,
      };
    }
  } catch (error) {
    console.error("create user", error);
    throw error;
  }
}

async function verifyUserLogin({ email, mobile, password, username }) {
  try {
    let user;
    if (email) {
      user = await Users.getWhere(db, { email });
    } else if (mobile) {
      user = await Users.getWhere(db, { mobile });
    } else if (username) {
      user = await Users.getWhere(db, { username });
    } else {
      throw new Error("Cannot login without username, mobile, email");
    }
    if (Array.isArray(user) && user.length) {
      user = user[0];
      const compare = await bcrypt.compare(password, user.hash);
      if (compare) {
        return {
          status: true,
          data: {
            user,
          },
        };
      } else {
        return {
          status: false,
          message: "Wrong credentials",
        };
      }
    } else {
      return {
        status: false,
        message: "No user found with given credentials",
      };
    }
  } catch (error) {
    console.error("login user", error);
    throw error;
  }
}
function createToken(payload) {
  try {
    const token = jwt.sign(payload, secret);
    return token;
  } catch (error) {
    console.error("Signing jwt", error);
    throw error;
  }
}
async function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.user_id) {
      let user = await Users.getWhere(db, { user_id: decoded.user_id });
      if (!(Array.isArray(user) && user.length)) {
        return {
          status: false,
          message: "Could not find user",
        };
      } else {
        return {
          status: true,
          data: {
            user: user[0],
          },
        };
      }
    } else {
      return {
        status: false,
        message: "Missing resources or malformed token",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: false,
      message: "Unverified token",
    };
  }
}
module.exports = {
  createUser,
  verifyUserLogin,
  createToken,
  decodeToken,
};
