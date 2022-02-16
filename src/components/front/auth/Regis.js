import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../../layouts/front/Navbar'
import swal from 'sweetalert'
import { Link, useHistory } from 'react-router-dom'

const Regis = () => {

    const history = useHistory()
    const[regis, setregis] = useState({
        name: '',
        email: '',
        password: '',
      
        error_list: [],

    })
    const [cek, setcek] = useState([]);
    const ii = (e) => {
        e.persist();
        setcek({...setcek, [e.target.name]: e.target.checked})
    }

    const handleinput = (e) => {
        e.persist();
        setregis({...regis, [e.target.name]: e.target.value})
    }

    const regissubmit = (e) => {
        e.preventDefault();
        const data = {
            name: regis.name,
            email: regis.email,
            password: regis.password,
            role_as: cek.role_as ? '1' : '0',

        }

        console.log(data)
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data)
            .then(res => {
                if(res.data.status === 200 )
                {
                    localStorage.setItem('auth_token' , res.data.token)
                    localStorage.setItem('auth_name' , res.data.username)
                    swal("Success", res.data.message, "success");
                    history.push('/')
                }else{
                    setregis({...regis, error_list: res.data.validation_errors})
                }

            })
            
        })
           
    }
    return (
        <div>
             <div className=" dumm "></div>
             <div className="d-flex justify-content-center mt-2 " > 
            <div className=' w-40 h-50   shadow-lg'>
            <div style={{ height:'100vh'}} className="row  d-flex justify-content-center align-items-center  ">
                   
                    <div className="col-8">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="text-center logg">Sign Up</h1>

                            <div>
                            <div className="login-box">
                                <form onSubmit={regissubmit}>
                                    
                                    <div className="user-box">
                                   
                                        <input type="text" className="" style={{ marginBottom:'-1px'}} name="name"
                                         onChange={handleinput} value={regis.name}  placeholder="" />
                                         <label>Full Name</label>
                                         <span className='text-danger mb-1' >{regis.error_list.name}</span>
                                    </div>
                                    <div className="user-box  my-4">
                                        <input type="email" className="" style={{ marginBottom:'-1px'}} name='email'
                                        onChange={handleinput} value={regis.email} placeholder="" />                                    
                                         <label>Email</label>
                                         <span className='text-danger mb-1' >{regis.error_list.email}</span>
                                    </div>
                                    <div className="user-box  my-4">                                   
                                        <input type="password" className="" style={{ marginBottom:'-1px'}} name='password'
                                            onChange={handleinput} value={regis.password}  placeholder="" />                                           
                                             <label>Password </label>
                                        <span className='text-danger mb-1'>{regis.error_list.password}</span>
                                    </div>
                                    <div className='d-flex justify-content-end mb-3 align-items-center '>
                                        <label style={{ fontSize:'9px'}}>Not Required</label>
                                        <input type="checkbox" name="role_as" style={{ marginLeft:'2px' ,zIndex:'10',backgroudColor:'#000', color:"#000"}}  onChange={ii} 
                                        defaultChecked={cek.status === 1 ? true:false}/>

                                    </div>
                                    
                                    <div>
                                        <button type="submit " style={{ backgroundColor:'#F78900', height:'50px', fontWeight:'bolder' }}  className="w-100 rounded  " >Sign Up</button>    
                                    </div> 
                                                                      
                                </form>
                            </div>
                            <div className='text-center ' style={{ fontWeight:'bold'}}>
                                    Sudah punya akun? <Link to='/login' className='text-decoration-none'> Sign In</Link>
                                </div>


                            </div>
                           
                        </div>
                    </div>
                    <div className="col-4 h-100  d-flex  flex-column justify-content-center align-items-center d-none d-md-flex" style={{backgroundColor:'rgb(29, 27, 27)'}} >
                        <div className=' d-flex  flex-column justify-content-center align-items-center'>
                            <h1 className='text-light text-center'>Welcome <br /> to <br />  STORAJA</h1>
                            <div className='gar'></div>                 
                            <p  className='text-light mt-3 text-center'>Sign Up untuk membuat akun terbaru</p>
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
        </div>
    )
}

export default Regis


