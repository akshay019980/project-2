import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";



const Save=()=>{
    
const Navigate = useNavigate(); 
    const {brandid} = useParams();
const [brandname, pickBrandname] = useState("");
const [branddetails, pickBranddetails] = useState("");
const [brandaction,pickBrandaction] = useState("");


const getEdit=()=>{  
let input={ "id":brandid};
const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(input)
};
fetch('https://www.medicalplanet.in/webapi/Brand/edit', requestOptions)
.then(response => response.json())
.then(data =>{
    console.log(data)
	pickBrandname(data.brandname);
    pickBranddetails(data.details);
    pickBrandaction(data.active);
});

}
const update=()=>{
    let input={
        "brandname":brandname,
        "details": branddetails,
        "active":brandaction,
        "id":brandid
    };
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
    };
    fetch('https://www.medicalplanet.in/webapi/Brand/update', requestOptions)
    .then(response => response.text())
    .then(data => {
        console.log(data);
        swal("added succesfully...")
        Navigate("/brand")
    });

}
useEffect(()=>{
    getEdit();
    

},[1])

    return(
        <>
        <div className="container mt-5">
            <div className=" row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 card shadow p-3 mb-5 bg-body rounded border-info ">
                    <div className=" card-header  mt-4 text-center text-danger ">
                        <h2><i className="fa fa-file-pen"></i>Edit Brands</h2>
                    </div>
                    <div className="row">
                        <div className="text-primary">
                             <h5>Brand Name</h5>
                            <input className="form-control " type="text" 
                             value={brandname} onChange={obj=>pickBrandname(obj.target.value)} ></input>
                        </div>
                    </div>
                    <div>
                        <div className="text-primary">
                                <h5>Brand Details</h5>
                            <input className="form-control" type="text"
                            value={branddetails} onChange={obj=>pickBranddetails(obj.target.value)}></input>
                        </div>
                        <div className="row">
                            <div className="text-primary">
                                <h5>Action</h5>
                            </div>
                            <div>
                            <select className="form-select"
                            onChange={obj=>pickBrandaction(obj.target.value)} value={brandaction}>
                                <option>choose...</option>
                                <option>Yes</option>
                                <option>No</option>
                                
                            </select>
                            </div>
                        </div>
                        <div className="text-center">
                             <button onClick={update} className="btn btn-warning m-4">Save Updates</button> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <Link to="/brand">Previous</Link>
        </div>
        </>
    )
}
export default Save;