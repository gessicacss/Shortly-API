import { db } from "../database/database.connection.js";

export function createUserUrl(idUser, shortUrl, url) {
    return db.query(`INSERT INTO urls ("idUser", "shortUrl", url) VALUES ($1, $2, $3)`, [idUser, shortUrl, url]);
}

export function getUserUrl(shortUrl) {
    return db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
}

export function findUrlById(id){
    return db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id])
}

export function redirectUserToUrl(shortUrl){
    return db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
}

export function updateViews(views, shortUrl){
    return db.query(`UPDATE urls views SET views=$1 WHERE "shortUrl"=$2`, [views, shortUrl]);
}

export function findUserUrl(idUser, id){
    return db.query(`SELECT * FROM urls WHERE "idUser"=$1 AND id=$2`, [idUser, id]);
}

export function deleteUserUrl(id){
    return db.query(`DELETE FROM urls WHERE id=$1`, [id]);
}