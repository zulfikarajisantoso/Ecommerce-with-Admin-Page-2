import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const Categoory = () => {

    const [categori, setcategori] = useState({
        slug:'',
        name:'',
        desc:'',
        status:'',
        meta_title:'',
        meta_keyword:'',
        meta_description:'',  
        error_list: [],

    })

    const handleInput = (e) => {
        e.persist();
        setcategori({...categori, [e.target.name] : e.target.value})
    }

    const inpuut = (e) => {
        e.preventDefault();
        const data = {
            slug: categori.slug,
            name: categori.name,
            desc: categori.desc,
            status: categori.status,
            meta_title: categori.meta_title,
            meta_keyword: categori.meta_keyword,
            meta_description: categori.meta_description,
        }
        axios.post('/api/store-category', data)
        .then((res) => {
            if(res.data.status === 200)
            {   
                swal('Success', res.data.message, "success");
                document.getElementById('CATEGORY_FORM').reset();
                setcategori({...setcategori,
                    slug:'',
                    name:'',
                    desc:'',
                    status:'',
                    meta_title:'',
                    meta_keyword:'',
                    meta_description:'',  
                    error_list: [],
            

                })
                
            }else if (res.data.status === 400)
            {
                setcategori({...categori, error_list:res.data.errors })
            }
        })


    }

    // var dis_err = [];
    // if(dis_err.error_list)
    // {
    //     dis_err = [
    //         categori.error_list.slug,
    //         categori.error_list.name,
    //         categori.error_list.meta_title,

    //     ]
    // }
    


    return (
        <div className='container-fluid px-4' >
                <h1 className=''>Add Category </h1>

                {/* {display_err.map((item, index) => {
                    return( 
                        <p key={item}>{item}</p>
                
                    )
                })
                } */}

                <form onSubmit={inpuut} id="CATEGORY_FORM"> 
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
                                <span className='text-danger'>{categori.error_list.slug}</span>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Name</label>
                                <input type="text" name="name"  onChange={handleInput} value={categori.name} className='form-control' />
                                <span className='text-danger' >{categori.error_list.name}</span>
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
                                <span className='text-danger' >{categori.error_list.meta_title}</span>
                        </div>
                        <div className=' form-group mb-3'>
                            <label>Meta Keywords</label>
                            <input type="text" name="meta_keyword"  onChange={handleInput} value={categori.meta_keyword}  className='form-control' />
                                
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

export default Categoory
