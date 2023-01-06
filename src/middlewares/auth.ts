import { verify } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Response } from "express";

export const protect = asyncHandler(async (req: any, res: Response, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = verify(token, process.env.SECRET);

      // Get user from the token
      /*  req.user = await User.findByPk(decoded.id); */ /* como no sabemos qué es id primero hay que definirle una interfaz y luego enviarla */

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
