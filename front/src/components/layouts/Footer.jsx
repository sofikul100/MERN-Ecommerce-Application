import React from 'react'
function Footer() {
  return (
    <div>
      <div style={{ background: 'rgb(151 213 93)', width: '100%'}}>
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0">
              <h5 className="text-uppercase mt-4 text-white font-bold">Footer Content</h5>
              <p className='font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente maiores quaerat
                 voluptate debitis! Repudiandae, architecto. Quis, excepturi repudiandae. Ipsum dolorum, ex dolore modi consectetur animi maiores odit, corrupti aliquid et rem rerum quasi.
                 Esse vel maxime illum! Repellat, cupiditate placeat!</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase text-white font-bold mt-4"> Site Links </h5>
              <ul className="list-unstyled">
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Home</a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}> About Us </a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}> Shop </a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}> Blogs </a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}> Contacts </a></li>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase mt-4 font-bold text-white">Social Links</h5>
              <ul className="list-unstyled">
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Facebook</a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Instagram</a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>Youtube</a></li>
                <li><a href="#!" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}> Twitter </a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3 font-bold">© 2023 Copyright:
          <a href=""> Md Sofikul Islam </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
