import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const MobileLoginBtn = () => {
    return (
        <div>
            <DropdownButton className='mobile_btn d-flex align-items-center' id="dropdown-basic-button" title={<FontAwesomeIcon icon={faUser} />} variant="dark">
                <Dropdown.Item>
                    <Link to="/login">로그인</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/join">회원가입</Link>
                </Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default MobileLoginBtn