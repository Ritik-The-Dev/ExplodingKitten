import React, { useState } from 'react';
import axios from 'axios';
import { LOGIN } from '../Api';
import { reducerCases, useStateProvider } from '../context/StateContext';

function Login({setShowLogin}) {
  const [UserName, setUserName] = useState('');
  const [{}, dispatch] = useStateProvider();

  const handleSubmit = async () => {
    try{
      const { data } = await axios.post(LOGIN, { userName: UserName });
    if (data.status === "success") {
      setShowLogin(false)
      dispatch({ type: reducerCases.SET_USER_INFO, userInfo: { ...data.data } });
    } else {
      alert(data.msg);
    }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white lg:min-w-[20%] p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Enter your UserName</h2>
        <input type="text" value={UserName} className="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="UserName" onChange={(e) => setUserName(e.target.value)} />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios'
// import { LOGIN } from '../Api';
// import { reducerCases, useStateProvider } from '../context/StateContext';

// function Login() {
//   const [UserName,setUserName] = useState('')
//   const[{},dispatch] = useStateProvider()

//   const handleSubmit = async()=>{
//     const {data} = await axios.post(LOGIN,{userName:UserName})
//     console.log(data)
//     if(data.status === "success"){
//       dispatch({type:reducerCases.SET_USER_INFO,userInfo:{...data.data}})
//     }
//     else{
//       alert(data.msg)
//     }
//   }

//   return (
//     <div>
//           <div
//       className="modal show"
//       style={{ display: 'block', position: 'initial' }}
//     >
//       <Modal.Dialog>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter your UserName</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <input type="text" value={UserName} className='w-full p-2 border-2'  placeholder='UserName' onChange={(e)=>setUserName(e.target.value)}/>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="" className='bg-gray-100 text-black hover:bg-gray-300' onClick={handleSubmit}>Save changes</Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//     </div>
//   )
// }

// export default Login
