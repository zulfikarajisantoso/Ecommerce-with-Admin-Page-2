import React from 'react'
import {BsInstagram, BsTwitter, BsFillTelephoneInboundFill} from 'react-icons/bs'
import tora from '../../images/aaaaa.jpg'
import torajaa from '../../images/torajaa.jpg'

import {FaPinterestP, FaFacebookF} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai'
import {SiGooglemaps} from 'react-icons/si'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Footer = () => {
    return (
        <div className='mt-5' style={{  backgroundColor:' rgb(53, 43, 43)'}}>
            <div className='container'>
            <div className='row  '>
                <div className='col-lg-4 align-items-start d-flex flex-column justify-content-center  '>
                    <h6 className='text-light ff mt-4 mt-lg-0' >BE PART OF OUR JOURNEY</h6>
                    <div className=' d-flex align-items-center mt-3 ff1'>
                        <input placeholder='Enter Your Email' className='in p-1' />
                        <button className=' font-monospace f1 ' style={{ width:'90px', height:'26px',marginLeft:'10px'}}>SUBS!</button>
                    </div>
                    <div className=' d-flex mt-2'>
                        <a href='' className='icc text-decoration-none'><FaPinterestP /></a>                 
                        <a href='' className='icc mx-3 '><BsInstagram /></a>                 
                        <a href='' className='icc '><BsTwitter /></a>                 
                        <a href='' className='icc mx-3  '><FaFacebookF /></a>  
                    </div>
                    <div className='mt-4'>
                        <h4 className='text-light ff' >STORAJA.</h4>
                        <p className='text-light' >Semua Tentang Toraja</p>
                    </div>
                           
                </div>
                <div className='col-lg-3 d-none d-lg-flex'>
                    <img src={tora} className='fot '  width= '200px'  />
                </div>
                <div className='col-lg-3 d-lg-none'>
                    <img src={torajaa} className='fot '  width= '100%'  />
                </div>
                <div className=' col-lg-3  text-light d-flex flex-column pt-5 '>
                    <h6 className='foot text-start ml4'>Info</h6>
                    <div className=' d-flex flex-column align-items-start ' >
                        <p><BsFillTelephoneInboundFill /> | +62824129374</p>
                        <p><AiOutlineMail /> | storaja@gmail.com</p>
                        <p><SiGooglemaps /> | Jl.pattimura no.03 Makale, Sulawesi Selatan, Indonesia</p>
                    </div>
                </div>
                <div className='col-lg-2 text-light d-flex flex-column pt-5  '>
                    <h6 className='foot '>Category</h6>
                    <Link to="collection/Handbag" className="text-decoration-none text-light mb-2">Handbag</Link>
                    <Link to="collection/Totebag" className="text-decoration-none text-light mb-2" >Totebag</Link>
                    <Link to="collection/Salempang" className="text-decoration-none text-light mb-2" >Salempang</Link>
                    <Link to="" className="text-decoration-none text-light" >Ransel</Link>
                    
                </div>      
            </div>
            
            </div>
            
        </div>
    )
}

export default Footer
