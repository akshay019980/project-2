import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";


const EDitP = () =>{

   const navigate = useNavigate();

    const [brands, pickBrands] = useState([]);
    const [category, pickCategory] = useState([]);

    const {productid} = useParams();

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

    const getEdit=()=>{
             
    let input={ "id":productid};
    const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(input)
};
fetch('https://www.medicalplanet.in/webapi/Product/edit', requestOptions)
.then(response => response.json())
.then(data =>{
	console.log(data);
    pickName(data.productname);
    pickCid(data.categoryid);
    pickBid(data.brandid);
    pickPrice(data.price);
    pickQuantity(data.quantity);
    pickPhoto(data.photo);
    pickDetails(data.details);
    pickVendorid(data.vendorid);
    pickOffer(data.offer);
    pickActive(data.active);

});
    }
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
        getEdit();
        
    

    }, [1]);
    
    const getcategory = () => {    //category 
        const url = "https://www.medicalplanet.in/webapi/Category/getall";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                pickCategory(data)
            })
    }
    //update

    const getupdate=()=>{
        let input={
			"productname":name,
			"categoryid":cid,
			"brandid":bid,
			"price":price,
			"quantity":quantity,
			"photo":photo,
			"details":details,
			"vendorid":vendorid,
			"offer":offer,
			"active":active,
			"id":productid
		};
		const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input)
		};
		fetch('https://www.medicalplanet.in/webapi/Product/update', requestOptions)
		.then(response => response.text())
		.then(data => {
			console.log(data);
            
		});
        navigate('/product')
    }
    

    return(
        <>
        <div className="container">
            
            <div className="row mt-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-header text-center text-danger">
                        <label><b>Update Product</b></label>
                    </div>
                    <div className="card-body shadow p-3 bg-body rounded border-dark">
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
                                <div className="card-footer m-2 text-center">
                                    <button className="btn btn-success " onClick={getupdate}>Update Product</button>

                                </div>

                    </div>
                </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
        </>
    )


}
export default EDitP;