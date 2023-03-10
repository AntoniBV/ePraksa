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
} from "./CompaniesIcons";
import SingleCompani from "./SingleCompani";
import PageTitle from "../../../layouts/PageTitle";
import { handleKeyTranslation, handleAddUserToDb } from "../../../../mylib";
import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  SplitButton,
} from "react-bootstrap";

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substring(0, 10);

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

  const [InternshipsTypes, setInternshipsTypes] = useState([]);
  const [selectedInternshipTypes, setSelectedInternshipType] = useState();

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

  useEffect(() => {
    const path = window.location.pathname;
    const pathToArr = path.split("/");
    const selected = pathToArr[pathToArr.length - 1].slice(0, -1) + "a";

    fetch(`http://localhost:4000/getusers?role=${selected}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => setCompaniesData(data), 200);
      });

    fetch(`http://localhost:4000/getinternships`)
      .then((response) => response.json())
      .then((data) => {
        /*const names = {};
        data.forEach((Internships) => {
          names[Internships.InternshipId] = Internships.Name;
        });*/
        setInternshipsTypes(data);
      });
  }, [reload]);

  //Modal box
  const [addCard, setAddCard] = useState(false);
  //Add data
  const [addFormData, setAddFormData] = useState({
    Name: "",
    Description: "",
    FirmTypeID: "",
    CityId: "",
    Street: "",
    StreetNumber: "",
    PostalNumber: "",
    selectedInternshipTypes: "",
    CreationDateTime: "",
  });

  const handleSetInternshipTypes = (e) => {
    const parsed = JSON.parse(e);
    setAddFormData({
      ...addFormData,
      selectedInternshipTypes: parsed.internshiptypename,
    });
    setSelectedInternshipType(parsed.internshiptypename);
  };

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

        Name: "",
        Description: "",
        FirmTypeID: "",
        CityId: "",
        Street: "",
        StreetNumber: "",
        PostalNumber: "",
        selectedInternshipTypes: "",
        CreationDateTime: "",
      };

      handleAddUserToDb(addFormData, "Firms");
      // .then((response) => {
      //     if (response === "OK") {
      //         const newContents = [...contents, newContent];
      //         setContents(newContents);
      //         setAddCard(false);
      //         swal("Odlično!", "Uspješno dodan", "success");
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
      swal("Odlično!", "Uspješno dodan", "success");
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
      Name: "Name",
      Description: "Description",
      Street: "Street",
      StreetNumber: "StreetNumber",
      PostalNumber: "PostalNumber",
      CreationDateTime: "CreationDateTime",
      selectedInternshipTypes: "InternshipTypes",
      CityId: "",
      FirmTypeID: "",
    };
    setEditFormData(formValues);
    //setEditModal(true);
  };

  // edit  data
  const [editFormData, setEditFormData] = useState({
    Name: "Name",
    Description: "Description",
    FirmTypeID: "FirmTypeID",
    Street: "Street",
    StreetNumber: "StreetNumber",
    PostalNumber: "PostalNumber",
    selectedInternshipTypes: "InternshipTypes",
    CreationDateTime: "CreationDateTime",
    CityId: "CityId",
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
      <PageTitle activeMenu="Firme" motherMenu="Pregled" />
      <div
        className="page-titles"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <h4 className="">Dodaj firmu</h4>
        <Link
          to="#"
          className="btn btn-primary shadow btn-xs sharp mr-2"
          onClick={() => setAddCard(true)}
        >
          <i className="fa fa-plus"></i>
        </Link>

        <Link to={`/admin/quote`}> Kvote </Link>
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
                <h4 className="modal-title fs-20">Dodaj firmu</h4>
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
                      <label className="text-black font-w500">Name</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="Name"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Name"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        Description
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="Description"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Description"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Street</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="Street"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="Street"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        StreetNumber
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="StreetNumber"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="StreetNumber"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        PostalNumber
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autocomplete="off"
                          name="PostalNumber"
                          required="required"
                          onChange={handleAddFormChange}
                          placeholder="PostalNumber"
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">
                        Datum kreiranja
                      </label>
                      <div className="contact-name">
                        <input
                          type="date"
                          className="form-control"
                          autocomplete="off"
                          name="CreationDateTime"
                          required="required"
                          //defaultValue={date}
                          min={date}
                          max={date}
                          readOnly=""
                          onChange={handleAddFormChange}
                        />
                        <span className="validation-text"></span>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-black font-w500">Tip prakse</label>
                      <div className="contact-name">
                        <DropdownButton
                          alignRight
                          onChange={handleAddFormChange}
                          title={selectedInternshipTypes || "Tip prakse"}
                          id="dropdown-menu-align-right"
                          onSelect={handleSetInternshipTypes}
                        >
                          {InternshipsTypes.map((InternshipType) => (
                            <Dropdown.Item
                              eventKey={JSON.stringify({
                                internshiptypename:
                                  InternshipType.InternshipType,
                              })}
                            >
                              {InternshipType.InternshipType}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="active-name">
                        <label className="text-black font-w500">Grad</label>
                        <DropdownButton
                          alignRight
                          title={
                            addFormData.CityId !== ""
                              ? CITIES.at(addFormData.CityId - 1).name
                              : "Grad"
                          }
                          id="dropdown-menu-align-right"
                          onSelect={(selected) =>
                            setAddFormData({
                              ...addFormData,
                              CityId: selected,
                            })
                          }
                        >
                          {CITIES.map((status) => (
                            <Dropdown.Item id={status.id} eventKey={status.id}>
                              {status.name}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="active-name">
                        <label className="text-black font-w500">
                          Tip firme
                        </label>
                        <DropdownButton
                          alignRight
                          title={
                            addFormData.FirmTypeID !== ""
                              ? FIRM_TYPES.at(addFormData.FirmTypeID - 1).type
                              : "Tip firme"
                          }
                          id="dropdown-menu-align-right"
                          onSelect={(selected) =>
                            setAddFormData({
                              ...addFormData,
                              FirmTypeID: selected,
                            })
                          }
                        >
                          {FIRM_TYPES.map((status) => (
                            <Dropdown.Item id={status.id} eventKey={status.id}>
                              {status.type}
                            </Dropdown.Item>
                          ))}
                        </DropdownButton>
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
              <SingleCompani
                key={i}
                setReload={setReload}
                reload={reload}
                company={company}
              ></SingleCompani>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Companies;
