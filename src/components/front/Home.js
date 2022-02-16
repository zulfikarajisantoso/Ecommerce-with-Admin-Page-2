import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'

import video  from '../../video/aa.mp4';
import toraja  from '../../video/toraja.mp4';
import ransel from '../../images/ransel.jpg'
import bag from '../../images/bag.jpg'
import ran from '../../images/ran.jpg'
import hand from '../../images/hand.jpg'
import salem from '../../images/salem.jpg'
import tote from '../../images/tote.jpg'

import slem from '../../images/slem.jpg'
import {GiMoebiusStar} from 'react-icons/gi'
import {BiWorld} from 'react-icons/bi'
import {MdAddShoppingCart} from 'react-icons/md'
import {BsInstagram} from 'react-icons/bs'
import axios from 'axios';
import Fot from './Fot';

const Home = () => {

    const [popular, setpopular] = useState([])
    // const [loading, setloading] = useState(true)


    useEffect(() => {
            // let isMount = true;
            axios.get(`/api/home`).then(res => {
                if(res.data.status === 200)
                {
                    setpopular(res.data.popular)
                    // console.log(res.data.popular)
                    // setloading(false)
                }
                else if (res.data.status === 401)
                {
                    // setpopular(res.data.popular)
                }
                
               
            })
          

    }, [])

        var popu = '';
        popu = popular.map((item, idx) => {
           return (
             
                    <div className="col-md-4 bgg" key={idx}>
                        <div className='d-flex justify-content-center align-items-center'>
                                <img src={`https://backstoraja.herokuapp.com/${item.image}`} alt={item.name}  className=' h-100 w-100 ' />
                        </div>
                        <div  className='d-flex flex-column  justify-content-end text-dark judulitem' style={{ marginTop:'-100px'}}>
                                <h5 style={{ marginTop:'35px', marginBottom:'-5px'}} className='fontt'>{item.name}</h5>
                                <p style={{ marginTop:'-30px'}} style={{ fontSize:'7px'}} >{item.description}</p>
                                <div style={{ marginTop:'-19px'}} className='d-flex justify-content-between align-items-center'>
                                    <p style={{ fontSize:'13px'}}>{item.selling_price}</p>
                                    <div className='' style={{ paddingRight:'10px', marginBottom:'10px' }}>
                                        <Link to={`/collection/${item.category.slug}/${item.slug}`} className=''> <MdAddShoppingCart className='ico' /></Link>
                                    </div>
                                  
                            </div>
                            
                        </div>
                     
                    </div>
                  
            
           )
       })
    


    return (
        <div >
            <div className="homecon">
                <div className='herobg'>
                    <video className='videobg' autoPlay loop muted src={video} typeof='video/mp4'></video>
                </div>
                <div className=' d-flex flex-column justify-content-center align-items-center'>
                    <h2 className='brand2'>STORAJA</h2>
                    <h1 className='namebrand' data-text="STORAJA">STORAJA</h1>
                    <p className='text-light ket'>Menjual semua product khas dari Toraja </p>
                    <Link className=' btn-outline-light btn-lg btn btt rounded-0' to='/collection'>Collection</Link>
                </div> 
            </div>
           <div className='container naik' >
                <div className='d-flex'>   
                    <div className='col-md-4'>
                        <div className='d-flex flex-column justify-content-center'>
                            <div>
                                <img src={ransel} style={{ width:'100%'}}  />
                            </div>
                            <div className='hal2 d-flex flex-column  justify-content-center align-items-center text-light'>
                                <h3 className='mt-4'>Ransel</h3>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <hr width='70px' />
                                        <GiMoebiusStar className=' mx-2' />
                                    <hr width='70px' />
                                </div>
                                <div className='text-center px-4 fonn'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor ex nec ex convallis, eget dapibus purus volutpat. Vivamus nec porttitor orci, ultricies mattis orci.  
                                </div>
                                <a href='https://www.google.com/search?q=foto+tas+toraja&sxsrf=AOaemvLh9MvvZQ0S3n2S3-d8zDzgMcelHA:1641226139751&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjN27jo-5X1AhXqTmwGHewIDYkQ_AUoAXoECAEQAw&biw=1242&bih=632&dpr=1.1#imgrc=A5ASbHEE4vmDAM' className='my-3 btn btn-outline-light btn-md'  className='my-3 btn btn-outline-light btn-md'>Detail Artikel <BiWorld /> </a>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                    <div className='d-flex flex-column justify-content-center'>
                            <div className='hal2 d-flex flex-column  justify-content-center align-items-center text-light'>
                                <h3 className='mt-4'>Baguette Bag</h3>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <hr width='70px' />
                                        <GiMoebiusStar className=' mx-2' />
                                    <hr width='70px' />
                                </div>
                                <div className='text-center px-4 fonn'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor ex nec ex convallis, eget dapibus purus volutpat. Vivamus nec porttitor orci, ultricies mattis orci.  
                                </div>
                                <a href='https://www.google.com/search?q=foto+tas+toraja&sxsrf=AOaemvLh9MvvZQ0S3n2S3-d8zDzgMcelHA:1641226139751&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjN27jo-5X1AhXqTmwGHewIDYkQ_AUoAXoECAEQAw&biw=1242&bih=632&dpr=1.1#imgrc=A5ASbHEE4vmDAM' className='my-3 btn btn-outline-light btn-md'  className='my-3 btn btn-outline-light btn-md'>Detail Artikel<BiWorld /> </a>

                            </div>
                            <div>
                                <img src={bag} style={{ width:'100%', height:'50%'}}  />
                            </div>
                            
                        </div>
                    </div>
                    <div className='col-md-4 d-none d-md-flex '>
                    <div className='d-flex flex-column justify-content-center'>
                            <div>
                                <img src={slem} style={{ width:'100%'}}  />
                            </div>
                            <div className='hal2 d-flex flex-column  justify-content-center align-items-center text-light'>
                                <h3 className='mt-4'>Salempang</h3>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <hr width='70px' />
                                        <GiMoebiusStar className=' mx-2' />
                                    <hr width='70px' />
                                </div>
                                <div className='text-center px-4 fonn'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor ex nec ex convallis, eget dapibus purus volutpat. Vivamus nec porttitor orci, ultricies mattis orci.  
                                </div>
                                <a href='https://www.google.com/search?q=foto+tas+toraja&sxsrf=AOaemvLh9MvvZQ0S3n2S3-d8zDzgMcelHA:1641226139751&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjN27jo-5X1AhXqTmwGHewIDYkQ_AUoAXoECAEQAw&biw=1242&bih=632&dpr=1.1#imgrc=A5ASbHEE4vmDAM' className='my-3 btn btn-outline-light btn-md'  className='my-3 btn btn-outline-light btn-md'>Detail Artikel  <BiWorld /> </a>

                            </div>
                        </div>
                    </div>
                </div>
           </div>
           <div className=" container  ">
               <div className='d-flex justify-content-center align-items-center '>
                <h1 className="popular" data-shadow='Popular Product'>Popular Product </h1>
               </div>
               <div className='row' >
               {popu}
               </div> 
           </div>
           <div>
               <video src={toraja} loop autoPlay muted className='video2' />
               <div className='container d-flex justify-content-center flex-column align-items-center'>
                   <h1 className='about' style={{ fontSize: '30px'}}>Toraja untuk semua</h1>
                   <p className='text-center p-1 px-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                   <a href='https://www.google.com/search?q=toraja&rlz=1C1UEAD_enID992ID992&oq=toraja&aqs=chrome..69i57j46i433i512j35i39l2j0i433i512j0i512j46i512j0i512l3.2599j0j7&sourceid=chrome&ie=UTF-8' className='btn btn-md btn-dark artikel text-decoration-none'>Tentang kami</a>
               </div>
           </div>
           <div className='container mt-5'>
            <div className="row">
                <div className=' col-12 col-lg-4 dip'>             
                    <img src={salem} className=' h-100 w-100  '/>
                    <div className='icoo'>
                        <a className='gmb ' href="/"><BsInstagram /> </a>        
                              
                    </div>
                   
                </div>
                <div className='col-12 col-md-4 flee'>
                    <div className='row ' >
                        <div className='dip'>
                            <img src={hand} className=' w-100 h-100 '  />
                            <div className='icoo '>
                                <a className='gmb ' href="https://www.instagram.com/laperrman/"><BsInstagram /> </a>        
                            </div>
                        </div>
                        <div className='dip'>
                            <img src={ran} className=' w-100 h-100  '  />
                            <div className='icoo'>
                                <a className='gmb ' href="https://www.instagram.com/laperrman/"><BsInstagram /> </a>        
                         </div>
                        </div>                                   
                    </div>

                </div>
                    <div className='col-12 fle dip'>
                        <img src={hand} className=' w-100 h-100 mt-2 '  />
                        <div className='icoo'>
                            <a className='gmb mt-2' href="https://www.instagram.com/laperrman/"><BsInstagram /> </a>        
                       </div>
                    </div>
                    <div className='col-12 fle dip'>
                        <img src={ran} className=' w-100 h-100 mt-3 '  />
                        <div className='icoo'>
                            <a className='gmb mt-3' href="https://www.instagram.com/laperrman/"><BsInstagram /> </a>        
                       </div>
                    </div>
                <div className='col-12 col-lg-4 dip '>
                    <img src={tote} className='h-100 w-100 mt-4 mt-lg-0 '  />
                    <div className='icoo'>
                            <a className='gmb mt-lg-0 mt-4' href="https://www.instagram.com/laperrman/"><BsInstagram /> </a>        
                       </div>
                </div>
            </div>  
            <div className='d-flex justify-content-center align-items-center'>
                <div className='bttn'>
                    <a className='asi' href='https://www.instagram.com/laperrman/'>Shop From Instagram</a>
                </div>
              
            </div>

           </div>
           



        </div>
    )
}

export default Home
