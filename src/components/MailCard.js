import React, { useEffect, useState } from "react";
import "../css/MailCard.css";
import { db } from "../firebase";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PrintIcon from '@mui/icons-material/Print';
import LaunchIcon from '@mui/icons-material/Launch';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton } from "@mui/material";

function MailCard() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('sentMails').orderBy('timestamp', 'desc').onSnapshot(
      (snapshot) => setMails(snapshot.docs.map((doc) => ({
        id: doc.id,
        mail: doc.data()
      })))
    );
    return () => unsubscribe();
  }, []);

  const deleteMail = async (id) => {
    try {
      await db.collection('sentMails').doc(id).delete();
      alert('Mail deleted');
    } catch (error) {
      alert('Failed to delete mail. Please try again.');
    }
  };

  return (
    <div>
      <div className="inboxHeader">
        
        
      </div>
      {mails.map(({ id, mail }) => (
        <Accordion key={id}>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <div className="accordionSummaryContent">
              <div className="accordLeft">
                <CheckBoxOutlineBlankIcon  />
               
                <Typography>{mail.to}</Typography>
              </div>
              <div className="accordMiddle">
                <Typography>{mail.subject || "No Subject"}</Typography>
              </div>
              <div className="accordRight">
                <Typography>{new Date(mail.timestamp?.toDate()).toLocaleString()}</Typography>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="accordDetails">
              <div className="accordDetailsTop">
                <p>{mail.subject || "No Subject"}</p>
                <div className="accordDetailsTopRight">
                  <PrintIcon  />
                  <LaunchIcon  />
                </div>
              </div>
              <div className="accordDetailsInfo">
                <Avatar />
                <div className="sendersInfo">
                  <h4>
                    {mail.from} 
                  </h4>
                  <small>{`to- ${mail.to}`}</small>
                </div>
                <div className="sendersInfoDate">
                  <div className="senderInfoDateOption">
                    <small>{new Date(mail.timestamp?.toDate()).toLocaleString()}</small>
                    
                    <ReplyIcon />
                    <MoreVertIcon />
                    <IconButton onClick={() => deleteMail(id)} >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="mailContent">
                <div className="mailContentAccord" dangerouslySetInnerHTML={{ __html: mail.content }} />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default MailCard;