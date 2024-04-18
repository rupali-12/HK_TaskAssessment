const { validateEmail, validateMobile } = require("../middleware/validateUser");
const User = require("../model/User");

// getAllUser
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Errorin getting all users" });
  }
};

// create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    // Check if email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if mobile is valid
    if (!validateMobile(mobile)) {
      return res.status(400).json({ message: "Invalid mobile" });
    }

    // Both email and mobile are valid, proceed to create user
    const newUser = new User({ name, email, mobile });
    console.log("New User:", newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error in creating user" });
  }
};


// get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error in getting user by Id" });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      mobile,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    return res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error in updating user" });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
