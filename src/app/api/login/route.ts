import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  await connect()

}