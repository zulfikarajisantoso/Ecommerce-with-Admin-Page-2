import Home from "../components/front/Home";
import About from "../components/front/About";
import Contact from "../components/front/Contact";
import Page403 from "../error/Page403";
import Page404 from "../error/Page404";
import Login from "../components/front/auth/Login";
import Regis from "../components/front/auth/Regis";
import Viewcategorypub from "../components/front/collection/Viewcategorypub";
import Coba from "../components/front/collection/Coba";
import Viewproductpub from "../components/front/collection/Viewproductpub";
import Productdetail from "../components/front/collection/Productdetail";
import Cart from "../components/front/Cart";
import Checkout from "../components/front/Checkout";
import Thankyou from "../components/front/Thankyou";

const Publicroute = [
  
    { path: '/', exact: true, name:"Home", component: Home},
    { path: '/about', exact: true, name:"About", component: About},
    { path: '/contact', exact: true, name:"Contact", component: Contact},
    { path: '/403', exact: true, name:"Page404", component: Page403},
    { path: '/404', exact: true, name:"Page404", component: Page404},
    { path: '/login', exact: true, name:"Login", component: Login},
    { path: '/register', exact: true, name:"Register", component: Regis},
    { path: '/collection', exact: true, name:"Viewcategorypub", component: Viewcategorypub},
    { path: '/collection/:slug', exact: true, name:"Viewproductpub", component: Viewproductpub},
    { path: '/collection/:category/:product', exact: true, name:"Productdetail", component: Productdetail},
    { path: '/cart', exact: true, name:"Cart", component: Cart},
    { path: '/checkout', exact: true, name:"Checkout", component: Checkout},
    { path: '/thankyou', exact: true, name:"Thankyou", component: Thankyou},
    
];  
export default Publicroute