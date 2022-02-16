import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'


const Vieprod = () => {

    const [ prod, setproduct] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        
        document.title = "View Products";
        axios.get( `/api/view-product`).then(res => {
            if(res.data.status === 200)
            {
                setproduct(res.data.products)
                setloading(false);
            }
        })
    }, [])

    var diplay_data = "";
    if(loading)
    {
        return <h4>Loading Products</h4>
    }else{

        var prostatus = '';
        diplay_data = 
        prod.map((item) => {
        if(item.status === '0')
        {
            prostatus = 'Shown';
        }else if (item.status === '1')
        {
            prostatus = 'Hidden'
        }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`https://backstoraja.herokuapp.com/${item.image}`} alt={item.name} width="50px" />  </td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
                    </td>
                    <td>
                       {prostatus}
                    </td>
                </tr>
            )
        })


    }


    return (
        <div className='card px-4 mt-3'>
            <div className='card-header'>
                <h4> View Product
                    <Link to="add-product" className='btn btn-sm float-end btn-primary'>Add Product</Link>
                </h4>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Selling Price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diplay_data}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Vieprod

