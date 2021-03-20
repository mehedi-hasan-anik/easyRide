import React, { useState,useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const [loggedInUser,setLoggedInUser,user,setUser]= useContext(userContext);
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () =>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();

         firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const{photoURL,email,displayName}=res.user;
            const signedInUser={
                isSignedIn:true,
                name:displayName,
                email:email,
                photo:photoURL,
            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
           
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        });
    }
    // const handleSignOut = () =>{
    //     firebase.auth().signOut()
    //     .then(res => {
    //         const signedOutUser ={
    //             isSignedIn:false,
    //             name:'',
    //             email:'',
    //             password:'',
    //             photo:'',
    //             error:'',
    //             success:false,
    //         }
    //         setUser(signedOutUser);
    //       })
    //       .catch(error => {
    //         // An error happened.
    //       });
    // }
    const handleFacebookSignIn = () =>{
        const facebookProvider = new firebase.auth.FacebookAuthProvider();

         firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then(res => {
            const{photoURL,email,displayName}=res.user;
            const signedInUser={
                isSignedIn:true,
                name:displayName,
                email:email,
                photo:photoURL,
            }
            setUser(signedInUser)
            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log(res);
           
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        });
    }
    const handleBlur = (e) =>{
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber = /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) =>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success= true;
                setUser(newUserInfo);
                updateUserName(user.name);
                setLoggedInUser(newUserInfo);
                history.replace(from);
              
            })
            .catch(error => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success= false;
              setUser(newUserInfo);
            });
        }

        if(!newUser && user.password && user.email){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            const newUserInfo= {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            
           
          })
          .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
           setUser(newUserInfo);
          });
      }
       
        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;
  
        user.updateProfile({
          displayName: name,
        }).then(function() {
          console.log('uesr name updated succefully');
        }).catch(function(error) {
          console.log(error);
        });
  
   }
    

    return (
        <div className="container">
            
           <div className="middle-area">
                <div className="form-area">
                       <div className="toggle-area">
                            <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
                            <label htmlFor="newUser">NewUser Sign Up</label>
                       </div>
                        <form onSubmit={handleSubmit}>
                            {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Name"/>}
                            <br/>
                            <input type="text" name="email" onBlur={handleBlur} placeholder="Username or Email" required/>
                            <br/>
                            <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Password" required/>
                            <br/>
                            
                            <input className="submit-btn" type="submit" value={newUser ? 'Sign Up':'Sign In'}/>

                        </form>
                       
                </div>
            </div>

             <div className="check-area">
                    {
                        user.success && <h5 style={{color:"green",textAlign:'center'}}>User {newUser ? 'Created':'Logged In'} Successfully</h5>
                    }
                     <h5 style={{color:"red",textAlign:'center'}}>{user.error}</h5>
                    <h5 style={{color:"green",textAlign:'center'}}>{user.success}</h5>
                    {
                        user.isSignedIn && <h3>welcome,{user.name}</h3>
                    }
             </div>

             <div className="bootom-login-area">
                <div className="Login-area">
                    <button onClick={handleFacebookSignIn}>Continue with facebook</button>
                    <br/>
                    <br/>
                    
                     <button onClick={handleGoogleSignIn}>Continue with google</button>
                    
                   
                </div>
             </div>

        </div>
    );
};

export default Login;