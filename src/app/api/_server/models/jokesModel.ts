import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true }
});

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const jokesSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, required: true, default: "null" },
  ratings: [ratingSchema],
  comments: [commentSchema],
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const Joke = mongoose.models.jokes || mongoose.model("jokes", jokesSchema);

export default Joke;