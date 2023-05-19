import { db } from "../database/database.connection.js";

export default async function getRanking(req, res) {
    try {
        const { rows: rankings } = await db.query(`
        SELECT users.id, users.name, COUNT(*) as "linksCount", SUM(urls.views) AS "visitCount"
            FROM urls
            LEFT JOIN users ON users.id = urls."idUser"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;`);
            res.status(200).send(rankings);
    } catch(err){
        res.status(500).send(err.message);
    }
}