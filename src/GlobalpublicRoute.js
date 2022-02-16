import React from 'react';

import {Route } from 'react-router-dom'
import Frontendlay from './layouts/front/Frontendlay';
function GlobalpublicRoute({...rest})
{
    return (
        <Route {...rest} render={(props) => <Frontendlay {...props} />} />
    )
} 
export default GlobalpublicRoute