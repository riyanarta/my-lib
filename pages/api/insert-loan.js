import Pool from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const { newValue } = req.body;
      const {
        fullName,
        bookTitle,
        selectedClass,
        formattedCurrentDate,
        formattedReturnDate,
      } = req.body;

      const connection = await Pool();
      const splitFormattedCurrentDate = formattedCurrentDate.split("/");
      const formattedCurrentDateForDb = `${splitFormattedCurrentDate[2]}-${splitFormattedCurrentDate[1]}-${splitFormattedCurrentDate[0]}`;
      const splitFormattedReturnDate = formattedReturnDate.split("/");
      const formattedReturnDateForDb = `${splitFormattedReturnDate[2]}-${splitFormattedReturnDate[1]}-${splitFormattedReturnDate[0]}`;
      const [result] = await connection.execute(
        `INSERT INTO loan(loan_name, loan_book, class_id, admin_id, loan_start_time, loan_end_time) VALUES (?,?,?,?,?,?)`,
        [
          fullName,
          bookTitle,
          selectedClass,
          1,
          formattedCurrentDateForDb,
          formattedReturnDateForDb,
        ]
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
