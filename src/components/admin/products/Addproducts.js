import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'


const Addproducts = () => {

    const [categorylist, setcategorylist] = useState([])
    const [picture, setpic] = useState([])
    const [error, SetError] = useState([])
    const [prodinput,  setprodinput] = useState({
        category_id:'',
        slug: '',
        name: '',
        description: '',
        
        meta_title:'',
        meta_keyword:'',
        meta_description:'',

        selling_price:'',
        original_price:'',
        qty:'',
        brand:'',

        featured:'',
        popular:'',
        status:'',
    
    })

    const inputt = (e) => {
        e.persist();
        setprodinput({...prodinput, [e.target.name]: e.target.value})
    }
    const inputimage = (e) => {
        e.persist();
        setpic({image: e.target.files[0]})
    }
    const subproduct = (e) => {
        e.preventDefault();
        const formdata = new FormData();

            formdata.append('image', picture.image);
            formdata.append('category_id', prodinput.category_id);
            formdata.append('slug', prodinput.slug);
            formdata.append('name', prodinput.name);
            formdata.append('description', prodinput.description);
            formdata.append('meta_title', prodinput.meta_title);
            formdata.append('meta_keyword', prodinput.meta_keyword);
            formdata.append('meta_description', prodinput.meta_description);
            formdata.append('selling_price', prodinput.selling_price);
            formdata.append('original_price', prodinput.original_price);
            formdata.append('qty', prodinput.qty);
            formdata.append('brand', prodinput.brand);
            formdata.append('featured', prodinput.featured);
            formdata.append('popular', prodinput.popular);
            formdata.append('status', prodinput.status);
          
        axios.post('/api/store-product', formdata).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message,"success");
                setprodinput({...setprodinput,
                    category_id:'',
                    slug: '',
                    name: '',
                    description: '',
                    
                    meta_title:'',
                    meta_keyword:'',
                    meta_description:'',
            
                    selling_price:'',
                    original_price:'',
                    qty:'',
                    brand:'',
            
                    featured:'',
                    popular:'',
                    status:'',
                
                })
                SetError([]);

            }
            else if(res.data.status === 422)
            {
                SetError(res.data.errors);
                
            }
        })
    } 


    useEffect(() => {
       axios.get("/api/all-category").then(res => {
        if(res.data.status === 200)
        {
            setcategorylist(res.data.category)
        }

       });
    }, [])

    return (
       <div className='contaner px-4'>
           <div className='card mt-4'>
               <div className='card-header'>
                   <h4> Add Product
                       <Link to="/admin/view-product" className='btn btn-primary btn-sm float-end' >View Product</Link>
                   </h4>
               </div>
               <div className='card-body'>
                <form onSubmit={subproduct} encType='multipart/form-data'>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="other-tab" data-bs-toggle="tab" data-bs-target="#other" type="button" role="tab" aria-controls="other" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            
                            <div className='form-group mb-3'>
                                <label>Select Category</label>
                                <select name="category_id" onChange={inputt} value={prodinput.category_id} className='form-control'>
                                    {
                                        categorylist.map ((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }

                               
                                </select>
                                <small className='text-danger'>{error.category_id} </small>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Slug</label>
                                <input name="slug" type="text" onChange={inputt} value={prodinput.slug} className='form-control'/>                          
                                <small className='text-danger'>{error.slug} </small>   
                            </div>
                            <div className='form-group mb-3'>
                                <label>Name</label>
                                <input name="name" type="text"   onChange={inputt} value={prodinput.name} className='form-control'/>      
                                <small className='text-danger'>{error.name} </small>                       
                            </div>
                            <div className='form-group mb-3'>
                                <label>Description</label>
                                <textarea name="description"  onChange={inputt} value={prodinput.description} className='form-control'/>                             
                            </div>
                                            

                        </div>
                        <div className="tab-pane  card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                            
                            <div className='form-group mb-3'>
                                <label>Meta Title</label>
                                <input name="meta_title" type="text" onChange={inputt} value={prodinput.meta_title} className='form-control' />       
                                <small className='text-danger'>{error.meta_title} </small>                     
                            </div>
                            <div className='form-group mb-3'>
                                <label>Meta Keyword</label>
                                <textarea name="meta_keyword" onChange={inputt} value={prodinput.meta_keyword} className='form-control'/>                             
                            </div>
                            <div className='form-group mb-3'>
                                <label>Meta Description</label>
                                <textarea name="meta_description" onChange={inputt} value={prodinput.meta_description}  className='form-control'/>                             
                            </div>

                        </div>
                        <div className="tab-pane  card-body border fade" id="other" role="tabpanel" aria-labelledby="other-tab">
                        
                            <div className='row'>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Selling Price</label>
                                        <input type="text" name="selling_price" onChange={inputt} value={prodinput.selling_price} className='form-control'/>
                                        <small className='text-danger'>{error.selling_price} </small>               
                                    </div>                    
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Original Price</label>
                                        <input type="text" name="original_price" onChange={inputt} value={prodinput.original_price} className='form-control'/>
                                        <small className='text-danger'>{error.original_price} </small>               
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Quantity</label>
                                        <input type="text" name="qty"  onChange={inputt} value={prodinput.qty} className='form-control'/>
                                        <small className='text-danger'>{error.qty} </small>               
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Brand</label>
                                        <input type="text" name="brand"  onChange={inputt} value={prodinput.brand} className='form-control'/>
                                         <small className='text-danger'>{error.brand} </small>               
                                    </div>
                                    <div className='col-md-8 form-group mb-3'>
                                        <label>Image</label>
                                        <input type="file" name="image"  onChange={inputimage} className='form-control'/>
                                        <small className='text-danger'>{error.image} </small>               
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Featured (checked=shown)</label>
                                        <input type="checkbox" name="featured"  onChange={inputt} value={prodinput.featured} className='h-50 w-50'/>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Popular (checked=shown)</label>
                                        <input type="checkbox" name="popular"  onChange={inputt} value={prodinput.popular} className='h-50 w-50'/>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Status (checked=shown)</label>
                                         <input type="checkbox" name="status"  onChange={inputt} value={prodinput.status} className='h-50 w-50'/>
                                    </div>
                            </div>                     

                        </div>
                    </div>
                    <button type="submit" className='btn btn-primary px-4 mt-2'>Submit</button>

                </form>
                </div>
               
           </div>
       </div>
    )
}

export default Addproducts
