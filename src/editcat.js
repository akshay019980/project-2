import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Catedit = () => {
    const { catid } = useParams();
    const Navigate = useNavigate();
    const [name, pickCategoryname] = useState("");
    const [details, pickCategorydetails] = useState("");
    const [active, pickActive] = useState("");
    const [url, pickUrl] = useState("");
    const [type, pickType] = useState("");
    const [pid, pickPid] = useState(0);


    const edit = () => {


        let input = { "id": catid };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                pickCategoryname(data.categoryname);
                pickCategorydetails(data.categorydetails);
                pickType(data.type);
                pickPid(data.pid);
                pickUrl(data.url);
                pickActive(data.active);
            });

    }
    const update = () => {
        let input = {
            "categoryname":name,
            "categorydetails": details,
            "url": url,
            "type": type,
            "active": active,
            "pid": pid,
            "id":catid
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://www.medicalplanet.in/webapi/Category/update', requestOptions)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                Navigate("/category")

            });
    }
    useEffect(() => {
        edit();
    }, [1]);
    return (
        <>
            <div className="container">
                <div className="row mt-5" >
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header text-center text-dark bg-primary">
                                <b><i className="fa fa-pen-to-square"></i> Update Category</b>
                            </div>
                            <div className="card-body shadow p-3 mb-4nbg-body rounded border-dark">
                                <div className="mb-2">
                                    <label>Category Name</label>
                                    <input className="form-control" type="text"
                                        value={name} onChange={obj => pickCategoryname(obj.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label>Category Details</label>
                                    <input className="form-control" type="text"
                                        value={details} onChange={obj => pickCategorydetails(obj.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label>Category Type</label>
                                    <input className="form-control" type="text"
                                        value={type} onChange={obj => pickType(obj.target.value)} />

                                </div>
                                <div className="mb-2">
                                    <label>Category Active</label>
                                    <select className="form-select"
                                        value={active} onChange={obj => pickActive(obj.target.value)}>
                                        <option>choose...</option>
                                        <option>YES</option>
                                        <option>NO</option>

                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label>Category Url</label>
                                    <input className="form-control" type="text"
                                        value={url} onChange={obj => pickUrl(obj.target.value)} />
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-success" onClick={update}>Update Edit</button>
                            </div>


                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </>
    )


}

export default Catedit;