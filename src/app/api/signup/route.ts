
import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/app/api/_server/models/userModel"
import bcryptjs from 'bcryptjs'


export async function POST(request: NextRequest) {
  await connect()
  // Defines an asynchronous POST request handler.
  console.log("the request", request)
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    const user = await User.findOne({ email })

    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    // Saves the new user to the database.
    const savedUser = await newUser.save()


    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })

  }
}