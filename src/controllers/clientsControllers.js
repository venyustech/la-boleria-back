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

export async function getClientOrders(req, res) {
    const { id } = req.params;

    if (!(/^(\-|\+)?([0-9]+|Infinity)$/.test(id)))
        return res.sendStatus(400);

    try {
        const result = await db.query(`
                SELECT 
                    orders.id AS "orderId",
                    orders.quantity, orders."createdAt",  orders."totalPrice",
                    cakes.name AS "cakeName"
                FROM orders
                    JOIN cakes ON cakes.id=orders."cakeId"
                WHERE orders."clientId"=$1
            `, [id]);
        if (result.rowCount === 0) return res.sendStatus(404);

        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}
const i = [
    {
        "orderId": 1,
        "quantity": 2,
        "createdAt": "2022-03-16 10:30",
        "totalPrice": 26.00,
        "cakeName": "Bolo de pote"
    }
]