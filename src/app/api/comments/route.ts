import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import Joke from "../_server/models/jokesModel";


export async function POST(request: NextRequest) {

  await connect()
  const reqBody = await request.json()
  const { jokeId, userId, text } = reqBody

  if (!text) {
    return NextResponse.json({ message: 'Comment text is required' });
  }

  try {
    const joke = await Joke.findById(jokeId);
    if (!joke) {
      return NextResponse.json({ message: 'Joke not found' });
    }

    joke.comments.push({ user: userId, text });

    await joke.save();

    return NextResponse.json({ message: 'Comment added' });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
}