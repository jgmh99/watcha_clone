import React, { useState, useEffect } from 'react';

const Join = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
  const [allChecked, setAllChecked] = useState(false);

  // 이메일 정규식 패턴
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 형식

  // 이름 정규식 패턴 (2글자 이상)
  const namePattern = /^.{2,}$/; // 2글자 이상

  // 비밀번호 정규식 패턴
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 영문자와 숫자를 포함한 8자 이상

  // 이메일 입력 이벤트 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(emailPattern.test(value));
  };

  // 이름 입력 이벤트 핸들러
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameValid(namePattern.test(value));
  };

  // 비밀번호 입력 이벤트 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(passwordPattern.test(value));
  };

  // 체크박스 상태 변경 이벤트 핸들러
  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
    setAllChecked(newCheckboxes.every(Boolean));
  };

  // 전체 동의 체크박스 상태 변경 이벤트 핸들러
  const handleAllCheckboxChange = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    setCheckboxes(new Array(checkboxes.length).fill(newAllChecked));
  };

  // 가입 버튼 활성화 조건
  const isFormValid = emailValid && nameValid && passwordValid && checkboxes.every(Boolean);

  // 배경 변경
  useEffect(() => {
    // 페이지 로드 시 배경 이미지 설정
    document.body.style.backgroundImage = 'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(https://media.themoviedb.org/t/p/w1920_and_h1080_bestv2/fU3oaBud5SZadw6k1ycftYedmXJ.jpg)';
    document.body.style.backgroundSize = 'auto';
    document.querySelector('.topNav').style.backgroundColor = 'transparent';
    // 페이지 언마운트 시 배경 이미지 초기화
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, []);

  return (
    <div className='join-form'>
      <form>
        <h6 className='mb-4' style={{textAlign:'center'}}>회원가입</h6>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${name.length === 0 ? 'border-danger' : (nameValid ? 'border-primary' : 'border-danger')}`}
            id="nameInput"
            value={name}
            onChange={handleNameChange}
            placeholder='이름(2글자 이상)'
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className={`form-control ${email.length === 0 ? 'border-danger' : (emailValid ? 'border-primary' : 'border-danger')}`}
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
            placeholder='이메일(example@gamil.com)'
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${password.length === 0 ? 'border-danger' : (passwordValid ? 'border-primary' : 'border-danger')}`}
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
            placeholder='비밀번호(영문자와 숫자를 포함한 8자 이상)'
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkboxAll"
            checked={allChecked}
            onChange={handleAllCheckboxChange}
          />
          <label className="form-check-label" htmlFor="checkboxAll">전체 동의</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkbox1"
            checked={checkboxes[0]}
            onChange={() => handleCheckboxChange(0)}
          />
          <label className="form-check-label" htmlFor="checkbox1">이용약관 동의</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkbox2"
            checked={checkboxes[1]}
            onChange={() => handleCheckboxChange(1)}
          />
          <label className="form-check-label" htmlFor="checkbox2">개인정보 수집 및 이용 동의</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkbox3"
            checked={checkboxes[2]}
            onChange={() => handleCheckboxChange(2)}
          />
          <label className="form-check-label" htmlFor="checkbox3">마케팅 정보 수신 동의</label>
        </div>
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkbox4"
            checked={checkboxes[3]}
            onChange={() => handleCheckboxChange(3)}
          />
          <label className="form-check-label" htmlFor="checkbox4">제3자 정보 제공 동의</label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: '100%',
            backgroundColor: isFormValid ? 'rgb(255, 4, 88)' : 'gray',
            border: 'none',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
          disabled={!isFormValid}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}

export default Join;
