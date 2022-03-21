import { db } from "../database.js";

export async function postCakes(req, res) {
    const { name, price, description, image } = req.body;

    try {
        const result = await db.query(`SELECT * FROM cakes WHERE name = $1`, [name]);

        if (result.rowCount > 0)
            return res.sendStatus(409);

        await db.query(`
            INSERT INTO cakes (name, price, description, image)
            VALUES ($1, $2, $3, $4)`, [name, price, description, image]);
        res.sendStatus(201);
    } catch (error) {
        console.log("errou1:", error);
        res.sendStatus(500)
    }
}
