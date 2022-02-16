import React from 'react'
import Footer from './Footer'
import Navbar from "./Navbar"
import Sidebar from './Sidebar'
import "../../assets/admin/css/styles.css"
import "../../assets/admin/js/scripts.js"
import Routes from '../../routes/Routes'
import { Switch, Route, Redirect} from 'react-router-dom'


const Masterlayout = () => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                 <div id="layoutSidenav_nav">
                     <Sidebar />
                 </div>
                 <div id="layoutSidenav_content">
                     <main>
                        <Switch>
                            {Routes.map((rout, idx) => {
                                return (
                                    rout.component && (
                                        <Route 
                                            key={idx}
                                            path={rout.path}
                                            exact={rout.exact}
                                            name={rout.name}
                                            render={(props) => (
                                                <rout.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })

                            }
                            <Redirect from="admin" to="/admin/dashboard" /> 
                
                        </Switch>
                     </main>
                     <Footer />
                 </div>
            </div>
        </div>
    )
}

export default Masterlayout
