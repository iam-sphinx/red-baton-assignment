import React from "react";
import triangle from "../images/triangle.svg";
import { format } from "timeago.js";

const NewsItem = ({
  url,
  hacker_news_url,
  posted_on,
  upvotes,
  comments,
  index,
  news_title,
  hacker_news_title,
  pageNo,
 
}) => {
  return (
    <div className="text-sm mb-2">
      <span className="flex items-center gap-1">
        {index + (30 * pageNo - 30) + 1}. {/* to add functionality of upvote */}
        <img className="h-[10px]" src={triangle} />
        <a href={url}>
          <span>{news_title}</span>
        </a>
        <span className="text-[#999999]">
          (<a href={hacker_news_url}>{hacker_news_title}</a>)
        </span>
      </span>
      <span className="text-xs ml-9 text-[#999999]">
        {upvotes} points {" | "}
        <span>unvote</span>
        {" | "}
        {format(posted_on)}
        {" | "}
        <span className="cursor-pointer" >hide</span>
        {" | "}
        {comments} comments
      </span>
    </div>
  );
};

export default NewsItem;
