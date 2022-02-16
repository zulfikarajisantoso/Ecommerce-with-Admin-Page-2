import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function Cart()
{
    const [loading, setloading] = useState(true)
    const [cart, setcart] = useState([])
    const history = useHistory()

    var totalprice = 0;

    if(!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("Warning", "Login to goto Cart Page", "error")
    }
    

    useEffect(() => {
        let isMounted = true 

        axios.get(`/api/cart`).then(res => {
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setcart(res.data.carrt);
                    // console.log(res.data.cart)

                    setloading(false);
                    
                }
             
                else if (res.data.status === 401)
                {
                    history.push('/')
                    swal('Warning', res.data.message, "error")
                } 
            }
        })
        return () => {
            isMounted = false
        }
    }, [history])

    const kurang = (cart_id) =>
    {
        setcart(cart => 
            cart.map((item) =>
                cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty >1 ? 1:0)} : item
            )    
        )   
        updatecarqty(cart_id, "dec")
    }
    const tambah = (cart_id) =>
    {
        setcart(cart => 
            cart.map((item) =>
            cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 100 ? 1:0)} : item
            )    
        )
        updatecarqty(cart_id, "inc")
    }

    const removecartitem = (e,cart_id) => {
        e.preventDefault();

        const thisclik = e.currentTarget;
        thisclik.innerText = "Removing"

        axios.delete(`/api/deletecart/${cart_id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success")
                thisclik.closest("tr").remove();
            }
            else if (res.data.status)
            {
                swal("Error", res.data.message, "Error")
                thisclik.innerText = "Remove"
            }
        })

        

    }

    

    function updatecarqty(cart_id, scope){
        axios.put(`/api/cart-updateqty/${cart_id}/${scope}`).then(res => {
            if(res.data.status === 200){
                // swal("succes", res.data.message, "succes")
            }
        })  
    }

    if(loading)
    {
        return (
            <div className=' d-flex justify-content-center align-items-center ' style={{ height:'100vh'}}>
                <div className="planet"></div>
            </div>

        )
    }
    
    var cartnol ='';
    if(cart.length > 0 )
    {
        cartnol = 
        <div>
                <div className='table-responsive'>
                <table className=' '>
                    <thead>
                        <tr>
                            <th  className='text-center tabtab'>IMAGE</th>                        
                            <th className='text-center tabtab'>PRICE</th>
                            <th className='text-center tabtab'>QUANTITY</th>
                            <th className='text-center tabtab' >TOTAL PRICE</th>
                            <th  className='text-center tabtab'>REMOVE</th>
                        </tr>
                    </thead>
                    <tbody className='mt-4'>
                        {cart.map((item, idx) => {
                            totalprice += item.product.selling_price * item.product_qty;
                                return(
                                    <tr key={idx} className='' >
                                        <td width="40%" >
                                            <div  className=" d-flex justify-content-center flex-column align-items-center"  >
                                             <img src={`https://backstoraja.herokuapp.com/${item.product.image}`} alt={item.product.name} className='g' width="100px" height="h-25" ></img>
                                            <h6 className='mt-4 nam' style={{  fontWeight:'bold' }}>{item.product.name} </h6>
                                            <p className='de'>{item.product.description} </p>
                                            </div>
                                     
                                        </td>
                                      
                                        <td width="20%" className="text-center sel" style={{ fontWeight:'bolder'}} >Rp {item.product.selling_price}</td>
                                        <td width="15%">
                                            <div className='d-flex'>
                                                <button type='button' onClick={() => kurang(item.id)} className=' bg-transparent border-0 kuu'>-</button>
                                                <div className='form-control text-center bg-transparent border-0 qq' style={{ fontWeight:'bold'}}>{item.product_qty}</div>
                                                <button type='button ' onClick={() => tambah(item.id)} className=' bg-transparent border-0 kuu'>+</button>
                                            </div>
                                        </td>
                                        <td width='15%' className="text-center tott">{item.product.selling_price * item.product_qty}.000</td>
                                        <td width='5%' >
                                            <button onClick={(e) =>  removecartitem(e, item.id)} type='button ' className='btn btn-danger btn-sm'>X</button>
                                        </td>
                                    </tr>
                                    )
                            })}
                    </tbody>
                </table>
            </div>
                <div className='col-12 d-flex  mt-3 teng'>
                    <div className='w-md-25 w-10'>
                    <h4 className='tabtab'>Total : 
                        <span className='float-end'> Rp {totalprice}.000</span>
                    </h4>
                   
                    <hr />
                    <Link to="/checkout" className="btn btn-warning w-100  ">Checkout</Link>
                </div>
             </div>
      </div>
    }
    else
    {
        cartnol = 
        <div className='container text-center'>
            <h4>Cart is Empty</h4>
        </div>
    }
    return (
        <div>
             <div className=" dumm"></div>
                <div className='py-3 bg-light'>
                    <div className='container'>
                        <h6>Collection / Carts</h6>
                    </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                           {cartnol}
                        </div>
                  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
