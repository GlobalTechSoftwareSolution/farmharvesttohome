// app/api/testdb/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: "your-host-here", // e.g. mysql.hostinger.com
      user: "u610625785_careersupport",
      password: "@Techsoftware000", // your MySQL password
      database: "careersupport",   // your MySQL database name
    });

    const [rows] = await connection.execute("SELECT NOW() AS currentTime");
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
