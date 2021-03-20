import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import allData from '../Data/Data.json';
import Cart from '../Cart/Cart';



const Home = () => {
   
    return (
        
            <div className="container container-area">
                <div class="row row-area">
                      {
                          allData.map(vehicle => <div class="col-lg-3 col-md-6 col-sm-12 col-area"><Cart vehicle={vehicle}></Cart></div>)
                      }
                </div>
            </div>
        
    );

};

export default Home;