import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // ✅ Auto login if token exists
    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post(
                backendUrl + '/api/user/admin',
                { email, password }
            )

            if (response.data.success) {

                const newToken = response.data.token

                // ✅ Save token
                localStorage.setItem("token", newToken)

                // ✅ Set token in state
                setToken(newToken)

                toast.success("Login Successful ✅")

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
            
            <div className='bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full'>

                <h1 className='text-2xl font-bold mb-6 text-center'>
                    Admin Login
                </h1>

                <form onSubmit={onSubmitHandler}>

                    <div className='mb-4'>
                        <p className='text-sm font-medium mb-2'>Email</p>
                        <input
                            type="email"
                            placeholder='admin@email.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black'
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <p className='text-sm font-medium mb-2'>Password</p>
                        <input
                            type="password"
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className='w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition'
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Login