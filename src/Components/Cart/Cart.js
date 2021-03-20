import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Cart.css'


const Cart = ({vehicle}) => {
    const {name,img}=vehicle;
    const history= useHistory();
    const handleToDestination = (id) => {
        history.push(`/destination/${id}`);
    }
    return (
        <div>
            
            <button onClick={()=> handleToDestination(vehicle.id)}>
                    <div className="cart">
                        <img style={{width:'100%'}} src={img} alt=""/ >
                        <h3 style={{ color:'#A610E1'}}>{name}</h3>
                    </div>
            </button>
     
        </div>
    );
};

export default Cart;