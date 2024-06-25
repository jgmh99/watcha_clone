import React from 'react'
import {Button, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
const PlusMore = () => {
    return (
        <div>
            <Button variant=""  style={{color:'#fff'}}>
                <Row style={{display:'flex', flexDirection: 'column'}}>
                    <Col style={{fontSize:'26px'}}><FontAwesomeIcon icon={faEllipsisVertical} /></Col>
                    <Col style={{fontSize:'12px'}}>더보기</Col>
                </Row>
            </Button>
        </div>
    )
}

export default PlusMore