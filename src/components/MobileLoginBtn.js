import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const MobileLoginBtn = () => {
    return (
        <div>
            <DropdownButton className='mobile_btn d-flex align-items-center' id="dropdown-button-dark-example2" title={<FontAwesomeIcon icon={faUser} />}variant="secondary" data-bs-theme="dark">
                <Dropdown.Item as={Link} to="/login">
                    로그인
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/join">
                    회원가입
                </Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default MobileLoginBtn