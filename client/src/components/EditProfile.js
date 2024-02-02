import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';
import Footer from './Footer';

function EditProfile() {

    let storeObj = useSelector((store) => store);

    let nameInputRef = useRef();
    let phoneInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    useEffect(()=>{
     populateData();
    },[]);

    let populateData = () => {

        if(storeObj){
            nameInputRef.current.value = storeObj.userDetails.name;
            phoneInputRef.current.value = storeObj.userDetails.phone;
            emailInputRef.current.value = storeObj.userDetails.email;
        }

    };

    const handleEdit = async () => {
        let dataToSend = new FormData();

        dataToSend.append('name', nameInputRef.current.value);
        dataToSend.append('phone', phoneInputRef.current.value);
        dataToSend.append('password', passwordInputRef.current.value);

        let response = await axios.post('/editProfile', dataToSend);

        console.log(response);

        alert(response.data.msg);
    };

    const handleDelete = async () => {
      let url = `/deleteAccount?email=${storeObj.userDetails.email}`;

      let respone = await axios.delete(url);

      console.log(respone);
    }

  return (
    <div>
        <div>
        <TopNavigation/>
        </div>
         <form>
        <div class="input-container2">
  <input type="text" name="text" className="input2" placeholder="Enter FullName" ref={nameInputRef} required/>
  <div class="highlight"></div>
</div>
<div class="input-container2">
  <input type="text" name="text" className="input2" placeholder="Enter Mobile Number" ref={phoneInputRef} required/>
  <div class="highlight"></div>
</div>
<div class="input-container2">
  <input type="text" name="text" className="input2" placeholder="Enter Email" ref={emailInputRef} required/>
  <div class="highlight"></div>
</div>
<div class="input-container2">
  <input type="text" name="text" className="input2" placeholder="Create Password" ref={passwordInputRef} required/>
  <div class="highlight"></div>
</div>
            <div>
                <button type='button' className='editbtn' onClick={handleEdit}>Update Profile</button>
                <button type='button' className='editbtn' onClick={handleDelete}>Delete Account</button>
            </div>
        </form>
        <Footer/>
    </div>
  )
}

export default EditProfile