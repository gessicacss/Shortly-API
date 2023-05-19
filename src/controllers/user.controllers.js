import { findUserUrl } from "../repositories/user.repositories.js";

export default async function getUsersUrl(req, res){
    const { idUser } = res.locals.session;
    try {
    const { rows: userData } = await findUserUrl(idUser);
    res.status(200).send(userData[0])
    } catch(err) {
        res.status(500).send(err.message);
    }
}