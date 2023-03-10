import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const SingleCompani = (props) => {
  const CITIES = [
    {
      id: "1",
      name: "Split",
    },
    {
      id: "2",
      name: "Zadar",
    },
    {
      id: "3",
      name: "Dubrovnik",
    },
    {
      id: "4",
      name: "Zagreb",
    },
  ];

  const FIRM_TYPES = [
    {
      id: "1",
      type: "Mala",
    },
    {
      id: "2",
      type: "Velika",
    },
  ];

  const {
    Name,
    Description,
    QuotaFinal,
    InternshipFirmQuataId,
    FirmId,
    FirmTypeID,
    CityId,
  } = props.company;
  console.log(FirmId);
  const handleDeleteClick = () => {
    props.setReload(!props.reload);
    fetch(`http://localhost:4000/deleteuser?role=firma&id=${FirmId}`);
  };



  const [addCard, setAddCard] = useState(false);
  const [cardFirmsId, setCardFirmsId] = useState(null);

  // Add contact function
  const handleAddFormChange = (event) => {};

  //Add Submit data
  const handleAddFormSubmit = (event) => {};
  return (
    <div className="col-xl-3 col-xxl-4 col-md-4 col-sm-6">
      <div className="card text-center">
        <div className="card-body">
          <h6 className="font-w600 text-black fs-16 mb-1">{Name}</h6>
          <span className="fs-14">{Description}</span>
          <br></br>

          <span className="fs-14">ID: {FirmId}</span>
          <br></br>
          <span className="fs-14">
            Velicina firme: {FIRM_TYPES.at(FirmTypeID - 1).type}
          </span>
          <br></br>
          <span className="fs-14">Grad: {CITIES.at(CityId - 1).name}</span>

          <div className="d-flex" style={{ paddingTop: "20px" }}>
            {/* <Link
                            style={{ float: "right" }}
                            className='btn btn-secondary  shadow btn-xs sharp mr-2'>
                            <i className='fa fa-pencil'></i>
                        </Link> */}
            <Link to={`/admin/firma/${FirmId}`}> Edit </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCompani;
