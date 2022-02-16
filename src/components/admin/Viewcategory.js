import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import swal from 'sweetalert';


const Viewcategory = () => {

    const [loading, setloading] = useState(true);
    const [categorylist, setcategorylist] = useState([]);

 
    useEffect(() => {
        axios.get('/api/view-category').then(res => {
            // console.log(res.data.categorylist);
            if(res.data.status === 200 )
            {
                setcategorylist(res.data.category)
            }
            setloading(false)
        })
    }, [])

    const deletee = (e, id) =>{
        e.preventDefault();
        const clik = e.currentTarget;
        clik.innerText = "Deleting";

        axios.delete(`/api/delete-category/${id}`).then(res => {

            if(res.data.status ===  200 )
            {
                swal("Succes", res.data.message, "succes");
                clik.closest("tr").remove();
            }
            else if(res.data.status === 404 )
            {
                swal("Error", res.data.message, "error");
                clik.innerText = "Delete";
            }
        })
        } 

    var view_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Category</h4>
    }
    else
    {
        view_HTMLTABLE = 
        categorylist.map((item) => {
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit-category/${item.id}`} className=' btn btn-sm btn-success'>Edit</Link>
                    </td>
                    <td>
                        <button type='button' onClick={(e) => deletee(e, item.id)}  className=' btn btn-sm btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className='container px-4'> 
            <div className='card mt-4'>
                <div className='card-header '>
                    <h1>View Category
                        <Link to='/admin/category' className='btn btn-primary btn-sm float-end'> Add Category</Link>
                    </h1>
                </div> 
                <div className='card-body'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {view_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Viewcategory
