import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { nanoid } from "nanoid";
import swal from "sweetalert";
//** Import SVG Image */
import {
  Icon01,
  Icon02,
  Icon03,
  Icon04,
  Icon05,
  Icon06,
  Icon07,
  Icon08,
  Icon09,
  Icon10,
  Icon11,
  Icon12,
} from "../Companies/CompaniesIcons";
import SingleQuote from "../Companies/SingleQuote";
import PageTitle from "../../../layouts/PageTitle";
import { handleKeyTranslation, handleAddQuotaToDb } from "../../../../mylib";

import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  SplitButton,
} from "react-bootstrap";

const Companies = () => {
  // const CompaniesData = [
  //     {
  //         icon: Icon01,
  //         title: "Simonis Ltd",
  //         description: "Internet Service Porvider",
  //     },
  //     {
  //         icon: Icon02,
  //         title: "Funk Inc",
  //         description: "IT Department",
  //     },
  //     {
  //         icon: Icon03,
  //         title: "Highspeed Studios",
  //         description: "Creative Design Agency",
  //     },
  //     {
  //         icon: Icon04,
  //         title: "Mosciski Inc",
  //         description: "Creative Design Agency",
  //     },
  //     {
  //         icon: Icon05,
  //         title: "Incubator Studios",
  //         description: "Software House",
  //     },
  //     {
  //         icon: Icon06,
  //         title: "Naonatu Inc.",
  //         description: "Creative Design Agency",
  //     },
  //     {
  //         icon: Icon07,
  //         title: "ColoColo Studios",
  //         description: "Internet Service Porvider",
  //     },
  //     {
  //         icon: Icon08,
  //         title: "Funk Inc",
  //         description: "IT Department",
  //     },
  //     {
  //         icon: Icon09,
  //         title: "Mosciski Inc",
  //         description: "Creative Design Agency",
  //     },
  //     {
  //         icon: Icon10,
  //         title: "Highspeed Studios",
  //         description: "Creative Design Agency",
  //     },
  //     {
  //         icon: Icon11,
  //         title: "Simonis Ltd",
  //         description: "Internet Service Porvider",
  //     },
  //     {
  //         icon: Icon12,
  //         title: "Funk Inc",
  //         description: "IT Department",
  //     },
  // ];

  const [contents, setContents] = useState([]);
  const [CompaniesData, setCompaniesData] = useState([]);
  const [reload, setReload] = useState(false);
  const STATUS = [
    {
      id: "0",
      status: "Neaktivan",
    },
    {
      id: "1",
      status: "Aktivan",
    },
  ];

  useEffect(() => {
    const path = window.location.pathname;
    const pathToArr = path.split("/");
    const selected = pathToArr[pathToArr.length - 1].slice(0, -1) + "a";

    fetch(`http://localhost:4000/getQuota`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => setCompaniesData(data), 200);
      });
  }, [reload]);

  //Modal box
  const [addCard, setAddCard] = useState(false);
  //Add data
  const [addFormData, setAddFormData] = useState({
    FirmId: "",
    QuotaFinal: "",
    IntershipId: "",
    QuotaMaxPlan: "",
    QuotaStartNumber: "",
    DescriptionOfQuotaCondition: "",
    IsActive: "",
    Comments: "",
  });

  // Add contact function
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    console.log(fieldValue);
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  //Add Submit data
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    console.log(addFormData);
    for (const [key, val] of Object.entries(addFormData)) {
      addFormData[key] = val.replace(",", " - ");
    }
    var error = false;
    var errorMsg = "";

    const formValues = Object.entries(addFormData);

    for (const [key, value] of formValues) {
      if (!error) {
        if (value === "") {
          error = true;
          errorMsg = `Molimo unesite ${handleKeyTranslation(key)}!`;
        }
      }
    }

    if (!error) {
      const newContent = {
        id: nanoid(),

        FirmId: "",
        QuotaFinal: "",
        IntershipId: "",
        QuotaMaxPlan: "",
        QuotaStartNumber: "",
        DescriptionOfQuotaCondition: "",
        IsActive: "",
        Comments: "",
      };

      handleAddQuotaToDb(addFormData);
      // .then((response) => {
      //     if (response === "OK") {
      //         const newContents = [...contents, newContent];
      //         setContents(newContents);
      //         setAddCard(false);
      //         swal("Odli??no!", "Uspje??no dodan", "success");
      //         addFormData.name =
      //             addFormData.department =
      //             addFormData.gender =
      //             addFormData.education =
      //             addFormData.mobile =
      //             addFormData.email =
      //                 "";
      //     } else {
      //         swal("Oops", response, "error");
      //     }
      // });

      const newContents = [...contents, newContent];
      setContents(newContents);
      setReload(!reload);
      setAddCard(false);
      swal("Odli??no!", "Uspje??no dodan", "success");
    } else {
      swal("Oops", errorMsg, "error");
    }
  };

  //Edit start
  //const [editModal, setEditModal] = useState(false);
  // Edit function editable page loop
  const [editContentId, setEditContentId] = useState(null);

  // Edit function button click to edit
  const handleEditClick = (event, content) => {
    event.preventDefault();
    setEditContentId(content.id);
    const formValues = {
      FirmId: "FirmId",
      IntershipFirmQuataId: "IntershipFirmQuataId",
      QuotaFinal: "QuotaFinal",
      IntershipId: "IntershipId",
      QuotaMaxPlan: "QuotaMaxPlan",
      QuotaStartNumber: "QuotaStartNumber",
      DescriptionOfQuotaCondition: "DescriptionOfQuotaCondition",
      IsActive: "IsActive",
      Comments: "Comments",
    };
    setEditFormData(formValues);
    //setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    FirmId: "FirmId",
    IntershipFirmQuataId: "IntershipFirmQuataId",
    QuotaFinal: "QuotaFinal",
    IntershipId: "IntershipId",
    QuotaMaxPlan: "QuotaMaxPlan",
    QuotaStartNumber: "QuotaStartNumber",
    DescriptionOfQuotaCondition: "DescriptionOfQuotaCondition",
    IsActive: "IsActive",
    Comments: "Comments",
  });

  //update data function
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  // edit form data submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContent = {
      id: editContentId,
      name: editFormData.name,
      department: editFormData.department,
      gender: editFormData.gender,
      education: editFormData.education,
      mobile: editFormData.mobile,
      email: editFormData.email,
    };
    const newContents = [...contents];
    const index = contents.findIndex((content) => content.id === editContentId);
    newContents[index] = editedContent;
    setContents(newContents);
    setEditContentId(null);
    // setEditModal(false);
  };
  //Cencel button to same data
  const handleCancelClick = () => {
    setEditContentId(null);
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Quote" motherMenu="Pregled" />
      <div
        className="page-titles"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <h4 className="">Dodaj kvotu</h4>
        <Link
          to="#"
          className="btn btn-primary shadow btn-xs sharp mr-2"
          onClick={() => setAddCard(true)}
        >
          <i className="fa fa-plus"></i>
        </Link>
      </div>
      <Modal className="modal fade" show={addCard} onHide={setAddCard}>
        <div className="" role="document">
          <div className="">
            <form
              style={{
                height: "90vh",
                "overflow-y": "scroll",
              }}
            >
              <div className="modal-header">
                <h4 className="modal-title fs-20">Dodaj kvotu</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddCard(false)}
                  data-dismiss="modal"
                >
                  <span>Close</span>
                </button>
              </div>
              <div className="modal-body">
                <i className="flaticon-cancel-12 close"></i>
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        QuotaMaxPlan
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="QuotaMaxPlan"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="QuotaMaxPlan"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        QuotaStartNumber
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="QuotaStartNumber"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="QuotaStartNumber"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">FirmId</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="FirmId"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="FirmId"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">QuotaFinal</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="QuotaFinal"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="QuotaFinal"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        IntershipId
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="IntershipId"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="IntershipId"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        DescriptionOfQuotaCondition
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="DescriptionOfQuotaCondition"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="DescriptionOfQuotaCondition"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="active-name">
                        <label className="text-black font-w500">
                          Aktivnost
                        </label>
                        <DropdownButton
                          alignRight
                          title={
                            addFormData?.IsActive !== ""
                              ? STATUS.at(addFormData.IsActive).status
                              : "Aktivnost"
                          }
                          id="dropdown-menu-align-right"
                          onSelect={(selected) =>
                            setAddFormData({
                              ...addFormData,
                              IsActive: selected,
                            })
                          }
                        >
                          {STATUS.map((status) => (
                            <Dropdown.Item id={status.id} eventKey={status.id}>
                              {status.status}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Comments</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="Comments"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Comments"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddFormSubmit}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setAddCard(false)}
                  className="btn btn-danger"
                >
                  {" "}
                  <i className="flaticon-delete-1"></i> Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div className="col-xl-9 col-xxl-8">
          <div className="row">
            <div className="col-xl-12">
              <div className="d-flex pb-3 mb-4 border-bottom flex-wrap align-items-center">
                <Link
                  to="#"
                  className="btn btn-primary light btn-rounded mr-2 mb-2"
                >
                  Suggestions
                </Link>
                <Link
                  to="#"
                  className="btn btn-primary light btn-rounded mr-2 mb-2"
                >
                  Your Skill
                </Link>
                <Link to="#" className="btn btn-primary btn-rounded mr-2 mb-2">
                  Programmer
                </Link>
                <Link
                  to="#"
                  className="btn btn-primary light btn-rounded mr-2 mb-2"
                >
                  Software Engineer
                </Link>
                <Link
                  to="#"
                  className="btn btn-primary light btn-rounded mr-2 mb-2"
                >
                  Photographer
                </Link>
                <Link
                  to="#"
                  className="btn btn-primary light btn-rounded mr-2 mb-2"
                >
                  Digital Marketing
                </Link>
              </div>
              <div className="d-flex flex-wrap align-items-center mb-4">
                <div className="mr-auto mb-2 pr-2">
                  <h6 className="text-black fs-16 font-w600 mb-1">
                    Trenutno ima 247 poslova
                  </h6>
                  <span className="fs-14">Prema tvojim vrijednostima</span>
                </div>
              </div>
            </div>
            {/* Map Single Job Companies Data */}
            {CompaniesData.map((company, i) => (
              <SingleQuote
                key={i}
                setReload={setReload}
                reload={reload}
                company={company}
              ></SingleQuote>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Companies;
