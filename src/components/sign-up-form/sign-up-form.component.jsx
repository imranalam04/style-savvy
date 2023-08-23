import { useState} from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.components"; 
import './sign-up-form.styles.scss'
import Button from "../button/button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [FormField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = FormField;
  // console.log(FormField);


  const resetFormField = () => {
    setFormField(defaultFormFields)
  }
const handleSubmit = async(event) => {
  event.preventDefault();

  if(password !== confirmPassword) {
    alert("passwords do not match")
    return;
  }
  try {
     const {user} = await createAuthUserWithEmailAndPassword(email,password)
     await createUserDocumentFromAuth(user,{displayName})
     resetFormField()
  } catch(error) {
    if(error.code === 'auth/email-already-in-use'){
      alert('email already Exists !')
    }
    console.log('error encountered !',error)
  }
}

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...FormField, [name]: value });
  };

  return (
    <div className="sign-up-container">
    <h1>Don't have an account?</h1>
      <span>Sign Up with Your Email and Password </span>
      <form onSubmit={handleSubmit}>
        <FormInput
        label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
         label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
        label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
        label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" style={{fontFamily:"monospace"}}>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
