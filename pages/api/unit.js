import Pool from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const { newValue } = req.body;
      const connection = await Pool();
      const [rows] = await connection.execute(`SELECT * FROM unit`);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
