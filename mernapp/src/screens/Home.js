import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [fooditems, setFooditems] = useState([]);


  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFooditems(response[0]);
    setFoodCat(response[1]);

    
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel" style={{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
          <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{
                  setsearch(e.target.value)
                }}
              />
              {/* <button className="btn btn-outline-success text-white bg-success " type="submit">
                Search
              </button> */}
            </div>
          </div>
          
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/12049993/pexels-photo-12049993.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100 h-50"
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/2347383/pexels-photo-2347383.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100 "
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="d-block w-100 "
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
 </div>


      
      <div className="container">
      {
        foodCat !==[]
        ? foodCat.map((data)=>{
          return ( <div className="row m-3">
            <div key={data._id} className="fs-3 m-3">
              {data.CategoryName}
            </div>
            <hr />
            {fooditems !==[]? fooditems.filter ((item)=> (item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toLowerCase()))) 
            .map(filteritems=>{
              return (
                <div key={filteritems._id} className="col-12 col-md-6 col-lg-3">
                  <Card foodItem={filteritems}
                  options={filteritems.options[0]}
                  imgSrc={filteritems.img}
                  ></Card>
                </div>
              )
            })
            :
            <div>no such data found</div>
            }
            </div>
          )
        }):""
      }
          
        
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
