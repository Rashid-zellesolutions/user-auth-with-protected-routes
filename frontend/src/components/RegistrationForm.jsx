import axios from 'axios'
import React, {useState} from 'react'

const RegistrationForm = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3008/api/auth/register', {
                username,
                password,
            });
            setMessage(response.data.message);
            alert("User Registered")
        } catch (error) {
            console.error('Registration Failed', error.response.data.message);
            setMessage(error.response.data.message);
        }
    }

  return (
    <div>
        <h3>Registration Form</h3>
        <form onSubmit={handleSubmit}>
            <input type='text' value={username} onChange={(e) => {setUserName(e.target.value)}} placeholder='user name' />
            <input type='password' value={password} onChange={(e) => { setPassword(e.target.value)}} placeholder='password' />
            <button type='submit'>Register</button>
        </form>
        {message && <p> {message} </p>}
    </div>
  )
}

export default RegistrationForm
