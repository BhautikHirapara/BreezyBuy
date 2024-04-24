import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import {
  checkUserAsync, selectError, selectLoggedInUser
} from '../authSlice';
import { Link, Navigate } from 'react-router-dom';

function ForgotPassoword() {
    const dispatch = useDispatch();
    const error  = useSelector(selectError);
    const user = useSelector(selectLoggedInUser)
    const {register, handleSubmit, watch, formState: { errors },  } = useForm();
  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate> }
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto w-auto h-24" src="https://i.ibb.co/M6NzCRJ/Whats-App-Image-2024-04-20-at-1-09-46-PM.jpg" alt="Your Company"/>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enter email to reset password</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form noValidate className="space-y-6"
                    onSubmit={handleSubmit((data)=>{
                    console.log(data)
              })}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                <input id="email" {...register("name", 
                { required: "Please enter a valid email address to continue" , pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'Please enter a valid email address to continue'
                }})}  
                type="email" 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send Email</button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                I just remember my password, please sent me back to 
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">&nbsp;Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassoword
