import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

const Editcategory = (props) => {

    const [loading, setloading] = useState(true)
    const history = useHistory()
    const [categori , setcategori] = useState([]);
    const [error_list , setError] = useState([]);

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res => {
            if(res.data.status === 200)
            {
                setcategori(res.data.category)
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-category')
            }
            setloading(false)
        })
    }, [props.match.params.id , history])

    const handleInput = (e) => {
        e.persist();
        setcategori({...categori, [e.target.name]: e.target.value});
    }

    const update = (e) => {
        e.preventDefault();
        const category_id = props.match.params.id;
        const data = categori;
        axios.put(`/api/update-category/${category_id}`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
            
                setError([]);
            }
            else if(res.data.status === 400)
            {
                setError(res.data.errors)
            }
            else if (res.data.status === 404)
            {
                swal("error", res.data.message, "error")
                history.push('admin/view-category')

            }

        })
    }

    if(loading)
    {
        return <h4>Loading...</h4>
        
    }


    return (
        <div className='container px-4'>
            <div>
                <h4>Edit Category
                    <Link className="btn btn-sm btn-danger" to="/admin/view-category">back</Link>
                </h4>
            </div>
              <form onSubmit={update} id="CATEGORY_FORM"> 
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                    </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="pill" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo tag</button>
                </li>
            
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane card-body border fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className=' form-group mb-3'>
                            <label>Slug</label>
                                <input type="text" name="slug" onChange={handleInput} value={categori.slug} className='form-control' />
                                <span className='text-danger'>{error_list.slug}</span>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Name</label>
                                <input type="text" name="name"  onChange={handleInput} value={categori.name} className='form-control' />
                                <span className='text-danger' >{error_list.name}</span>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Descrption</label>
                                <textarea  name="desc"  onChange={handleInput} value={categori.desc} className='form-control' ></textarea>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Status</label>
                                <input type="checkbox" name="status"  onChange={handleInput} value={categori.status} /> Status 0 = shown/1=hidden
                        </div> 
                        
                    </div>
                    <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

                        <div className=' form-group mb-3'>
                            <label>Meta Title</label>
                                <input type="text" name="meta_title"  onChange={handleInput} value={categori.meta_title}  className='form-control' />
                                <span className='text-danger' >{error_list.meta_title}</span>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Meta Keywords</label>
                                <textarea name="meta_keyword"  onChange={handleInput} value={categori.meta_keyword}  className='form-control' ></textarea>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Meta Description</label>
                                <textarea name="meta_description"  onChange={handleInput} value={categori.meta_description}  className='form-control' ></textarea>
                        </div>
                    </div>
                </div>
            <button type='submit' className='btn btn-primary px-4 mt-2 float-end'> Submit</button>
            </form>
            
        </div>
    )
}

export default Editcategory
