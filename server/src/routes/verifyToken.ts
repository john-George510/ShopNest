import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.token;
  if (typeof authHeader === "string") {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY || "", (err, user) => {
      if (err) res.status(403).send("token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("you are not authenticated");
  }
};

export const verifyTokenAndAuthorisation = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that");
    }
  });
};

export const verifyTokenAndAdmin = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("only admin can acces");
    }
  });
};
