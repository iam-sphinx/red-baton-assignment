import React, { useEffect, useState } from "react";
import NewsItem from "../components/NewsItem.jsx";
import axios from "axios";

const Home = () => {
  const [pageNo, setPageNo] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [hide, setHide] = useState();

  const handleClick = () => {
    setPageNo((prevPageNo) => (prevPageNo === 3 ? 1 : prevPageNo + 1));
  };

  const handlePageData = () => {
    const itemsPerPage = 30;
    const startIndex = (pageNo - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newData = responseData.slice(startIndex, endIndex);
    setPageData(newData);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://backend-yh0x.onrender.com/api/v1/news");
      console.log(response.data.data);
      setResponseData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handlePageData();
  }, [pageNo, responseData]);

  return (
    <div className="flex-1">
      <div>
        {pageData.map((item, index) => (
          <NewsItem
            key={index}
            {...item}
            index={index}
            pageNo={pageNo}
          
          />
        ))}
      </div>
      <button onClick={handleClick} className="ml-9">
        More
      </button>
    </div>
  );
};

export default Home;
