/* eslint-disable eqeqeq */

import React, { useEffect, useState } from "react";
import firedb from "../Firebase";
import "./Messages.css";


function Messages() {


  const [data,setData] = useState({});




  useEffect(()=>{


    firedb.child("Messages").on("value",(snapshot)=>{


      if(snapshot.val()!=null){

        setData(snapshot.val());

      }
      else{

        setData({});

      }


    });




    return ()=>{

      firedb.child("Messages").off();

    };


  },[]);







  const deleteMessage=(key)=>{


    if(window.confirm("Delete this message?")){


      firedb
      .child("Messages")
      .child(key)
      .remove((err)=>{


        if(err){

          alert(err);

        }
        else{

          alert("Message Deleted");

        }


      });


    }


  };








  return (


    <div className="messages">


      <h2>
        Contact Messages
      </h2>





      <table>


        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Subject</th>

            <th>Message</th>

            <th>Action</th>


          </tr>


        </thead>






        <tbody>


        {


          Object.keys(data).map((key)=>(



            <tr key={key}>


              <td>
                {data[key].name}
              </td>




              <td>
                {data[key].email}
              </td>





              <td>
                {data[key].subject}
              </td>





              <td>
                {data[key].message}
              </td>






              <td>


                <button

                className="delete-btn"

                onClick={()=>deleteMessage(key)}

                >

                Delete

                </button>



              </td>




            </tr>



          ))



        }


        </tbody>





      </table>





    </div>


  );


}


export default Messages;