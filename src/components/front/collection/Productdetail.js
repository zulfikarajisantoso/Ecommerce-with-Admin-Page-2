import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const Productdetail = (props) => {

    const [loading, setloading] = useState(true)
    const [product, setproduct] = useState([])
    const [quanti, setquanti] = useState(1);
    const history = useHistory()
    
    useEffect(() => {
        let isMounted = true 
        const category_slug = props.match.params.category
        const product_slug = props.match.params.product
        axios.get(`/api/detailproduct/${category_slug}/${product_slug}`).then(res => {
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setproduct(res.data.product);
                    setloading(false);                    
                }             
                else if (res.data.status === 404)
                {
                    history.push('/collection')
                    swal('Warning', res.data.message, "error")
                }
            }
        })
        return () => {
            isMounted = false
        }
    }, [ props.match.params.category, props.match.params.product, history])

    // quantiti 
    const kurang = () => {
        if(quanti > 1 ){
            setquanti(prevCount => prevCount - 1)
        }
    }
    const tambah = () => {
        if(quanti < 100 ){
            setquanti(prevCount => prevCount + 1)
        }
    }
        // quantiti 

    const submitadd = (e) => {
        e.preventDefault();
        const data = {
            product_id: product.id,
            product_qty: quanti,

        }
        axios.post(`/api/add-to-cart`, data).then(res => {
            if(res.data.status === 201)
            {
                swal("Success", res.data.message, "succes")
            }
            else if (res.data.status === 409)
            {
                // alredy add to card
                swal("Success", res.data.message, "succes")
            }
            else if (res.data.status === 401)
            {
                swal("Error", res.data.message, "error")
            }
            else if (res.data.status === 404)
            {
                swal("Warning", res.data.message, "warning")
            }
        })
    }

    if(loading)
    {
        return (
            <div className=' d-flex justify-content-center align-items-center ' style={{ height:'100vh'}}>
                <div class="planet"></div>
            </div>

        )
    }
    else{
        var stock = ''
        if(product.qty > 0 )
        {
            stock = 
                <div className=' d-flex  justify-content-center flex-column align-items-center  '>
                
                                     
                                            <div className=' mt-4'>
                                                <div className='input-group'>
                                                    <button type='button' onClick={kurang} className=' kur border-1 input-group-text'>-</button>
                                                        <div className='form-control text-center kur' style={{ width:'60px'}}>{quanti}</div>
                                                    <button type='button' onClick={tambah}  className='kur  border-1 input-group-text'>+</button>
                                                </div>  
                                               
                                            </div>
                                            <div class="wrappe  mt-4">
                                                <div class="link_wrapper">
                                                    <button type='button' className=' au btn btn-lg btn-outline-light'  style={{ width:'20rem'}} onClick={submitadd}>Add to Cart </button>
                                                    <div class="ion d-none d-md-flex">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                                                            <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                                                        </svg>
                                                    </div>
                                                </div>                                      
                                               
                                                  
                                             </div>
                                  
            </div>
        }
        else{
            <div>
                 <label className='btn btn-sm btn-success px-4 mt-2'>No Stock</label>
             </div>
        }
       
    }
    return (
        <div style={{ marginTop:''}}>
            <div className=" dumm"></div>
            <div className='py-3 bg-light'>
                <div className='container'>
                <h6>Collections / {product.category.name} / {product.name}</h6>
                </div>
            </div>
           
            <div className='py-3' style={{backgroundColor:'rgb(53, 43, 43)'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6  d-flex justify-content-center'>
                            <img alt={product.name} src={`https://backstoraja.herokuapp.com/${product.image}`}  style={{ height:'40rem'}} className='gam'></img>
                        </div>
                        
                        <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
                        <h2 className='brand2 text-center mt-5 mt-md-0'>STORAJA</h2>
                                <h4 className='text-light foo text-center'>
                                 {product.name}
                            
                                </h4>
                                <p className='text-light text-center fo2' style={{fontSize:'17px'}}>{product.description}</p>
                                <h4 className='mb-1 fo2 text-light text-center ' style={{fontSize:'40px', fontWeight:'bold'}} >
                                    Rp {product.selling_price}
                                    <s className='ms-2'  style={{fontSize:'20px'}} > Rp {product.original_price}</s>
                                  </h4>
                        
                                {stock}
                        
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productdetail
