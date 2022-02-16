import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import {MdAddShoppingCart} from 'react-icons/md'

const Viewproductpub = (props) => {

    const [loading, setloading] = useState(true)
    const [product, setproduct] = useState([])
    const [category, setcategory] = useState([])
    const history = useHistory()

    
    const productCount = product.length;
    
    useEffect(() => {
        let isMounted = true 
        const product_slug = props.match.params.slug
        axios.get(`/api/getproduct/${product_slug}`).then(res => {
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setproduct(res.data.product_data.product);
                    setcategory(res.data.product_data.category)
                    setloading(false);
                    
                }
                else if (res.data.status === 400 )
                {
                    swal("warning", res.data.message, "warning")
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
    }, [ props.match.params.slug, history])



    const [categoryy, setcategoryy] = useState([])

    useEffect(() => {
         
        let isMount = true;
        
        axios.get(`/api/getcategory`).then(res => {
            if(isMount)
            {
                if(res.data.status === 200)
                {
                    setcategoryy(res.data.categoryy)
                    setloading(false)
                }
            }
        })
        return () => {
            isMount = false
        }
    }, [])


        var showlistcategory = '';
        showlistcategory = categoryy.map((item, idx) => {
            return (
    
                         <div className="col-md-3 col-6 mt-4 mt-md-0  buto"  key={idx}>
                             <Link className=" butto  " style={{ fontFamily:'Bungee, cursive'}} id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home"
                                    to={`${item.slug}`}>
                                    {item.name}
                                </Link>
                      
                      
                        </div>
              
            )
        })
   












    if(loading)
    {
        return (
            <div className=' d-flex justify-content-center align-items-center ' style={{ height:'100vh'}}>
                <div className="planet"></div>
            </div>

        )
    }
    else{
        var showlistproduct = '';
        if(productCount)
        {
            showlistproduct = product.map((item, idx) => {
                return (
            

                        <div className="col-md-4 mt-5" key={idx}>
                     
                                <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                        <img src={`https://backstoraja.herokuapp.com/${item.image}`} className='w-100' alt={item.name} />
                                    </Link>
                        
                        <div  className='d-flex flex-column  justify-content-end text-dark judulitem' style={{ marginTop:'-100px'}}>
                  
                                <Link className='text-decoration-none text-dark'  to={`/collection/${item.category.slug}/${item.slug}`} >
                                    <h5  style={{ marginTop:'35px', marginBottom:'-5px'}} className='fontt'>{item.name}</h5>
                                 </Link>
                       
                                <p style={{ marginTop:'-30px'}} style={{ fontSize:'7px'}} >{item.description}</p>
                                <div style={{ marginTop:'-19px'}} className='d-flex justify-content-between align-items-center'>
                                    <p style={{ fontSize:'13px'}}>{item.selling_price}</p>
                                    <div className='' style={{ paddingRight:'10px', marginBottom:'10px' }}>
                                        <Link  to={`/collection/${item.category.slug}/${item.slug}`} className=''> <MdAddShoppingCart className='ico' /></Link>
                                    </div>
                                  
                            </div>
                            
                        </div>
                       </div>
          
                )
            })
        }else{
            showlistproduct = 
            <div className=' d-flex justify-content-center '>
                   <div className='col-md-12 text-center '>
                    <h1 className='text-light p-5'> No Product in {category.name}</h1>

            </div>
            </div>
         

        }
       
    }

    return (
        
        <div style={{ marginTop:''}}>
            <div className=" dumm"></div>
            <div className='py-3 bg-light'>
                <div className='container'>
                    <h6>Category / Product name</h6>
                </div>
            </div>
            <div className='py-3 du'>
                <div className='container '>
                    <div className='row'>
                        {showlistcategory}
                        {showlistproduct}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewproductpub
