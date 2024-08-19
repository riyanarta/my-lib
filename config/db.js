import { createConnection } from "mysql2/promise";

export default function Connected() {
  return createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my-lib",
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
  });
}
