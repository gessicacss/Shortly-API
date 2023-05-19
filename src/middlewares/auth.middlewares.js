import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { findUserEmail } from "../repositories/auth.repositories.js";

export async function validateSignUpUser(req, res, next){
    const { email } = req.body;

    try {
        const { rowCount: userExists } = await findUserEmail(email);
          if (userExists) return res.status(409).send("User already exists");
    
          next();
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function validateSignInUser(req, res, next){
    const { email, password } = req.body;

    try {
        const { rows: user, rowCount: userExists} = await findUserEmail(email);
          if (!userExists) return res.status(401).send(`Check your credentials!`);
          const checkPassword = bcrypt.compareSync(password, user[0].password);
          if (!checkPassword) return res.status(401).send(`Check your credentials!`);
          res.locals.user = user;
    
          next();
    } catch(err) {
        res.status(500).send(err.message);
    }
}