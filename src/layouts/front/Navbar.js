import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import './Nav.css'
import { AiOutlineShoppingCart,AiOutlineLogout, AiOutlineBars } from 'react-icons/ai';
import { FaUser, FaTimes} from 'react-icons/fa';

const Navbar = () => {

    const [ca, setca] = useState();
    const history = useHistory();
    const logoutt = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if(res.data.status === 200)
            {
                    localStorage.removeItem('auth_token')
                    localStorage.removeItem('auth_name')
                    swal("Success", res.data.message, "success");
                    history.push('/')
                
            }
        });
         
    }
    const [click , setclick] = useState(false);
    const hadleclick  = () => setclick(!click)

    var autbutton = '';
    if(!localStorage.getItem('auth_token'))
    {
        autbutton = (
            <div>
                <NavLink className="nalink text-light  spee"   onClick={hadleclick}  to="/login"><FaUser/></NavLink>
            </div>
        )
    }
    else
    {
        autbutton = (
            <div className='d-flex align-items-center justify-content-center '>
                <button onClick={logoutt}  className="btn btn-danger text-white d-flex align-items-center lout " style={{ marginRight:'9px'}} ><AiOutlineLogout className='lo' style={{ marginRight:'2px'}}  /><span className='d-lg-none'> Logout</span> </button>
            </div> 
        
        )
    }
    
    
    useEffect(() => {
  

        axios.get(`/api/ap`).then(res => {
            
                if(res.data.status === 200)
                {
                    setca(res.data.ca);
                    // console.log(res.data.ca)
                }
             
                else
                {
                    console.log('wkwkw')
                } 
            }
        )
        
    }, )


    const [nav, setnav] = useState(false);
    const chagebgnav = () => {
        if(window.scrollY >= 80)
        {
            setnav(true)
        }
        else{
            setnav(false)
        }
    }
    window.addEventListener('scroll',chagebgnav )

 
    return (

    <nav className={nav ? 'navbarr active' : 'navbarr' } >
        <div className="navcon">
            
                <Link className="navlof text-light " to="/" >TRJ.</Link>  
                <ul className={click ? "navmenu active": "navmenu"} >
                    
                    <li className="navite">
                        <NavLink className="nalink text-light "  onClick={hadleclick} exact activeClassName="active" to="/">Home</NavLink>
                    </li>
                    <li className="navite ">
                        <NavLink className="nalink text-light "  onClick={hadleclick}  exact activeClassName="active" to="/about">About</NavLink>
                    </li>  
                    <li className="navite ">
                        <NavLink className="nalink text-light "  onClick={hadleclick} exact activeClassName="active"  to="/contact">Contact</NavLink>
                    </li>  
                    <li className="navite ">
                        <NavLink className="nalink text-light "  onClick={hadleclick} exact activeClassName="active" to="/collection">Collection</NavLink>
                    </li> 
                    <div className='text-light d-flex align-items-end d-none d-lg-flex'> |</div> 
                    <div className='spe  mt-md-3'>
                        <NavLink  onClick={hadleclick} className="nalinkk text-light d-none  d-lg-flex" exact to="/cart"><AiOutlineShoppingCart style={{fontSize:'20px'}} /></NavLink>
                        <p className=' bg-danger rounded-pill p-1 text-light d-none d-lg-flex' style={{ marginRight:'10px', marginLeft:'4px'}}>{ca}</p>
                        {autbutton}
                    </div>  
                
                             
            </ul>
            <div className='d-flex align-items-center d-lg-none'>
                <div className='d-flex align-items-center d-lg-none'>
                    <NavLink  onClick={hadleclick} className="ca text-light d-flex " exact to="/cart"><AiOutlineShoppingCart style={{fontSize:'20px'}} /></NavLink> 
                     <p className='no bg-danger rounded-pill p-1'>{ca}</p>
                   
                </div>
                 
         
                 <div className='icomm  ' onClick={hadleclick}>   
                    <i>{click ? <FaTimes /> : <AiOutlineBars />}</i>  
                </div>
            </div>
              
               
   
            
         
            
  
    </div>
</nav>
    )
}

export default Navbar
