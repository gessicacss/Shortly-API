import { getUsersRankings } from "../repositories/ranking.repositories.js";

export default async function getRanking(req, res) {
    try {
        const { rows: rankings } = await getUsersRankings();
        res.status(200).send(rankings);
    } catch(err){
        res.status(500).send(err.message);
    }
}