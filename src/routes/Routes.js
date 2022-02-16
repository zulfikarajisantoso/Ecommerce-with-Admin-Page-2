import Dashboard from '../components/admin/Dashboard'
import Profile from '../components/admin/Profile'
import Categoory from '../components/admin/Categoory'
import Viewcategory from '../components/admin/Viewcategory'
import Editcategory from '../components/admin/Editcategory'

import Addproducts from '../components/admin/products/Addproducts'
import Vieprod from '../components/admin/products/Vieprod'
import Editprod from '../components/admin/products/Editprod'
import Orders from '../components/admin/order/Orders'


const Routes = [
    { path: '/admin', exact: true, name:"Admin"},
    { path: '/admin/dashboard', exact: true, name:"Dashboard", component: Dashboard},
    { path: '/admin/category', exact: true, name:"Dashboard", component: Categoory},
    { path: '/admin/view-category', exact: true, name:"Viewcategoory", component: Viewcategory},
    { path: '/admin/edit-category/:id', exact: true, name:"Editcategory", component: Editcategory},
    { path: '/admin/add-product', exact: true, name:"Addproducts", component: Addproducts},
    { path: '/admin/view-product', exact: true, name:"Vieprod", component: Vieprod},
    { path: '/admin/edit-product/:id', exact: true, name:"Editprod", component: Editprod},
    { path: '/admin/profile', exact: true, name:"Profile", component: Profile},
    { path: '/admin/orders', exact: true, name:"Orders", component: Orders},
];
export default Routes
