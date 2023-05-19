import { db } from "../database/database.connection.js";

export function findUserUrl(idUser){
    return db.query(`SELECT us.id, us.name, SUM(ur.views) AS "visitCount",
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', ur.id,
            'shortUrl', ur."shortUrl",
            'url', ur.url,
            'visitCount', ur.views
        )) AS "shortenedUrls"
        FROM users us
        JOIN urls ur ON ur."idUser" = us.id
        WHERE us.id =$1
        GROUP BY us.id;`, [idUser]);
};