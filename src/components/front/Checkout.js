import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import swal from 'sweetalert'
import {MdOutlineSend} from 'react-icons/md'

function Checkout ()  {

    const [loading, setloading] = useState(true)
    const [cart, setcart] = useState([])
    const [error, seterror] = useState([])
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

    const [checkout, setchectout] = useState({
        firstname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    })

    const inputfield = (e) =>{
        e.persist();
        setchectout({...checkout, [e.target.name]: e.target.value})
    }


//    paypal code

const orderdata = {
    firstname: checkout.firstname,
    email: checkout.email,
    phone: checkout.phone,
    address: checkout.address,
    city: checkout.city,
    state: checkout.state,
    zipcode: checkout.zipcode,
    payment_mode: 'by Paypal',
    payment_id: '',
}

    // const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    // const createOrder = (data, actions) =>{
    //     return actions.order.create({
    //       purchase_units: [
    //         {
    //           amount: {
    //             value: totalprice,
    //           },
    //         },
    //       ],
    //     });
    //   };
    
    //   const onApprove = (data, actions) => {
    //     // return actions.order.capture();
    //     return actions.order.capture().then(function(details){
    //         console.log(details)
    //         orderdata.payment_id = details.id;
    //         axios.post(`/api/orderplace`, orderdata).then(res =>{
    //             if(res.data.status === 200)
    //             {
    //                 swal("order Success", res.data.message, "success")
    //                 seterror([])
    //                 history.push('/thankyou')
    //             }
    //             else if(res.data.status === 422)
    //             {
    //                 swal("Failed", "", "error")  
    //                 seterror(res.data.error)
    //             }
    //         })
    //     });
    //   };
      
//    paypal code
    const submitorder = (e, payment_mode) => {
        e.preventDefault();

        const data = {
            firstname: checkout.firstname,
            email: checkout.email,
            phone: checkout.phone,
            address: checkout.address,
            city: checkout.city,
            state: checkout.state,
            zipcode: checkout.zipcode,
            payment_mode: payment_mode,
            payment_id: ''
        }
     

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/orderplace`, data).then(res =>{
                    if(res.data.status === 200)
                    {
                        swal("Order Success", res.data.message, "success")
                        seterror([])
                        history.push('/thankyou')
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Failed", "", "error")  
                        seterror(res.data.error)
                    }
                })
                break;
        
            case 'razorpay':
                axios.post(`/api/validate-order`, data).then(res => {
                    if(res.data.status === 200)
                    {
                       
                        seterror([])

                        var options = {
                            "key": "rzp_test_amFEnporsyw0Bz", // Enter the Key ID generated from the Dashboard
                            "amount": (1 * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                            "name": "Toraja dagang",
                            "description": "Test Transaction",
                            "image": "https://example.com/your_logo",
                          
                            "handler": function (response){
                                // alert(response.razorpay_payment_id);
                                data.payment_id = response.razorpay_payment_id
                                axios.post(`/api/orderplace`, data).then(res =>{
                                    if(res.data.status === 200)
                                    {
                                        swal("order Success", res.data.message, "success")
                                        seterror([])
                                        history.push('/thankyou')
                                    }
                                })
                            
                            },
                            "prefill": {
                                "name": data.firstname,
                                "email": data.email,
                                "contact": data.phone
                            },
                           
                            "theme": {
                                "color": "#3399cc"
                            }
                        };
                        var rzp = new window.Razorpay(options);
                        rzp.open();
                      
                    }  else if(res.data.status === 422)
                    {
                        swal("Failed", "", "error")  
                        seterror(res.data.error)
                    }
                })
                break;

            case 'payonline':
                axios.post(`/api/validate-order`, data).then(res => {
                    if(res.data.status === 200)
                    {
                        seterror([])
                        var myModal = new window.bootstrap.Modal(document.getElementById('payonlinemodal'));
                        myModal.show()
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Failed", "", "error")  
                        seterror(res.data.error)
                    }
                })
               break;
            default:
                break;
        }
    }

    if(loading)
    {
        return (
            <div className=' d-flex justify-content-center align-items-center ' style={{ height:'100vh'}}>
                <div className="planet"></div>
            </div>

        )
    }

    var checkout_var = '';
    if(cart.length > 0 )
    {
        checkout_var = 
        <div>
               <div className='row'>
                   
               <div className='col-md-5'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th width="50%">Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {cart.map((item, idx) => {
                                        totalprice += item.product.selling_price * item.product_qty;
                                        return(
                                         <tr key={idx}>
                                            <td>{item.product.name}</td>
                                             <td>{item.product.selling_price}</td>
                                             <td>{item.product_qty}</td>
                                             <td>{item.product.selling_price * item.product_qty}.000</td>
                                            
                                        </tr>
                                        )
                                    })}
                                    <tr>
                                        <td colSpan="3" className='text-end'>Grand Total</td>
                                        <td colSpan="2" className='text-end'>{totalprice}.000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='col-md-7'>
                            <div className=''>
                                <div className=' text-center header'>
                                    <h4>Form Information</h4>
                                </div>
                                <div className='card_body px-3'>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <div className='form-group mb-3'>
                                                <label>Name</label>
                                                <input type="text" onChange={inputfield} value={checkout.firstname} name="firstname" className='form-control' />
                                                <small className='text-danger'>{error.firstname}</small>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className='form-group mb-3'>
                                                <label>Email Adress</label>
                                                <input type="text" onChange={inputfield} value={checkout.email}  name="email" className='form-control' />
                                                <small className='text-danger'>{error.email}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className='form-group mb-3'>
                                                <label>Phone Number</label>
                                                <input type="text" onChange={inputfield} value={checkout.phone}  name="phone" className='form-control' />
                                                <small className='text-danger'>{error.phone}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className='form-group mb-3'>
                                                <label>Full Address</label>
                                                <textarea rows="3" onChange={inputfield} value={checkout.address} name="address" className='form-control' />
                                                <small className='text-danger'>{error.address}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-4"> 
                                            <div className='form-group mb-3'>
                                                <label>City</label>
                                                <input type="text"onChange={inputfield} value={checkout.city} name="city" className='form-control' />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className='form-group mb-3'>
                                                <label>State</label>
                                                <input type="text" onChange={inputfield} value={checkout.state} name="state" className='form-control' />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className='form-group mb-3'>
                                                <label>Zip Code</label>
                                                <input type="text" onChange={inputfield} value={checkout.zipcode} name="zipcode" className='form-control' />
                                            </div>
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className='d-flex justify-content-between' >
                                            {/* <button type='submit' onClick={(e) => submitorder(e, 'cod')} className=' btn-outline-dark btn rounded mb-1 '  style={{ width:'10rem', fontSize:'25px'}}>Order <MdOutlineSend /></button> */}
                                            <div className='d-flex flex-column'>   
                                            <button type='submit'  onClick={(e) => submitorder(e, 'razorpay')} className='btn btn-primary'>Pay with Razorpay</button>
                                            {/* <button type='submit'  onClick={(e) => submitorder(e, 'payonline')} className='btn btn-warning m-1'>Pay Online</button> */}

                                            </div>
                                            </div>
                                          
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                   
                    </div>
        </div>
      }
      else
      {
        checkout_var = 
          <div className='container text-center'>
              <h4>Cart is Empty, you are in Checkout page</h4>
          </div>
      }

    

    return (
        <div>
            <div className="modal" tabIndex="-1" id='payonlinemodal'>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <hr />
                        {/* <PayPalButton
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                        /> */}
                    </div>
                   
                    </div>
                </div>
                </div>
             <div className=" dumm"></div>
            <div className='py-3 bg-light'>
                <div className='container'>
                    <h6>Collection / Checkout</h6>
                </div>
            </div>
            <div className='py-3'>
                <div className='container'>
                    {checkout_var}
                </div>
            </div>
        </div>
    )
}

export default Checkout
