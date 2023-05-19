import { db } from "../database/database.connection.js";

export function signInUser(user, token) {
    return db.query(`INSERT INTO sessions ("idUser", token) VALUES ($1, $2)`, [
        user[0].id,
        token,
      ]);
}

export function createUser(body, hashPassword) {
    const { name, email } = body;
    return db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, hashPassword]
      );
}

export function logOutUser(token) {
    return db.query(`DELETE FROM sessions WHERE token=$1`, [token]);
}

export function findUserSession(token){
    return db.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
}

export function findUserEmail(email){
    return db.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
      );
}