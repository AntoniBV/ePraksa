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
import { handleUpdateQuote } from "../../../../mylib";

const Profile = () => {
    const param = useParams();
    const { id } = param;
    const [isEditable, setIsEditable] = useState(false);
    const [user, setUser] = useState();
    const [editedContent, setEditedContent] = useState({});

    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState();
    const [reload, setReload] = useState(false);

    const path = window.location.pathname;
    const split = path.split("/");
    const role = split[2];

    useEffect(() => {
        fetch(`http://localhost:4000/getQuota?`)
            .then((response) => response.json())
            .then((rawdata) => {
                const [data] = rawdata;
                processData(data);
            })
            .catch((error) => {
                throw new Error(error);
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

    console.log(editedContent);

    const handleCancel = () => {
        setIsEditable(false);
        setEditedContent(null);
    };

    const handleSave = () => {
        setIsEditable(false);
        setEditedContent(null);
        const idCarry = { id: user.IntershipFirmQuataId };
        setUser(null);
        setReload(!reload);
        handleUpdateQuote({ ...editedContent, ...idCarry });
    };

    const handlePropChange = (key, value) => {
        const changed = {};
        changed[key] = value;
        setEditedContent({ ...editedContent, ...changed });
    };

    console.log(editedContent);

    const processData = (data) => {
        const userData = {};
        for (const [key, value] of Object.entries(data)) {
            if (!key.endsWith("_id")) {
                userData[key] = value;
            } else {
                const keyName =
                    key == "odabrana_firma_id"
                        ? "firma"
                        : key.replace("_id", "");
                if (value) {
                    fetch(
                        `http://localhost:4000/getusers?role=${keyName}&id=${value}`
                    )
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
        <div id='preloader'>
            <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
            </div>
        </div>
    ) : (
        <Fragment>
            <div className='row'>
                <div className='col-xl-9 col-xxl-8 col-lg-8'>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='card profile-card'>
                                <div className='card-header flex-wrap border-0 pb-0'>
                                    <h3 className='fs-24 text-black font-w600 mr-auto mb-2 pr-3'>
                                        {user.Name
                                            }
                                    </h3>
                                    {!isEditable ? (
                                        <Link
                                            className='btn btn-primary btn-rounded mb-2'
                                            to='#'
                                            onClick={() => setIsEditable(true)}>
                                            Edit
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                className='btn btn-primary btn-rounded mb-2  mr-2'
                                                to='#'
                                                onClick={handleCancel}>
                                                Cancel
                                            </Link>
                                            <Link
                                                className='btn btn-primary btn-rounded mb-2'
                                                to='#'
                                                onClick={handleSave}>
                                                Save Changes
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className='card-body'>
                                    <form>
                                        <div className='mb-5'>
                                            <div className='title mb-4'>
                                                <span className='fs-18 text-black font-w600'>
                                                    Generalno
                                                </span>
                                            </div>
                                            <div className='row'>
                                                <div className='col-xl-4 col-sm-6'>
                                                    <div className='form-group'>
                                                        <label>QuotaMaxPlan</label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='QuotaMaxPlan'
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            onChange={(e) =>
                                                                handlePropChange(
                                                                    "QuotaMaxPlan",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={
                                                                editedContent?.QuotaMaxPlan ==
                                                                undefined
                                                                    ? user.QuotaMaxPlan
                                                                    : editedContent?.QuotaMaxPlan
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-xl-4 col-sm-6'>
                                                    <div className='form-group'>
                                                        <label>Kvota pocetni broj</label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='QuotaStartNumber'
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            onChange={(e) =>
                                                                handlePropChange(
                                                                    "QuotaStartNumber",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={
                                                                editedContent?.QuotaStartNumber ==
                                                                undefined
                                                                    ? user.QuotaStartNumber
                                                                    : editedContent?.QuotaStartNumber
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-xl-4 col-sm-6'>
                                                    <div className='form-group'>
                                                        <label>QuotaFinal</label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='QuoteFinal'
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            onChange={(e) =>
                                                                handlePropChange(
                                                                    "QuotaFinal",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={
                                                                editedContent?.QuotaFinal ==
                                                                undefined
                                                                    ? user.QuotaFinal
                                                                    : editedContent?.QuotaFinal
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-xl-4 col-sm-6'>
                                                    <div className='form-group'>
                                                        <label>DescriptionOfQuotaCondition</label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='DescriptionOfQuotaCondition'
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            onChange={(e) =>
                                                                handlePropChange(
                                                                    "DescriptionOfQuotaCondition",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={
                                                                editedContent?.DescriptionOfQuotaCondition ==
                                                                undefined
                                                                    ? user.DescriptionOfQuotaCondition
                                                                    : editedContent?.DescriptionOfQuotaCondition
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-xl-4 col-sm-6'>
                                                    <div className='form-group'>
                                                        <label>IsActive </label>
                                                        <input
                                                            type='number'
                                                            className='form-control'
                                                            placeholder='IsActive'
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            onChange={(e) =>
                                                                handlePropChange(
                                                                    "IsActive",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={
                                                                editedContent?.IsActive ==
                                                                undefined
                                                                    ? user.IsActive
                                                                    : editedContent?.IsActive
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-xl-4 col-sm-6'>
                                                    <div className='form-group'>
                                                        <label>Comments</label>
                                                        <input
                                                            type='text'
                                                            className='form-control'
                                                            placeholder='Unesi vrstu prakse'
                                                            readOnly={
                                                                !isEditable
                                                            }
                                                            onChange={(e) =>
                                                                handlePropChange(
                                                                    "Comments",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={
                                                                editedContent?.Comments ==
                                                                undefined
                                                                    ? user.Comments
                                                                    : editedContent?.Comments
                                                            }
                                                        />
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
