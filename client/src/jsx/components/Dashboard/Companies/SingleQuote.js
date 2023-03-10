import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";


const SingleCompani = (props) => {
    const { Name, Description, QuotaFinal,QuotaStartNumber, QuotaMaxPlan, DescriptionOfQuotaCondition, isActive, Comments, IntershipFirmQuataId,  FirmId } = props.company;
    console.log(props);
    const handleDeleteClick = () => {
        props.setReload(!props.reload);
        fetch(`http://localhost:4000/deleteQuote?id=${IntershipFirmQuataId}`);
    };

    const [addCard, setAddCard] = useState(false);
    const [cardFirmsId, setCardFirmsId] = useState(null);

    // Add contact function
    const handleAddFormChange = (event) => {
        
    };

    //Add Submit data
    const handleAddFormSubmit = (event) => {
        
    };
    return (
        <div className='col-xl-3 col-xxl-4 col-md-4 col-sm-6'>
            <div className='card text-center'>
                <div className='card-body'>
                    <h6 className='font-w600 text-black fs-16 mb-1'>{Name}</h6>
                    <span className='fs-14'>{Description}</span>
                    <br></br>
                    <br></br>
                    <span className='fs-14'>Max kvota: {QuotaMaxPlan}</span>
                    <br></br>
                    <span className='fs-14'>Početna kvota: {QuotaStartNumber}</span>
                    <br></br>
                    <span className='fs-14'>Finalna kvota: {QuotaFinal}</span>
                    <br></br>
                    <span className='fs-14'>Uvjeti za prijavu: {DescriptionOfQuotaCondition}</span>
                    <br></br>
                    <span className='fs-14'>Aktivnost: {isActive}</span>
                    <br></br>
                    <span className='fs-14'>Komentari: {Comments}</span>

                    <div className='d-flex' style={{ paddingTop: "20px" }}>
                        {/* <Link
                            style={{ float: "right" }}
                            className='btn btn-secondary  shadow btn-xs sharp mr-2'>
                            <i className='fa fa-pencil'></i>
                        </Link> */}
                        
                        <Link to={`/admin/quote/${IntershipFirmQuataId}`}> Edit </Link>
                        <p onClick={()=> handleDeleteClick()}> Delete  </p>


                       
                    
                    </div>
                </div>
            </div>

    
        </div>

    );
};

export default SingleCompani;