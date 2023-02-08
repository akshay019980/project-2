import React,{useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Header from "./headers";



const Brand = () =>{

    let [keyword,setKeyword] = useState("");
     const [brands,pickBrand] = useState([]);
     const [brandname,pickBrandname] = useState("");
    const [branddetails,pickBranddetails] = useState("");
     const [brandaction,pickBrandaction] = useState("");


    
    const getbrand=()=>{
     
        fetch("https://www.medicalplanet.in/webapi/Brand/getall")
        .then(response=>response.json())
		.then(data=>{
			pickBrand(data)
			})
        }
        useEffect(()=>{
            getbrand();
            
        },[1]);

        const save = () =>{

            let input={
                "brandname":brandname,
                "details":branddetails,
                "active":brandaction
            };
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
            };
            fetch('https://www.medicalplanet.in/webapi/Brand/save', requestOptions)
            .then(response => response.text())
            .then(data => {
                getbrand();
                pickBrandname('');
                pickBranddetails('');
                pickBrandaction('');
            });
        }

        const Delete = (ditid) =>{
            let input={ "id":ditid};
const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(input)
};
fetch('https://www.medicalplanet.in/webapi/Brand/deleteone', requestOptions)
.then(response => response.text())
.then(data =>{
	alert(data);
});

 }
 const PER_PAGE = 5;
 const [currentPage, setCurrentPage] = useState(0);
 function handlePageClick({ selected: selectedPage }) {
     setCurrentPage(selectedPage)
 }
 const offset = currentPage * PER_PAGE;
 const pageCount = Math.ceil(brands.length / PER_PAGE);




    return(
        <>
        <Header/>
        <div className="container ">
           
            <div className="row mt-5">
                
                
                <div className="col-lg-3">
                 
                    <div className="card mt-4">
                        <div className="card-header bg-info text-white text-center">
                            <b><i className="fa fa-plus"></i> Add New Brand</b>
                        </div>
                        <div className="card-body  shadow p-3 bg-body rounded border-dark">
                             <div>
                                <label className=" m-2">
                                   <b> Brand Name </b>
                                </label>
                                <input className="form-control" type="text"
                                 value={brandname} onChange={obj => pickBrandname(obj.target.value)}> 


                                </input>
                             </div>
                             <div className="row">
                                <div>
                                    <label className="m-2">
                                        <b>Brand Details </b>
                                    </label>
                                    <input className="form-control" type="text"
                                    value={branddetails} onChange={obj=>pickBranddetails(obj.target.value)}
                                    ></input>

                                </div>  
                             </div>
                             <div className="row">
                                    <div >
                                        <label className="m-2">
                                            <b>Active</b>
                                        </label>
                                        
                                            <select className="form-select "
                                            value={brandaction} onChange={obj=>pickBrandaction(obj.target.value)}>     
                                                <option>coose...</option>
                                                <option>YES</option>
                                                <option>NO</option>
                                            </select>
                                        
                                    </div>
                                </div>
                                <div className=" card-footer row m-2 ">
                                    <div className="col-lg-10  text-center">
                                        <button className="btn btn-success" onClick={save}><i className="fa fa-bookmark"></i> Save Brand</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="row  d-flex flex-row-reverse">
                    <div className="col-lg-3 ">
                             <input className="form-control" placeholder="search..."
                              type="text" onChange={obj=>setKeyword(obj.target.value)}></input>
                           
                    </div>
                    </div>

                    <h5 className="text-center text-danger">Brand List : {brands.length}</h5>
                    <table className="table table-table table-bordered table-hover">
                        <thead className="bg-danger text-white">
                            <tr>
                                <th>Brand Id</th>
                                <th>Brand Name</th>
                                <th>Brand Details</th>
                                <th>Active</th>
                                
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody  className="text-dark shadow p-3 mb-5 bg-body rounded border border-dark">
                        {
                              brands.filter(post => {
                                if((post.brandname.toLowerCase().includes(keyword.toLowerCase()))){
                                    return post;
                                }                            
                                }).slice(offset,offset + PER_PAGE).map((brand,index)=>{
                                return (<tr key={index}>
                                    <td>{brand.brandid}</td>
                                    <td>{brand.brandname}</td>
                                    <td>{brand.details}</td>
                                    <td>{brand.active}</td>
                                     <td>
                                        <button className="btn btn-danger m-2" onClick={Delete.bind(this,brand.brandid)}><i className="fa fa-trash"></i> 
                                        
                                        
                                        </button>
                                        <Link  to={`/save/${brand.brandid}`} className="btn btn-warning m-2"><i className="fa fa-pen"></i>
                                           
                                        </Link>
                                    </td> 
                                    

                                </tr>)
                              })
                            }
                        </tbody>
                    </table>
                    <div className="mb-4 mt-4 text-center">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )


}
export default Brand;