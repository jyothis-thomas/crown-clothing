import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use');
            }
            else {
                console.log('error while creating user', error);   
            }
        }
        
        
    };
    const handleChangeEvent = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };    
    return (
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your Email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required type="text" name="displayName" value={displayName} onChange={handleChangeEvent}/>

                <FormInput label="Email" required type="email" name="email" value={email} onChange={handleChangeEvent}/>

                <FormInput label="Password" required type="password" name="password" value={password} onChange={handleChangeEvent}/>

                <FormInput label="Confirm Password" required type="password" name="confirmPassword" value={confirmPassword} onChange={handleChangeEvent}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;