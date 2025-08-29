import mysql from "mysql2/promise";

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: "srv664.hstgr.io",            // Hostinger MySQL hostname
    user: "u610625785_zKSW3",           // Your MySQL username
    password: "@Techsoftware000",       // Your MySQL password
    database: "u610625785_Wql09",       // Your database name
  });

  return connection;
}
