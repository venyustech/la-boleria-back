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

export async function getOrders(req, res) {
    const { date } = req.query;

    try {
        const conditions = [];
        const params = [];
        let where = "";

        const isThereOrder = await db.query(`SELECT * FROM orders`);
        if (isThereOrder.rowCount === 0) return res.status(404).send([]);

        if (date) {
            const isThereOrderByDate = await db.query(`
                    SELECT "createdAt" FROM orders WHERE "createdAt"=$1`, [date]);
            if (isThereOrderByDate.rowCount === 0) return res.status(404).send([]);

            params.push(date);
            conditions.push(`orders."createdAt"=$${params.length}`);
        }
        if (params.length > 0) where += `WHERE ${conditions.join(" AND ")}`;

        const result = await db.query({
            text: `
                SELECT 
                    clients.*,
                    cakes.*,
                    orders."createdAt", orders.quantity, orders."totalPrice"
                FROM orders
                        JOIN clients ON clients.id=orders."clientId"
                        JOIN cakes ON cakes.id=orders."cakeId"
                ${where}
            `,
            rowMode: "array",
        }, params);

        res.status(200).send(result.rows.map(mapOrdersArrayToObject));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
function mapOrdersArrayToObject(row) {
    const [
        clientId,
        clientName,
        clientAddress,
        clientPhone,
        cakeId,
        cakeName,
        cakePrice,
        cakeImage,
        cakeDescription,
        createdAt,
        quantity,
        totalPrice,
    ] = row;

    return {
        client: {
            id: clientId,
            name: clientName,
            address: clientAddress,
            phone: clientPhone,
        },
        cake: {
            id: cakeId,
            name: cakeName,
            price: cakePrice,
            description: cakeDescription,
            image: cakeImage,
        },
        createdAt,
        quantity,
        totalPrice,
    };
}