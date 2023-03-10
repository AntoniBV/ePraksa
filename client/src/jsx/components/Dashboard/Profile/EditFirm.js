import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//** Import Profile Img */
import profileImg from "../../../../images/avatar/1.jpg";
import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  SplitButton,
} from "react-bootstrap";
import Cookies from "js-cookie";
import { handleUpdateUser } from "../../../../mylib";

const Profile = () => {
  const param = useParams();
  const { id } = param;
  const [isEditable, setIsEditable] = useState(false);
  const [user, setUser] = useState();
  const [editedContent, setEditedContent] = useState({});

  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState();
  const [reload, setReload] = useState(false);

  const [InternshipsTypes, setInternshipsTypes] = useState([]);
  const [selectedInternshipTypes, setSelectedInternshipType] = useState();
  const [InternshipsTypesName, setInternshipsTypesNames] = useState();

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

  const path = window.location.pathname;
  const split = path.split("/");
  const role = split[2];

  useEffect(() => {
    fetch(`http://localhost:4000/getusers?role=${role}&id=${id}`)
      .then((response) => response.json())
      .then((rawdata) => {
        const [data] = rawdata;
        processData(data);
      })
      .catch((error) => {
        throw new Error(error);
      });

    fetch(`http://localhost:4000/getusers?role=Firms`)
      .then((response) => response.json())
      .then((data) => {
        const names = {};
        data.forEach((InternshipTypes) => {
          names[InternshipTypes.InternshipTypes] = InternshipTypes.InternshipTypes;
        });
        setColleges(data);
        setInternshipsTypes(data);
        setInternshipsTypesNames(names);
        console.log(data);
        console.log(names);
      });

  }, [reload]);

  const handleSelect = (e) => {
    handlePropChange("status", e);
  };

  const handleCollegeChange = (e) => {
    handlePropChange("Firms", e);
  };

  const handleSelectCollege = (e) => {
    const parsed = JSON.parse(e);
    setSelectedCollege(parsed.Name);
    const coll = {
      fakultet_id: parsed.collegeid,
    };
    setEditedContent({ ...editedContent, ...coll });
  };

  const handleSelectInternshipTypes = (e) => {
    const parsed = JSON.parse(e);
    setSelectedInternshipType(parsed.internshiptypename);
    const coll = { InternshipTypes: parsed.internshiptypename };
    setEditedContent({ ...editedContent, ...coll });
  };


  const handleCancel = () => {
    setIsEditable(false);
    setEditedContent(null);
  };

  const handleSave = () => {
    setIsEditable(false);
    setEditedContent(null);
    const idCarry = { id: user.FirmId };
    setUser(null);
    setReload(!reload);
    handleUpdateUser({ ...editedContent, ...idCarry }, "Firms");
  };

  const handlePropChange = (key, value) => {
    const changed = {};
    changed[key] = value;
    setEditedContent({ ...editedContent, ...changed });
  };



  const processData = (data) => {
    const userData = {};
    for (const [key, value] of Object.entries(data)) {
      if (!key.endsWith("_id")) {
        userData[key] = value;
      } else {
        const keyName =
          key == "odabrana_firma_id" ? "firma" : key.replace("_id", "");
        if (value) {
          fetch(`http://localhost:4000/getusers?role=${keyName}&id=${value}`)
            .then((response) => response.json())
            .then((rawdata) => {
              const [data] = rawdata;
              userData[keyName] = data.Name;
            })
            .catch((error) => {
              throw new Error(error);
            });
        } else {
          userData[keyName] = value;
        }
      }
    }
    setTimeout(() => setUser(userData), 200);
  };

  return !user ? (
    <div id="preloader">
      <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
    </div>
  ) : (
    <Fragment>
      <div className="row">
        <div className="col-xl-9 col-xxl-8 col-lg-8">
          <div className="row">
            <div className="col-xl-12">
              <div className="card profile-card">
                <div className="card-header flex-wrap border-0 pb-0">
                  <h3 className="fs-24 text-black font-w600 mr-auto mb-2 pr-3">
                    {user.Name}
                  </h3>
                  {!isEditable ? (
                    <Link
                      className="btn btn-primary btn-rounded mb-2"
                      to="#"
                      onClick={() => setIsEditable(true)}
                    >
                      Edit
                    </Link>
                  ) : (
                    <>
                      <Link
                        className="btn btn-primary btn-rounded mb-2  mr-2"
                        to="#"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Link>
                      <Link
                        className="btn btn-primary btn-rounded mb-2"
                        to="#"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Link>
                    </>
                  )}
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-5">
                      <div className="title mb-4">
                        <span className="fs-18 text-black font-w600">
                          Generalno
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-sm-6">
                          <div className="form-group">
                            <label>Ime</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Unesi Ime"
                              readOnly={!isEditable}
                              onChange={(e) =>
                                handlePropChange("Name", e.target.value)
                              }
                              value={
                                editedContent?.Name == undefined
                                  ? user.Name
                                  : editedContent?.Name
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                          <div className="form-group">
                            <label>Opis</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Unesi opis"
                              readOnly={!isEditable}
                              onChange={(e) =>
                                handlePropChange("Description", e.target.value)
                              }
                              value={
                                editedContent?.Description == undefined
                                  ? user.Description
                                  : editedContent?.Description
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                          <div className="form-group">
                            <label>Ulica</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Unesi ulicu"
                              readOnly={!isEditable}
                              onChange={(e) =>
                                handlePropChange("Street", e.target.value)
                              }
                              value={
                                editedContent?.Street == undefined
                                  ? user.Street
                                  : editedContent?.Street
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                          <div className="form-group">
                            <label>Broj ulice</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Unesi broj ulice"
                              readOnly={!isEditable}
                              onChange={(e) =>
                                handlePropChange("StreetNumber", e.target.value)
                              }
                              value={
                                editedContent?.StreetNumber == undefined
                                  ? user.StreetNumber
                                  : editedContent?.StreetNumber
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                          <div className="form-group">
                            <label>Poštanski broj </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Unesi poštanski broj"
                              readOnly={!isEditable}
                              onChange={(e) =>
                                handlePropChange("PostalNumber", e.target.value)
                              }
                              value={
                                editedContent?.PostalNumber == undefined
                                  ? user.PostalNumber
                                  : editedContent?.PostalNumber
                              }
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                          <div className="form-group">
                            <label>Vrsta prakse</label>
                            <DropdownButton
                              alignRight
                              disabled={!isEditable}
                              title={
                                selectedInternshipTypes ||
                                InternshipsTypesName[user.InternshipTypes]
                              }
                              id="dropdown-menu-align-right"
                              onSelect={handleSelectInternshipTypes}
                            >
                              {InternshipsTypes.map((InternshipType) => (
                                <Dropdown.Item
                                  eventKey={JSON.stringify({
                                    internshiptypename:
                                      InternshipType.InternshipTypes,
                                  })}
                                >
                                  {InternshipType.InternshipTypes}
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
                              disabled={!isEditable}
                              title={
                                editedContent?.CityId !== undefined
                                  ? CITIES.at(editedContent.CityId - 1).name
                                  : CITIES.at(user.CityId - 1).name
                              }
                              id="dropdown-menu-align-right"
                              onSelect={(selected) =>
                                handlePropChange("CityId", selected)
                              }
                            >
                              {CITIES.map((status) => (
                                <Dropdown.Item
                                  id={status.id}
                                  eventKey={status.id}
                                >
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
                              disabled={!isEditable}
                              title={
                                editedContent?.FirmTypeID !== undefined
                                  ? FIRM_TYPES.at(editedContent.FirmTypeID - 1)
                                      .type
                                  : FIRM_TYPES.at(user.FirmTypeID - 1).type
                              }
                              id="dropdown-menu-align-right"
                              onSelect={(selected) =>
                                handlePropChange("FirmTypeID", selected)
                              }
                            >
                              {FIRM_TYPES.map((status) => (
                                <Dropdown.Item
                                  id={status.id}
                                  eventKey={status.id}
                                >
                                  {status.type}
                                </Dropdown.Item>
                              ))}
                            </DropdownButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
