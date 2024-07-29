
import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import Joke from "../_server/models/jokesModel"



export async function POST(request: NextRequest) {
  await connect()

  try {
    const reqBody = await request.json()
    const { text, category } = reqBody


    const newJoke = new Joke({
      text: text,
      category: category
    })

    // Saves the new joke to the database.
    const saveJoke = await newJoke.save()


    return NextResponse.json({
      message: "Joke created successfully",
      success: true,
      id: saveJoke?._id
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })

  }
}