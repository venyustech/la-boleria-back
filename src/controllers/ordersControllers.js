import dayjs from "dayjs";
import { db } from "../database.js";

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const isThereClient = await db.query(`
            SELECT * FROM clients WHERE id=$1`, [clientId]);
        if (isThereClient.rowCount === 0)
            return res.sendStatus(404);

        const isThereCake = await db.query(`
            SELECT * FROM cakes WHERE id=$1`, [cakeId]);
        if (isThereCake.rowCount === 0)
            return res.sendStatus(404)

        const createdAt = dayjs().format("YYYY-MM-DD HH:MM");
        await db.query(`
            INSERT INTO 
                orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
                    VALUES ($1, $2, $3, $4, $5)`, [clientId, cakeId, quantity, createdAt, totalPrice]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

