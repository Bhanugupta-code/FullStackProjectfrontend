import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "../components/FilterBar";
const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;

const Home = ({ searchedresults }) => {
  const [itemList, setItemlist] = useState([]);
  const getData = async () => {
    const res = await axios.get(`${BACKEND_LINK}/admin`);
    console.log(res);
    console.log("Data received");
    setItemlist(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <FilterBar
        itemList={searchedresults.length ? searchedresults : itemList}
      />
    </div>
  );
};

export default Home;
