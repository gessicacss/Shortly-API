import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createUser, logOutUser, signInUser } from "../repositories/auth.repositories.js";

export async function handleSignIn(req, res) {
  const { user } = res.locals;
  try {
    const token = uuid();
    await signInUser(user, token);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function handleSignUp(req, res) {
  const { password } = req.body;
  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(password, saltRounds);
  try {
    await createUser(req.body, hashPassword)
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function handleLogOut(req, res) {
  const { token } = res.locals.session;
  try {
    await logOutUser(token)
    res.sendStatus(200);
  } catch(err) {
    res.status(500).send(err.message);
  }
}