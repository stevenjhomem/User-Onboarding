import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios'
import './App.css';

function Form() {


    const initialFormValues = {
        user : '',
        contactInfo : '',
        password : '',
        doesAgree : false,
    };

    const [formValues, setFormValues ] = useState({
        user : '',
        contactInfo : '',
        password : '',
        doesAgree : false,
    });
    const [ errors, setErrors ] = useState({
        user : '',
        contactInfo : '',
        password : '',
        doesAgree : '',
    });
    const [team, setTeam ] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name] : '' }))
            .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    const change = event => {
        const { checked, name, value, type } = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormErrors(name, valueToUse);
        setFormValues({...formValues, [name]: valueToUse})
    };

    const schema = yup.object().shape({
        user : yup.string().required('You must enter your first and last name to submit this form.').min(6, 'Name must be more than 4 characters'),
        contactInfo : yup.string().required('You must enter a valid email address to submit this form.'),
        password : yup.string().required('You need a password to protect your data'),
        doesAgree : yup.boolean().oneOf([true], 'You must agree to our terms of service to submit this form'),
    });

    useEffect((schema) => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues]);

    const submit = event => {
        event.preventDefault();
        const newUser = {  
            user : formValues.user.trim(),
            contactInfo : formValues.contactInfo.trim(),
            password : formValues.password,
            doesAgree :formValues.doesAgree,
        }
        axios.post('https://reqres.in/api/users', newUser)
            .then( res => {
                setTeam([res.data.user, ...team])
            })
            .catch( err => {
                console.error('No Information Received')
            })

            setFormValues(initialFormValues);
    }

    return (
        <div className = 'formContainer'>
            <form onSubmit = {submit}>
                <div style ={{color: 'red'}}>
                    <div>{errors.user}</div>
                    <div>{errors.contactInfo}</div>
                    <div>{errors.password}</div>
                    <div>{errors.doesAgree}</div>
                </div>
                <label>
                    Enter your name here:
                    <input 
                        onChange = {change}
                        type = 'text'
                        name = 'user'
                        value = {formValues.user}
                        placeholder = 'First and Last Name'>
                    </input>
                </label>
                <label>
                    Enter your email address here:
                    <input
                        onChange = {change}
                        type = 'text'
                        name = 'contactInfo'
                        value = {formValues.contactInfo}
                        placeholder = 'Email Address'>
                    </input>
                </label>
                <label>
                    Type in your password:
                    <input
                        onChange = {change}
                        type = 'password'
                        name = 'password'
                        value = {formValues.password}
                        placeholder= 'Make it strong'>
                    </input>
                </label>
                <label>
                    Check This Box to Agree to Our Terms of Service:
                    <input
                        onChange = {change}
                        name = 'doesAgree'
                        checked = {formValues.doesAgree}
                        type = 'checkbox'>
                    </input>
                </label>
                <label>
                    <button disabled = {disabled}>Submit</button>
                </label>

            </form>
            <div className = 'teamContainer'>
                <h2>Current Team Members</h2> 
                {team.map((item) => {
                    return <div>{item}</div>
                })}
            </div>
         </div>
    )

};

export default Form;