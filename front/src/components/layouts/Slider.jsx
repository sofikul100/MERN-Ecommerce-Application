import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import slider1 from "../../images/slider1.png";
import slider2 from "../../images/slider2.png";
import slider3 from "../../images/slider3.png"
import Button from 'react-bootstrap/Button';
export default function Slider() {
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        id="slider_image"
                        style={{height:'350px',position:'relative'}}
                        className="d-block w-100"
                        src={slider1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                    
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        style={{height:'350px'}}
                        className="d-block w-100"
                        src={slider2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{height:'350px'}}
                        className="d-block w-100"
                        src={slider3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>
            <div style={{position:'absolute',background:'#000000bf',width:"100%",height:'350px',top:'126px',}}>
                <div className='flex-col m-auto text-center' id="slider_title">
                     <h2 className='text-white' style={{fontFamily:'Merienda'}}>Welcome To Our SolPalneT ShoP.</h2>
                     <p className='text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim alias sequi itaque hic quisquam quam?</p>
                     <Button   className='text-white' id="shop_button"> Shop Now </Button>
                </div>
            </div>
        </>
    )
}
