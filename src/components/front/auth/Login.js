import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import Navbar from '../../../layouts/front/Navbar'
import {BsFacebook} from 'react-icons/bs'
import {FcGoogle} from 'react-icons/fc'
import {ImAppleinc} from 'react-icons/im'

const Login = () => {

    const history = useHistory()
    const [log, setlog] = useState({
        email:"",
        password:"",
        error_list: []
    }) 

    const handleinput = (e) => {
        e.persist();
        setlog({...log, [e.target.name]: e.target.value })
    } 
    
    const regissubmit = (e) => {
        e.preventDefault();

        const data = {
            email: log.email,
            password: log.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`api/login`, data).then(res => {
            if(res.data.status === 200)
            {
                localStorage.setItem('auth_token' , res.data.token)
                localStorage.setItem('auth_name' , res.data.username)
                swal("Success", res.data.message, "success");
                if(res.data.role === 'admin')
                {
                    history.push('/admin/dashboard')
                }
                else 
                {
                    history.push('/')
                }
               
            }
            else if (res.data.status === 401)
            {
                swal("Warning", res.data.message, "warning");
            }   
            else {
                setlog({...log, error_list: res.data.validation_errors })
            }
            })
        });
    }

    return (
        <div className=''>
           <div className=" dumm "></div>
            <div className="d-flex justify-content-center mt-2 " > 
            <div className=' w-40 h-50   shadow-lg'>
            <div style={{ height:'100vh'}} className="row  d-flex justify-content-center align-items-center  ">
                    <div className="col-4 h-100  d-flex  flex-column justify-content-center align-items-center d-none d-md-flex" style={{backgroundColor:'rgb(29, 27, 27)'}} >
                        <div className=' d-flex  flex-column justify-content-center align-items-center'>
                            <h1 className='text-light text-center'>Welcome <br /> to <br /> STORAJA</h1>
                            <div className='gar'></div>                 
                            <p  className='text-light mt-3 text-center'>Sign in untuk masuk ke akunmu</p>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                       
                            <div className=' d-flex  flex-column justify-content-center align-items-center'>
                                <Link to='/' className=' text-decoration-none d-flex align-items-center p-2 rounded-3' style={{ width:'300px', height:'50px' ,border:' 1px solid #000'}}>
                                     <BsFacebook style={{ fontSize:'2rem', marginRight:'40px'}} />  
                                     <h6 className='text-dark' style={{fontSize:'17px'}}>Sign In with Facebook</h6>
                                </Link>
                                <Link to='/' className=' text-decoration-none d-flex align-items-center p-2 rounded-3 my-3' style={{ width:'300px', height:'50px' ,border:' 1px solid #000'}}>
                                     <FcGoogle style={{ fontSize:'2rem', marginRight:'40px'}} />  
                                     <h6 className='text-dark' style={{fontSize:'17px'}}>Sign In with Google</h6>
                                </Link>
                        
                                <Link to='/' className=' text-decoration-none d-flex align-items-center p-2 rounded-3 ' style={{ width:'300px', height:'50px' ,border:' 1px solid #000'}}>
                                     <ImAppleinc style={{ fontSize:'2rem', marginRight:'40px', color:"#000"}} />  
                                     <h6 className='text-dark' style={{fontSize:'17px'}}>Sign In with Google</h6>
                                </Link>
                        
                               
                            </div>
                            <div className=' d-flex mt-3'>
                               
                                <hr width="150px" />
                                <p className=' d-flex align-items-end mx-2 '>OR</p>
                                <hr width="150px"  />
                                
                            </div>

                            <div>
                            <h1 className="text-center logg">Login</h1>
                            <div className="login-box">
                                <form onSubmit={regissubmit}>
                                    
                                    <div className="user-box ">
                                        <input type="email" className="" style={{ marginBottom:'-1px'}} name='email'
                                        onChange={handleinput} value={log.email} placeholder="" />
                                        <span className='text-danger mb-1' >{log.error_list.email}</span>
                                         <label>Email</label>
                                    </div>
                                    <div className="user-box my-4">                                   
                                        <input type="password" style={{ marginBottom:'-1px'}} name='password'
                                        onChange={handleinput} value={log.password}  placeholder="" />
                                        <span className='text-danger mb-1'>{log.error_list.password}</span>
                                             <label>Password </label>
                                    </div>  
                                    <div>
                                        <button type="submit " style={{ backgroundColor:'#F78900', height:'50px', fontWeight:'bolder' }}  className="w-100 rounded  " >Sign In</button>    
                                    </div> 
                                    <Link to="/" className='text-decoration-none'>
                                    <p style={{ color:'#5570f7', fontWeight:'bold', marginTop:'10px'}}>Forgot Password?</p>
                                    </Link>                                          
                                </form>
                            </div>
                            <div className='text-center ' style={{ fontWeight:'bold'}}>
                                    Belum punya aku? <Link to='/register' style={{ color:'#5570f7'}} className='text-decoration-none'> Sign Up.</Link>
                                </div>


                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
        </div>
 
    )
}

export default Login
