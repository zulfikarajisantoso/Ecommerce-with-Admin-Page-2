import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Viewcategorypub = () => {

    const [loading, setloading] = useState(true)
    const [category, setcategory] = useState([])

    useEffect(() => {
         
        let isMount = true;
        
        axios.get(`/api/getcategory`).then(res => {
            if(isMount)
            {
                if(res.data.status === 200)
                {
                    setcategory(res.data.categoryy)
                    setloading(false)
                }
            }
        })
        return () => {
            isMount = false
        }
    }, [])

    if(loading)
    {
        return (
            <div className=' d-flex justify-content-center align-items-center ' style={{ height:'100vh'}}>
                <div className="planet"></div>
            </div>

        )
        
    }
    else{
        var showlistcategory = '';
        showlistcategory = category.map((item, idx) => {
            return (

                  
                        <div className="col-md-4 br " key={idx}>
                        
                            <Link className="btnflip text-light" to={`collection/${item.slug}`}>
                                 {item.name}
                               
                            </Link>
                     
                     </div>
        

            )
        })
    }

    return (
        <div >
            <div className=" dumm"></div>
            <div className='py-3 bg-light'>
                <div className='container'>
                    <h6>Category / Category name</h6>
                </div>
            </div>
          
                <div className='container cont'>
                <div className="row">
                        {showlistcategory}
              
                </div>
                </div>
           
        </div>
    )
}

export default Viewcategorypub
