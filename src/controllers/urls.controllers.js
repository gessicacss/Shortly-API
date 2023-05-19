import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function createUrl(req, res) {
    const { idUser } = res.locals.session;
    const { url } = req.body;
    const shortUrl = nanoid(8);
    console.log(res.locals.session);
    try {
        await db.query(`INSERT INTO urls ("idUser", "shortUrl", url) VALUES ($1, $2, $3)`, [idUser, shortUrl, url]);
        const urlCreated = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
        const id = urlCreated.rows[0].id;
        res.status(201).send({ id, shortUrl });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function findUrl(req, res) {
    const { id } = req.params;
    try {
        const { rows, rowCount } = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]);
        if (!rowCount) return res.status(404).send(`There's no urls with this id`);

        res.status(200).send(rows[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function redirectToUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const { rows, rowCount } = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
        if (!rowCount) return res.status(404).send(`There's no urls with this short url`);

        const views = rows[0].views + 1;
        const defaultUrl = rows[0].url;

        await db.query(`UPDATE urls views SET views=$1 WHERE "shortUrl"=$2`, [views, shortUrl]);

        res.redirect(defaultUrl)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    const { idUser } = res.locals.session;
    const { id } = req.params;
    try {
        const { rowCount: shortUrlExists } = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]);
        if (!shortUrlExists) return res.status(404).send(`There's no shortUrl with this id`);

        const { rowCount } = await db.query(`SELECT * FROM urls WHERE "idUser"=$1 AND id=$2`, [idUser, id]);
        if (!rowCount) return res.status(401).send(`This shortUrl doesn't belong to this user`);

        await db.query(`DELETE FROM urls WHERE id=$1`, [id]);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

