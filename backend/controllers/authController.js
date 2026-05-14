import User from '../models/User.js'
import Developer from "../models/Developer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// Register a new user


export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Register a new developer

export const signupDeveloper = async (req, res) => {
  try {
    const { name, email, password, skills } = req.body;
    const existingDeveloper = await Developer.findOne({ email });
    if (existingDeveloper) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const developer = await Developer.create({
      name,
      email,
      password: hashedPassword,
      skills,
      role: "developer",
    });


    const token = jwt.sign(
      { id: developer._id, role: developer.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Developer registered successfully",
      token,
      developer: {
        id: developer._id,
        name: developer.name,
        email: developer.email,
        skills: developer.skills,
        role: developer.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login user & developer

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    let account = await User.findOne({ email });


    if (!account) {
      account = await Developer.findOne({ email });
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }


    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      account: {
        id: account._id,
        name: account.name,
        email: account.email,
        role: account.role,  
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

