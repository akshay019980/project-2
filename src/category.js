import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Header from "./headers";


const Cat = () => {
    const [category, pickCategory] = useState([]);
    const [name, pickName] = useState("");
    const [details, pickDetails] = useState("");
    const [active, pickActive] = useState("");
    const [url, pickUrl] = useState("");
    const [type, pickType] = useState("");
    const [pid, pickPid] = useState("");

    const [catid, pickCatid] = useState("");
     let[pcatid, updateCat] = useState(0) // siyaram

    const getcategory = () => {
        let input = { "pid": pcatid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/getchild', requestOptions)
            .then(response => response.json())
            .then(data => {
                pickCategory(data);
            });
    }


    useEffect(() => {
        getcategory();
        getparent();
    }, [1]);

    const save = () => {
        let input = {

            "categoryname": name,
            "categorydetails": details,
            "url": url,
            "type": type,
            "active": active,
            "pid": catid
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/save', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data)
                getcategory();
                pickName('');
                pickDetails('');
                pickActive('');
                pickUrl('');
                pickType('');
            });
    }
    const Delete = (catid) => {
        let input = { "id": catid };


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/deleteone', requestOptions)
            .then(response => response.text())
            .then(data => {
                getcategory();
            });
    }
    const [parent, pickParent] = useState([]);
    const getparent = () => {
        const url = "https://www.medicalplanet.in/webapi/Category/getparent";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                pickParent(data)
                updateCat(data[10].catid); // siyaram
            })

    }

    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(category.length / PER_PAGE);



    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-5 p-5">
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="  card-header text-center bg-secondary text-white ">
                                <label> <i className="fa fa-solid fa-plus"></i> Add Categories</label>
                            </div>
                            <div className="card-body bg-light p-3   rounded border-dark">
                                <div className="mb-2">
                                    <b><label>Category Name</label></b>
                                    <input className="form-control" type="text"
                                        value={name} onChange={obj => pickName(obj.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <b><label>Category Details</label></b>
                                    <input className="form-control" type="text"
                                        value={details} onChange={obj => pickDetails(obj.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <b><label>Category</label></b>
                                    <select className="form-select" value={catid} onChange={obj=>pickCatid(obj.target.value)}>

                                        {
                                            parent.map((pinfo, index) => {
                                                return (
                                                    <option value={pinfo.catid} key={index}>
                                                        {pinfo.categoryname}
                                                    </option>
                                                )
                                            })

                                        }
                                    </select>
                                    
                                </div>
                                <div className="mb-2">
                                    <b><label>Type</label></b>
                                    <input className="form-control" type="text"
                                        value={type} onChange={obj => pickType(obj.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <b><label>Active</label></b>
                                    <select className="form-select"
                                        value={active} onChange={obj => pickActive(obj.target.value)}>
                                        <option>choose...</option>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>
                                </div>
                                {/* <div className="mb-2">
                                    <b><label>PId</label></b>
                                    <input className="form-control" type="text"
                                    value={pid} onChange={obj=>pickPid(obj.target.value)}/>
                                </div> */}

                                <div className="mb-2">
                                    <b><label>Url</label></b>
                                    <input className="form-control" type="text"
                                        value={url} onChange={obj => pickUrl(obj.target.value)} />
                                </div>

                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-success" onClick={save}> < i className="fa fa-save"></i> Save Brand</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-9">
                        
                        <div className="row m-2">


                            <div className="col-lg-2">
                          
                                <select className="form-select" onChange={obj=>updateCat(obj.target.value)}>
                                    

                                    {
                                        parent.map((pinfo, index) => {
                                            return (
                                                <option value={pinfo.catid} key={index}>
                                                    {pinfo.categoryname}
                                                </option>
                                            )
                                        })

                                    }
                                </select>
                                <button className="btn btn-danger m-2" onClick={getcategory}><i className="fa fa-check"></i></button>

                                

                            </div>
                            
                            <div className="col-lg-4"><h5 className="text-primary text-center"> CategoryList : {category.length}</h5></div>
                            <div className="col-lg-4">
                                <input className="form-control" placeholder="search..."
                                    type="text" />
                            </div>
                            </div>
                            <div className="col-lg-12">
                                <table className="table table-hover  table-bordered  ">
                                    <thead className="bg-info text-white">
                                        <tr>
                                            <th>C Id</th>
                                            <th>Category Name</th>
                                            <th>PId</th>

                                            <th> Details</th>
                                            <th>Active</th>
                                            <th>Url</th>
                                            <th>type</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-dark shadow p-3 mb-5 bg-body rounded border border-dark">
                                        {
                                            category.slice(offset, offset + PER_PAGE).map((category, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{category.catid}</td>
                                                        <td>{category.categoryname}</td>
                                                        <td>{category.parent}</td>

                                                        <td>{category.categorydetails}</td>
                                                        <td>{category.active}</td>
                                                        <td>{category.url}</td>
                                                        <td>{category.type}</td>

                                                        <td>
                                                            <button className="btn btn-danger m-1" onClick={Delete.bind(this, category.catid)} > <i className="fa fa-trash-can"> </i>
                                                            </button>

                                                            <Link to={`/editcat/${category.catid}`} className="btn btn-warning m-1"> <i className="fa fa-pen-to-square"> </i>

                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
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
                </div>



        
        </>
    )


}
export default Cat;