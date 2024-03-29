import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED !!", err);
  });

// main.js

// import axios from 'axios';
// import { load } from 'cheerio';
// const url = "https://www.iban.com/exchange-rates";

// fetchData(url).then( (res) => {
//     const html = res.data;
//     const $ = load(html);
//     const statsTable = $('.table.table-bordered.table-hover.downloads > tbody > tr');
//     statsTable.each(function() {
//         let title = $(this).find('td').text();
//         console.log(title);
//     });
// })

// async function fetchData(url){
//     console.log("Crawling data...")
//     // make http call to url
//     let response = await axios(url).catch((err) => console.log(err));

//     if(response.status !== 200){
//         console.log("Error occurred while fetching data");
//         return;
//     }
//     return response;
// }