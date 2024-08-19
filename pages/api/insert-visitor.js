import Pool from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const { newValue } = req.body;
      const { fullName, selectedClass } = req.body;

      const connection = await Pool();
      const [result] = await connection.execute(
        `INSERT INTO visitor(visitor_name, class_id) VALUES (?,?)`,
        [fullName, selectedClass]
      );
      res.status(201).json({ message: "Data inserted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
