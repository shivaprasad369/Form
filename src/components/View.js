import React, { useEffect, useMemo, useState } from "react";
import EditingForm from "./EditingForm";
import axios from "axios";
export default function View() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      //   const data = await axios.get("/");
      //   const allData = JSON.stringify(data.data);
      const response = await fetch("http://localhost:8080/");
      if (!response.ok) {
        throw new Error("fetching data is failed");
      }
      const parsedData = await response.json();
      setData(parsedData.data);
      console.log(data.data);
    };
    fetchData();
  });

  const deleteHandler = async (id) => {
    console.log(id);
    // const editData=await axios.delete('/delete/'+id)
    const editData = await fetch("http://localhost:8080/delete/" + id, {
      method: "DELETE",
    });
    if (!editData.ok) {
      throw new Error("updat failed");
    }
    console.log(await editData.json());
  };
  var parsedData=[''];
  const [editDate,setEditData]=useState({
    name:'',
    Email:'',id:''
  })
//   
  return (
    <>
      {edit ? (
        <EditingForm data={editDate}/>
      ) : (
        <>
          <h2>Users Details</h2>

          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            {data.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.Email}</td>
                  <td>
                    <button onClick={() => { setEditData({
                name:data.name,
                Email:data.Email,
                id:data._id
                    });
                    setEdit((edit) => !edit);}}>
                      Edit
                    </button>
                    <button onClick={() => deleteHandler(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </>
  );
}
