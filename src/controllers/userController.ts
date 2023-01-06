import db from "../database/database";
import { Op } from "sequelize";
import { hash as _hash, compare } from "bcrypt";
import asyncHandler from "express-async-handler";
import { sign } from "jsonwebtoken";
require("dotenv").config();
import { Request, Response } from "express";
import { User } from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email, img_url } = req.body;

  if (!username || !password || !email) {
    res.status(500).send("username, password & email are required");
  }

  let unique = await User.findOne({
    where: {
      [Op.or]: {
        username: {
          [Op.eq]: username,
        },

        email: {
          [Op.eq]: email,
        },
      },
    },
  });

  if (!unique) {
    const hash = await _hash(password, 8);
    const data = {
      username: username,
      password: hash,
      email: email,
      img_url: img_url,
    };

    const user = await User.create(data);
    if (user) {
      res.status(201).json({
        id: user.userId,
        username: user.username,
        email: user.email,
        token: generateToken(user.userId),
      });
    } else {
      return res.status(500).send("Something wrong!");
    }
  } else {
    return res.status(404).send("Existing username or email");
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await User.findAll();
  res.send(allUsers);
};
export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const finded = await User.findOne({
    where: {
      userId: id,
    },
  });
  finded ? res.send(finded) : res.status(500).send("userrr does not exist");
};
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        msg: "Not existing user with id " + id,
      });
    } else {
      await User.destroy({
        where: {
          id: id,
        },
      });
      return res.json(`User ${id} has been deleted correctly`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk with the administrator",
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "Not existing user with id " + id,
      });
    }
    await User.update(body, {
      where: {
        id: id,
      },
    });
    const updated = await User.findOne({
      where: {
        id: id,
      },
    });
    return res.json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk with the administrator",
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!email || !password) {
    res.status(400).send({
      status: false,
      message: "Email & password are requiered",
    });
  }
  if (user && (await compare(password, user.password))) {
    res.status(201).send({
      id: user.userId,
      username: user.username,
      email: user.email,
      token: generateToken(user.userId),
    });
  } else {
    res.status(400).send({
      message: "Invalid credentials",
    });
  }
};

const generateToken = (id: number) => {
  return sign({ id }, process.env.SECRET, {
    expiresIn: 8640,
  });
};

export const getMe = asyncHandler(async (req: any, res: Response) => {
  res.status(200).json(req.user);
});
