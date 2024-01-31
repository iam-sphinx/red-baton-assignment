import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as cheerio from "cheerio";
import schedule from "node-schedule";

import axios from "axios";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import { News } from "./models/news.models.js";
import newsRouter from "./routes/news.routes.js";

// routes declaration
app.get("/", (req, res) => {
  res.send("Hello from backend");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/news", newsRouter);

const baseUrl = "https://news.ycombinator.com/news";
const scrap_data = [];

// crawling logic

async function scrapData(url) {
  try {
    // logic to get data
    let a1 = [];
    let a2 = [];

    const res = await axios.get(url);
    if (!res.data) {
      throw new Error("Crawl data not found");
    }

    const $ = cheerio.load(res.data);

    // for first row
    $("tbody tr.athing").each((index, element) => {
      const titleSpan = $(element).find("td.title span.titleline");
      const titleUrl = titleSpan.find("a").attr("href");
      const titleText = titleSpan.find("a").text();

      const sideSpan = titleSpan.find("span.sitebit.comhead").find("a");
      const sideUrl = sideSpan.attr("href");
      const sideText = sideSpan.find("span.sitestr").text();

      a1.push({
        url: titleUrl,
        news_title: titleText,
        hacker_news_title: sideText,
        hacker_news_url: sideUrl,
      });
    });

    // for second row
    $("tbody tr td.subtext ").each((index, element) => {
      // console.log(element);
      const upvote = $(element).find("span.score").text();
      const posted_at = $(element).find("span.age").attr("title");
      const comment = $(element).find("a:last").text();

      const noComment = comment.replace(/\D/g, "") || "0";
      const noUpvote = upvote.replace(/\D/g, "") || "0";

      a2.push({
        comments: noComment || "0",
        posted_on: posted_at || "0",
        upvotes: noUpvote || "0",
      });
    });

    // now for 2nd and 3rd page crawling
    const moreBtn = $("a.morelink").attr("href");
    const no = moreBtn.replace(/\D/g, "");
    if (no <= 4) {
      scrapData(`${baseUrl}?p=${no}`);
    }

    a1.map((obj1, index) =>
      scrap_data.push({
        ...obj1,
        ...a2[index],
      })
    );
  } catch (err) {
    console.log(err);
  }
}

const job = schedule.scheduleJob("0 * * * *", function () {
  scrapData(baseUrl)
    .then(async () => {
      for (const item of scrap_data) {
        const existingData = await News.findOne({ posted_on: item.posted_at });
        if (existingData) {
          // Update the existing document
          await News.updateOne({ posted_on: item.posted_at }, { $set: item });
        } else {
          // Insert a new document
          await News.create(item);
        }
      }
    })
    .catch((err) => console.log(err));
});

export { app };
