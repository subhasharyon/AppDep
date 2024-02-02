import React, { useRef } from 'react'
import axios from 'axios';

function Signup({onLoginClick}) {

  let nameInputRef = useRef();
  let phoneInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  let insertData = async () => {

    try {
      let dataToSend = new FormData();

    dataToSend.append('name', nameInputRef.current.value);
    dataToSend.append('phone', phoneInputRef.current.value);
    dataToSend.append('email', emailInputRef.current.value);
    dataToSend.append('password', passwordInputRef.current.value);

    let response = await axios.post('/insertData', dataToSend);
    console.log(response);
    alert(response.data.msg);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
        <form>
        
        <div class="input-container">
  <input type="text" name="text" className="input" placeholder="Enter FullName" ref={nameInputRef} required/>
  <div class="highlight"></div>
</div>
<div class="input-container">
  <input type="text" name="text" className="input" placeholder="Enter Mobile Number" ref={phoneInputRef} required/>
  <div class="highlight"></div>
</div>
<div class="input-container">
  <input type="text" name="text" className="input" placeholder="Enter Email" ref={emailInputRef} required/>
  <div class="highlight"></div>
</div>
<div class="input-container">
  <input type="text" name="text" className="input" placeholder="Create Password" ref={passwordInputRef} required/>
  <div class="highlight"></div>
</div>
            <div>
                <button type='button' className='button' onClick={insertData}>Signup</button>
                <p className='link' onClick={onLoginClick}>Already have an account? Login here</p>
            </div>
        </form>
    </div>
  )
}

export default Signup