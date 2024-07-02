import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // 이메일 정규식 패턴
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 형식

  // 비밀번호 정규식 패턴
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 영문자와 숫자를 포함한 8자 이상

  // 이메일 입력 이벤트 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(emailPattern.test(value));
  };

  // 비밀번호 입력 이벤트 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(passwordPattern.test(value));
  };

  // 로그인 버튼 활성화 조건
  const isFormValid = emailValid && passwordValid;

  // 배경 변경
  useEffect(() => {
    // 페이지 로드 시 배경 이미지 설정
    document.body.style.height = '100vh'
    document.body.style.backgroundImage = 'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(https://image.tmdb.org/t/p/original/fMtgGnPtT2X5OV9ctiZaIlbIBOu.jpg)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = '50% 40%';
    document.body.style.objectFit = 'cover';
    document.querySelector('.topNav').style.backgroundColor = 'transparent';
    // 페이지 언마운트 시 배경 이미지 초기화
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, []);

  return (
    <div className='login-form' style={{width:'auto'}} >
      <form>
        <h6 className='mb-4' style={{textAlign:'center'}}>로그인</h6>
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
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
