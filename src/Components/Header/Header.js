import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css'

const Header = () => {
    const [user,setUser,loggedInUser]=useContext(userContext)
    return (
        <div class="container header-area">
             <div class="row">
                 <div class="col-sm-12 col-md-6 col-lg-6 logo-area">
                    <h1 style={{textAlign:'center',color:'#FF6E40'}}>Easy Raide</h1>
                 </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 list-area">
                    <nav>
                        <ul>
                            <li>
                            <Link to="/home">Home</Link>
                            </li>
                            <li>
                            <Link to="/login">Destination</Link>
                            </li>
                            <li>
                            <Link >Blog</Link>
                            </li>
                            <li>
                            <Link >Contact</Link>
                            </li>
                            <li>
                              {
                                  user.name ? <Link to="/login">{user.name}</Link> : <Link to="/login">Login</Link>
                              }
                            </li>
                        </ul>
                    </nav>
                  </div>
             </div>
        </div>
    );
};

export default Header;