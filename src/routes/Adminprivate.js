import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import Masterlayout from '../layouts/admin/Masterlayout'

function Adminprivate({...rest}){

    const history = useHistory();
    const [ auth, setauth ] = useState(false);
    const [ loading, setloading ] = useState(true);

    useEffect(() => {
       
        axios.get('/api/checkingauth').then(res => {
        
        if(res.status === 200)
            {
                setauth(true)
            }   
            setloading(false)

        })
        return () => {
            setauth(false)
        }
    }, [])

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if(err.response.status === 401)
        {
            swal( "Unauthorized ", err.response.data.message, "warning");
            history.push('/');
        }
        return Promise.reject(err);
    })

    axios.interceptors.response.use(function (response) {
        return response;
        }, function (error) {
            if(error.response.status === 403) //access denied
            {
                swal('forbidden', error.response.data.message, "warning" );
                history.push('/404');
                
            }
            else if (error.response.status === 403) //page not found
            {
                swal('403 Error', "Url/page not found", "warning");
                history.push('/403');
            }
            return Promise.reject(error)
          
        }
    );

    if(loading)
    {
        return <h1>loading.....</h1>
    }

    return (
        <Route {...rest} 
        render={ ({props, location}) => 
                    auth ? <Masterlayout {...props} /> : <Redirect to={{ pathname:"/login", state : {from:location}}} />
                
             }  
        />
    )
}

export default Adminprivate
