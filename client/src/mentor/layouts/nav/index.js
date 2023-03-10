import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";

const AspiraNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
    const [toggle, setToggle] = useState("");
    const onClick = (name) => setToggle(toggle === name ? "" : name);
    return (
        <Fragment>
            <NavHader />
            <SideBar onClick={() => onClick2()} onClick3={() => onClick3()} />
            <Header
                onNote={() => onClick("chatbox")}
                onNotification={() => onClick("notification")}
                toggle={toggle}
                title={title}
                onProfile={() => onClick("profile")}
                onBox={() => onClick("box")}
                onClick={() => ClickToAddEvent()}
            />
            <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
        </Fragment>
    );
};

export default AspiraNav;
