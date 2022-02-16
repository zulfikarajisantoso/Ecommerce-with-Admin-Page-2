import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Orders = () => {
    const [order, setorder] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        
        let ismount = true;
        document.title = "Orders";
        axios.get(`/api/admin/orders`).then(res => {
            if(ismount)
            {
                if(res.data.status === 200)
                {
                    setorder(res.data.order)
                    setloading(false)
                }
            }
        })
        return () => {
            ismount = false
        }
    }, [])


    var diplay_orders = "";
    if(loading)
    {
        return <h4>Loading Orders..</h4>
    }
    else{
     
        diplay_orders = 
        order.map((item) => {
       
          
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                  
                    <td>
                        <Link to={`view-product/${item.id}`} className='btn btn-success btn-sm'>View</Link>
                    </td>
                  
                </tr>
            )
         })
    }





    return (
        <div className='card px-4 mt-3'>
            <div className='card-header'>
                <h4> Orders
                    <Link to="admin/add-product" className='btn btn-sm float-end btn-primary'>Add Product</Link>
                </h4>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tracking no</th>
                                <th>phone</th>
                                <th>email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diplay_orders}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders
