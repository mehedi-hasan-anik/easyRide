import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../../App';
import allData from '../Data/Data.json';
import map from '../Image/Map.png';
import './Destination.css';
import people from '../Image/peopleicon.png'

const Destination = () => {
    const [show,setShow]=useState(false);
    const [newUser,setNewUser,user,setUser]= useContext(userContext);
    const {idNumber} = useParams();
    const found = allData.find(Element => Element.id == idNumber);
    console.log(found.name);
    
    return (
        <div>
            <div className="container">
                 <div className="row">
                       <div className="col-sm-12 col-md-12 col-lg-4 ">
                           <div className="full-form-area">
                             <div className="form-area">
                                 <form action="">
                                     <p>Pick From</p>
                                     <input type="text" name="" id=""/>
                                     <p>Pick To</p>
                                     <input type="text"/>  
                                 </form>
                                 <button onClick={()=> setShow(!show)} >search</button>
                             </div>
                            </div>
                             <div>
                                 { show ? <div className="show-area row">
                                     <div className="img-area col-3">
                                         <img style={{width:'100%'}} src={found.img} alt=""/>
                                     </div>
                                     <div className="name-area col-3">
                                         <h3>{found.name}</h3>
                                     </div>
                                     <div className="people-area col-3">
                                        <div className="left">
                                           <img style={{width:'30px'}} src={people} alt=""/>
                                        </div>
                                        <div className="right">
                                            <p>4</p>
                                        </div>
                                     </div>
                                     <div className="cost-area col-3">
                                         <h5 style={{textAlign:'center'}}>$10</h5>
                                     </div>
                                 </div>:null}
                             </div>
                       </div>
                       <div className="col-sm-12 col-md-12 col-lg-8 map-area">
                              <img src={map} alt=""/>
                       </div>
                 </div>
            </div>
        </div>
    );
};

export default Destination;