import React from 'react'
import {Button, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from '@fortawesome/free-solid-svg-icons';

const PlusParty = () => {
    return (
        <div>
            <Button variant="link"  style={{color:'#fff'}}>
                <Row style={{display:'flex', flexDirection: 'column'}}>
                    <Col style={{fontSize:'26px'}}><FontAwesomeIcon icon={faComments} /></Col>
                    <Col style={{fontSize:'12px'}}>왓챠파티</Col>
                </Row>
            </Button>
        </div>
    )    
}

export default PlusParty