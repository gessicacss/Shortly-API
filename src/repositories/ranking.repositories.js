import { db } from "../database/database.connection.js";

export function getUsersRankings(){
    return db.query(`
        SELECT users.id, users.name, COUNT(*) as "linksCount", SUM(urls.views) AS "visitCount"
            FROM urls
            LEFT JOIN users ON users.id = urls."idUser"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;`);
}