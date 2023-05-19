import { nanoid } from "nanoid";
import { createUserUrl, deleteUserUrl, findUrlById, findUserUrl, getUserUrl, redirectUserToUrl, updateViews } from "../repositories/urls.repositories.js";

export async function createUrl(req, res) {
    const { idUser } = res.locals.session;
    const { url } = req.body;
    const shortUrl = nanoid(8);
    try {
        await createUserUrl(idUser, shortUrl, url);
        const urlCreated = await getUserUrl(shortUrl);
        const id = urlCreated.rows[0].id;
        res.status(201).send({ id, shortUrl });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function findUrl(req, res) {
    const { id } = req.params;
    try {
        const { rows, rowCount } = await findUrlById(id);
        if (!rowCount) return res.status(404).send(`There's no urls with this id`);

        res.status(200).send(rows[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function redirectToUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const { rows, rowCount } = await redirectUserToUrl(shortUrl);
        if (!rowCount) return res.status(404).send(`There's no urls with this short url`);

        const views = rows[0].views + 1;
        const defaultUrl = rows[0].url;

        await updateViews(views, shortUrl);
        res.redirect(defaultUrl)
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    const { idUser } = res.locals.session;
    const { id } = req.params;
    try {
        const { rowCount: shortUrlExists } = await findUrlById(id);
        if (!shortUrlExists) return res.status(404).send(`There's no shortUrl with this id`);

        const { rowCount } = await findUserUrl(idUser, id);
        if (!rowCount) return res.status(401).send(`This shortUrl doesn't belong to this user`);

        await deleteUserUrl(id);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

