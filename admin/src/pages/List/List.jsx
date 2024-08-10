import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './List.css'

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.succes) {
        // Temporarily check for 'succes'
        setList(response.data.data);
        // console.log(response.data.data); // Verify the data structure
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };


  const removeFood=async(foodId)=>{
    const response =await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.succes){
      toast.success(response.data.message)
    }else{
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default List;
