import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../img/WATCHA_Logo/WATCHA_Logo_White.svg'

function InstallPrompt({ show, handleClose, handleInstall }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title><span style={{color:'#ff0458'}}><img src={logo} alt='watch_logo' style={{width:'30%'}}/></span> 설치</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Watch는 앱으로도 감상이 가능해요!</p>
        앱을 설치 할까요?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          그냥 웹으로 볼께요
        </Button>
        <Button variant="primary" onClick={handleInstall}>
          앱 설치
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InstallPrompt;
