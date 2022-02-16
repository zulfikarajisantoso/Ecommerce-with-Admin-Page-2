import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from '../../components/front/Footer'
import Fot from '../../components/front/Fot'
import Publicroute from '../../routes/Publicroute'
import Navbar from './Navbar'


const Frontendlay = () => {
    return (
        <div>
          <Navbar />
                <div >
         
                        <Switch>
                            {Publicroute.map((routdara, idx) => {
                                return (
                                    routdara.component && (
                                        <Route 
                                            key={idx}
                                            path={routdara.path}
                                            exact={routdara.exact}
                                            name={routdara.name}
                                            render={(props) => (
                                                <routdara.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })

                            }
                          
                
                        </Switch>               
           
                 </div>
                 <Footer />
                 <Fot />
        </div>
    )
}

export default Frontendlay
