import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css';
import {Button, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import StarIcon from '@mui/icons-material/Star';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ScreenLockRotationIcon from '@mui/icons-material/ScreenLockRotation';
import Modal from 'react-modal';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { selectUser } from '../store/userSlice';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom'; 

function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState(null);
  const [mails, setMails] = useState([]);

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = db
      .collection('sentMails')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMails(
          snapshot.docs.map((doc) => ({ id: doc.id, mail: doc.data() }))
        );
      });

    return () => unsubscribe();
  }, []);

  const sendMail = async (event) => {
    event.preventDefault();
    setError(null);

    if (recipient && content) {
      try {
        await db.collection('sentMails').add({
          from: user.email,
          to: recipient,
          subject: subject,
          content: content,
          user: user,
          sent: true,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setModalOpen(false);
        setContent('');
        setSubject('');
        setRecipient('');
        alert('Mail sent');
      } catch (error) {
        setError('Failed to send mail. Please try again.');
      }
    } else {
      setError('Please fill all the details.');
    }
  };
  const handleMailClick = () => {
    navigate('/mail'); 
  };
  const handleSendClick = () => {
    navigate('/sent-mails'); 
  };


  return (
    <div className="sidebar">
      <div className="inboxHeader"></div>
      {mails.map(({ id }) => (
        <div key={id}></div>
      ))}
      <div className="sidebarOptionIcon">
        <Button onClick={() => setModalOpen(true)} startIcon={<AddIcon />}>
          Compose
        </Button>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 680,
              height: 'auto',
              backgroundColor: 'transparent',
              top: '50%',
              left: '50%',
              marginTop: '-240px',
              marginLeft: '-300px',
            },
            content: {
              margin: 0,
              padding: 0,
              border: 'none',
            },
          }}
        >
          <div className="modalContainer">
            <div className="modalContainerTop">
              <div className="modalHeader">
                <p>New Message</p>
                <div className="modalHeaderIcons">
                  <IconButton onClick={() => setModalOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
              <div onClick={() => setFocus(true)} className="modalRecipients">
                <p>{focus ? 'To' : 'Recipients'}</p>
                <input
                  value={recipient}
                  onChange={(event) => setRecipient(event.target.value)}
                  type="text"
                />
                <div className="modalRecipient">
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    type="text"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="text_editor">
                <ReactQuill
                  value={content}
                  onChange={(value) => setContent(value)}
                  placeholder="Compose Mail.."
                />
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="modalContainerBottom">
              <div className="modalBottom">
                <button onClick={sendMail} type="submit">
                  Send
                </button>
                <TextFormatIcon />
                <AttachFileIcon />
                <LinkIcon />
                <SentimentSatisfiedIcon />
                <AddAPhotoIcon />
                <ScreenLockRotationIcon />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="sidebarOptionIcon" onClick={handleMailClick}>
        <InboxIcon />
        Inbox ({mails.length})
      </div>
      <div className="sidebarOptionIcon">
        <MarkChatUnreadIcon />
        Unread
      </div>
      <div className="sidebarOptionIcon">
        <StarIcon />
        Starred
      </div>
      <div className="sidebarOptionIcon">
        <WatchLaterIcon />
        Snoozed
      </div>
      <div className="sidebarOptionIcon" onClick={handleSendClick}>
        <Button startIcon={<SendIcon />}>Sent Mails</Button>
      </div>
      
      
    </div>
  );
}

export default Sidebar;