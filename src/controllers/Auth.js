const {
  createUser,
  verifyUserLogin,
  createToken,
} = require("../services/auth");

const Signup = async (req, res) => {
  try {
    const { status, message } = await createUser(req.body);
    if (status) {
      return res.status(200).json({
        message: message,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: message,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const Login = async (req, res) => {
  try {
    let { status, message, data } = await verifyUserLogin(req.body);
    if (status && data.user) {
      data = data.user;
      if (data.hash) {
        delete data["hash"];
      }
      data.name = `${data.fname ? data.fname : ""} ${
        data.lname ? data.fname : ""
      }`;
      delete data["fname"];
      if (data.lname) {
        delete data["lname"];
      }
      Object.keys(data).forEach((key) => {
        if (data[key] == null) {
          delete data[key];
        }
      });
      let payload = {};
      Object.keys(data).forEach(key => {
        payload[key] = data[key];
      })
      const token = createToken(payload);
      return res.status(200).json({
        success: true,
        data: {
          token,
        },
        message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: message ? message : "Could not login",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
module.exports = {
    Signup, Login
}