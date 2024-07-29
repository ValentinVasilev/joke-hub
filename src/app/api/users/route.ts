import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "You can get all users",
    success: true,
  })
}