import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/app/api/_server/models/userModel"


export async function GET(request: NextRequest, { params }: any) {

  connect()
  const { id } = params;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);


  } catch (error) {

  }


}