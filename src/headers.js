import React from "react";
import { Link } from "react-router-dom";

const Header =()=>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-active bg-primary ">
  <div className="container-fluid">
    <a className="navbar-brand col-lg-2 text-end text-white" ><i className="fa fa-globe"></i> <b>WebWorld</b></a>
      
    <div className="collapse navbar-collapse">
      <div className="navbar-nav">
        <Link to="/"  className="nav-link active text-white" ><i className="fa fa-weight-hanging"></i> Brands</Link>
        <Link to="/category" className="nav-link active text-white"><i className="fa fa-star-of-life"></i> Category</Link>
        <Link to="/product" className="nav-link active text-white"><i className="fa fa-bars"></i> Products</Link>
       
        
      </div>
    </div>
  </div>
</nav>
        </>
    )


}
export default Header;