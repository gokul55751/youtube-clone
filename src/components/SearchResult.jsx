import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import SearchResultVideoCard from "./SearchResultVideoCard";
import LeftNav from "./LeftNav";
import { fetchDataFromApi } from "../utils/api";

const SearchResult = () => {
  const [result, setresult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setresult(res?.contents);
      setLoading(false);
    });
  };
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item.video;
            return <SearchResultVideoCard key={video.videoId} video={video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
