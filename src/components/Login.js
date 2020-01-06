import React from 'react';
import { Formik } from 'formik';
import "../styles.css";
import axios from 'axios';
import { AuthContext } from "../App";
var sha512 = require('sha512')



function Login() {

  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

  return (
    <div className="container">
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email is Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        else if(!values.password){
          errors.password = 'Password is Required one';
        }
        return errors;
      }}
      onSubmit={(values, { isSubmitting }) => {
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: null,
        });
        console.log(values);
        //console.log(values.password);
        var json_val=JSON.parse(JSON.stringify(values));
        
        //console.log(json_val.password);
     
        var hash = sha512(json_val.password)
      var pass= hash.toString('hex');
      var val={email:`${json_val.email}`,password:`${pass}`};
        console.log(val);
        axios.post(`https://dev.api.staller.show/v1/users/login`, val)
        .then(data => {
          dispatch({
              type: "LOGIN",
              payload: data.data.data
          })
        })
        .catch(error => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message
          });
   
      });
    }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Enter Your email address"
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
           // value="d76a18fd56099700a02c4dd57bf9321475ebd817fa8b4943923324ca11ca6df4a9ae2d4f86df361d08a4c2f5418c8251e82a8c861819a5ceb269d8f2cc15d988"
            placeholder="Enter your password"
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
  )
}

export default Login;


