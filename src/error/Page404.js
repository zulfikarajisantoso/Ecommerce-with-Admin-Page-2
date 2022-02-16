import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        
        <div className='container justify-content-center d-flex align-items-center' style={{ height:'100vh'}} >
            <div className=' d-flex flex-column align-items-center'>
          
            <h1>Access Denied!! Your are not an Admin</h1>
                    <Link to='/' className="btn btn-dark fs-4 fw-200 mt-3 ">BACK HOME</Link>
                 
        </div>
  
</div>
    )
}

export default Page404
