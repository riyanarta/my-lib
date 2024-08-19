import Pool from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const { newValue } = req.body;
      const { fullName } = req.body;

      const connection = await Pool();
      const [result] = await connection.execute(
        `SELECT * FROM loan WHERE loan_name = '${fullName}'`
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
