import mongoose, { Schema } from "mongoose";

const NewsSchema = new Schema(
  {
    url: {
      type: String,
    },
    news_title: {
      type: String,
    },
    hacker_news_title: {
      type: String,
    },
    hacker_news_url: {
      type: String,
    },
    comments: {
      type: String,
    },
    posted_on: {
      type: String,
    },
    upvotes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const News = mongoose.model("news", NewsSchema);
