import { connect } from "@/app/api/_server/db/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import Joke from "../_server/models/jokesModel";

export async function POST(request: NextRequest) {
  await connect()

  const reqBody = await request.json()
  const { jokeId, userId, score } = reqBody

  if (score < 1 || score > 5) {
    return NextResponse.json({ message: 'Rating must be between 1 and 5' })
  }

  try {
    const joke = await Joke.findById(jokeId);
    if (!joke) {
      return NextResponse.json({ message: 'Joke not found' });
    }

    const existingRating = joke.ratings.find((rating: any) => rating.user.toString() === userId);
    if (existingRating) {
      existingRating.score = score;
    } else {
      joke.ratings.push({ user: userId, score });
    }

    await joke.save();

    return NextResponse.json({ message: 'Rating added/updated' });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' });
  }
}