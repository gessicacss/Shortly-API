import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function handleSignIn(req, res) {
  const { user } = res.locals.user;
  try {
    const token = uuid();
    await db.query(`INSERT INTO sessions ("idUser", token) VALUES ($1, $2)`, [
      user[0].id,
      token,
    ]);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  try {
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, hashPassword]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function handleLogOut(req, res) {
  const { token } = res.locals.session;
  try {
    await db.query(`DELETE FROM sessions WHERE token=$1`, [token])
    res.sendStatus(200);
  } catch(err) {
    res.status(500).send(err.message);
  }
}