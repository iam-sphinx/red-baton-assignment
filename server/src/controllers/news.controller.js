import { News } from "../models/news.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchNews = asyncHandler(async (req, res) => {
    try {
      const data = await News.find().sort({ posted_on: -1 });
  
      res.status(200).json(new ApiResponse(200, data, "success"));
    } catch (error) {
      throw new ApiError(404, "Not Found");
    }
  });
  
