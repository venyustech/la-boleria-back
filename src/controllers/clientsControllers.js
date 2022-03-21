import { db } from "../database.js";

export async function postClient(req, res) {
    const { name, address, phone } = req.body;

    try {
        await db.query(`
            INSERT INTO clients (name, address, phone)
            VALUES ($1, $2, $3)`, [name, address, phone]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}
