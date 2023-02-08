import React, { useState, useEffect } from "react";
import Header from "./headers";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";


const Product = () => {
    const [brands, pickBrands] = useState([]);
    const [category, pickCategory] = useState([]);
    const [product, pickProduct] = useState([]);

    const [name, pickName] = useState("");
    const [cid, pickCid] = useState("");
    const [bid, pickBid] = useState("");
    const [price, pickPrice] = useState("");
    const [quantity, pickQuantity] = useState("");
    const [photo, pickPhoto] = useState("");
    const [details, pickDetails] = useState("");
    const [vendorid, pickVendorid] = useState("");
    const [offer, pickOffer] = useState("");
    const [active, pickActive] = useState("");



    const getbrand = () => {  //brand 

        fetch("https://www.medicalplanet.in/webapi/Brand/getall")
            .then(response => response.json())
            .then(data => {
                pickBrands(data)
            })
    }
    useEffect(() => {
        getbrand();
        getcategory();
        getproduct();

    }, [1]);

    const getcategory = () => {    //category 
        const url = "https://www.medicalplanet.in/webapi/Category/getall";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                pickCategory(data)
            })
    }
    const getproduct = () => {           //product
        const url = "https://www.medicalplanet.in/webapi/Product/getall";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                pickProduct(data)
            })
    }
    //pagination
    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(product.length / PER_PAGE);
    //save

    const save = () => {

        let input = {
            "productname": name,
            "categoryid": cid,
            "brandid": bid,
            "price": price,
            "quantity": quantity,
            "photo": photo,
            "details": details,
            "vendorid": vendorid,
            "offer": offer,
            "active": active
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Product/save', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                getproduct(data);
                pickName('');
                pickCid('');
                pickBid('');
                pickPrice('');
                pickQuantity('');
                pickPhoto('');
                pickDetails('');
                pickVendorid('');
                pickOffer('');
                pickActive('');

            });
        }

            //delet
            const Delete=(delid)=>{
                let input={ "id":delid};
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(input)
                };
                fetch('https://www.medicalplanet.in/webapi/Product/deleteone', requestOptions)
                .then(response => response.text())
                .then(data =>{
                    getproduct(data);
                });

            }
    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-5 ">
                    <div className="col-lg-2">
                        <div className="card">
                            <div className="card-header bg-info  text-white text-center">
                                <b><i className="fa fa-plus"></i> Add Products</b>
                            </div>
                            <div className="card-body   shadow p-3 bg-body rounded border-dark">
                                <div className="m-2">
                                    <label>Product Name</label>
                                    <input className="form-control" type="text"
                                    value={name} onChange={obj=>pickName(obj.target.value)} />
                                </div>
                                <div className="m-2">
                                    <label>Category Id</label>
                                    <select className="form-select"
                                    value={cid} onChange={obj=>pickCid(obj.target.value)}>
                                        {
                                            category.map((category, index) => {
                                                return (
                                                    <option value={category.catid} key={index}>
                                                        {category.categoryname}

                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="m-2">
                                    <label>Brand Id</label>
                                    <select className="form-select"
                                    value={bid} onChange={obj=>pickBid(obj.target.value)}>
                                        {
                                            brands.map((brand, index) => {
                                                return (
                                                    <option value={brand.brandid} key={index}>
                                                        {brand.brandname}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="m-2">
                                    <label>Price</label>
                                    <input className="form-control" type="text"
                                     value={price} onChange={obj=>pickPrice(obj.target.value)}/>
                                </div>
                                <div className="m-2">
                                    <label>Quantity</label>
                                    <input className="form-control" type="text" 
                                    value={quantity} onChange={obj=>pickQuantity(obj.target.value)}/>
                                </div>
                                <div className="m-2">
                                    <label>Photo</label>
                                    <input className="form-control" type="text"
                                    value={photo} onChange={obj=>pickPhoto(obj.target.value)} />
                                </div>
                                <div className="m-2">
                                    <label>Details</label>
                                    <input className="form-control" type="text" 
                                    value={details} onChange={obj=>pickDetails(obj.target.value)}/>
                                </div>
                                <div className="m-2">
                                    <label>Vendorid ID</label>
                                    <select className="form-select"
                                    value={vendorid} onChange={obj=>pickVendorid(obj.target.value)}>
                                        <option>coose</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div className="m-2">
                                    <label>Offer</label>
                                    <input className="form-control" type="text" 
                                    value={offer} onChange={obj=>pickOffer(obj.target.value)}/>
                                </div>
                                <div className="m-2">
                                    <label>Active</label>
                                    <select className="form-select"
                                    value={active} onChange={obj=>pickActive(obj.target.value)}>
                                        <option>choose</option>
                                        <option>YES</option>
                                        <option>NO</option>
                                    </select>

                                </div>
                                <div className="card-footer text-center m-2">
                                    <button className="btn btn-success" onClick={save}>Save Product</button>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-1"></div>  */}
                    <div className="col-lg-10">
                    <h5 className="text-primary text-center"> Product List : {product.length}</h5>
                        <div className="col-lg-12">

                            <table className=" table table-hover  table-bordered ">
                                <thead className="bg-danger text-white">
                                    <tr>
                                        <th>Pid</th>
                                        <th>Product Name</th>
                                        <th>Cid</th>
                                        <th>Bid</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Photo</th>
                                        <th>Details</th>
                                        <th>Vid</th>
                                        <th>Offer</th>
                                        <th>Active</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.slice(offset, offset + PER_PAGE)
                                            .map((product,index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{product.productid}</td>
                                                        <td>{product.productname}</td>
                                                        <td>{product.categoryid}</td>
                                                        <td>{product.brandid}</td>
                                                        <td>{product.price}</td>
                                                        <td>{product.quantity}</td>
                                                        <td><img src={product.photo} width="100" height="80"/></td>
                                                        <td>{product.details}</td>
                                                        <td>{product.vendorid}</td>
                                                        <td>{product.offer}</td>
                                                        <td>{product.active}</td>
                                                        <td>
                                                            <button className="btn btn-danger m-2" onClick={Delete.bind(this,product.productid)}> <i className="fa fa-trash-can"></i></button>
                                                            <Link to={`/editproduct/${product.productid}`} className="btn btn-warning "> <i className="fa fa-pen-to-square"></i></Link>
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
export default Product;