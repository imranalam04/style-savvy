import { useState} from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.components";
import "./sign-in-form.styles.scss";
import Button from "../button/button";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [FormField, setFormField] = useState(defaultFormFields);
  const { email, password } = FormField;
  // console.log(FormField);



  const resetFormField = () => {
    setFormField(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...FormField, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h1>Already have an account?</h1>
      <span>Sign In with Your Email and Password </span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit" style={{ fontFamily: "monospace" }}>
            Sign In
          </Button>
          <Button
            onClick={signInWithGoogle}
            buttonType="google"
            style={{ fontFamily: "monospace" }}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
