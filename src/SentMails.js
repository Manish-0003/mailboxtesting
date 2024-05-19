import React from "react";
import "./Mail.css";
import { Checkbox } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import MailCard from "./MailCard";
import Sidebar from "./Sidebar";
import Header from "./Header"; 
const SentMails = () => {
  
    return (
        <div className="mail">
            <Sidebar />
            <div className="mail__container">
                <Header /> {/* Include the Header component */}
                <div className="mail__containerTop">
                    <div className="mailTop">
                        <Checkbox className="checkbox" />
                        <ArrowDropDownIcon />
                        <RefreshIcon />
                        <MoreVertIcon />
                    </div>
                    <div className="mailTopRight">
                        <ChevronLeftIcon />
                        <ChevronRightIcon />
                        <KeyboardIcon />
                        <ArrowDropDownIcon />
                    </div>
                </div>
                <div className="mail__containerMid">
                    <div className="mail__containerMidOptions">
                        <div className="mail__containerMidOption">
                            <InboxIcon />
                            <h3>Primary</h3>
                        </div>
                        <div className="mail__containerMidOption">
                            <PeopleAltIcon />
                            <h3>Social</h3>
                        </div>
                        <div className="mail__containerMidOption">
                            <LocalOfferIcon />
                            <h3>Promotions</h3>
                        </div>
                        <div className="mail__containerMidOption">
                            <InfoIcon />
                            <h3>Updates</h3>
                        </div>
                        <div className="mail__containerMidOption">
                            <ForumIcon />
                            <h3>Forums</h3>
                        </div>
                    </div>
                </div>
                <div className="mail__containerMain">
                    <div className="mail__containerMainCards">
                        <MailCard />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SentMails;
