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
                              {/* <img src={map} alt=""/> */}
                              <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                    />
                       </div>
                 </div>
            </div>
        </div>
    );
};

export default Destination;