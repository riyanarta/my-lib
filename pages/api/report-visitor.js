import Pool from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const { newValue } = req.body;
      //   const { fullName, selectedClass } = req.body;

      const connection = await Pool();
      const [result] = await connection.execute(
        `SELECT visitor.visitor_id, visitor.visitor_name, visitor.visitor_date, class.class_id, class.class_desc, unit.unit_id, unit.unit_name FROM visitor INNER JOIN class ON visitor.class_id = class.class_id INNER JOIN unit ON class.unit_id = unit.unit_id`
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
