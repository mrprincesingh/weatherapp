import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Textarea,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { signupfunc } from "../../Redux/action";
import axios from "axios";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [Uname, setUname] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [CPass, setCPass] = useState("");
  const [Address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();
  const { createAccount, isError } = useSelector((state) => state);

  
  const dispatch = useDispatch();

  useEffect(() => {
    if (createAccount === true) {
      toast.success("Signup Success!");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [createAccount]);

  useEffect(() => {
    if (isError === true) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/user?Email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const checkUsernameExists = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/user?Uname=${username}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const checkPhoneNumberExists = async (phoneNumber) => {
    try {
      const response = await axios.get(`http://localhost:3000/user?mobileNumber=${phoneNumber}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking phone number:", error);
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isValidMobileNumber()) {
      alert("Mobile number should not exceed 10 digits");
      return;
    }
    if (!areAllFieldsFilled()) {
      toast.error("Please Fill all the fields");
      return;
    }

    if (!PasswordMatch()) {
      toast.error("Passwords do not match");
      return;
    }



    const emailExists = await checkEmailExists(Email);
    const usernameExists = await checkUsernameExists(Uname);
    const phoneNumberExists = await checkPhoneNumberExists(mobileNumber);

    if (emailExists || usernameExists || phoneNumberExists) {
      toast.error("Email, username, or phone number already exists. Please choose a different one.");
      return;
    }

    dispatch(
      signupfunc({
        first: fname,
        lname: lname,
        Email: Email,
        Uname: Uname,
        Pass: Pass,
        CPass: CPass,
        Address: Address,
        mobileNumber: mobileNumber,
      })
    );

    setFname("");
    setLname("");
    setEmail("");
    setCPass("");
    setPass("");
    setUname("");
    setMobileNumber("");
    setAddress("");
  };

  const PasswordMatch = () => {
    return Pass === CPass;
  };

  const areAllFieldsFilled = () => {
    return (
      fname.trim() !== "" &&
      lname.trim() !== "" &&
      Uname.trim() !== "" &&
      Email.trim() !== "" &&
      Pass.trim() !== "" &&
      CPass.trim() !== ""
    );
  };



  const isValidMobileNumber = () => {
    return mobileNumber.trim().length <= 10;
  };
const handlegotologinup = ()=>{
  navigate("/login")
}
  return (
    <div>
      <Container bgColor={"black.100"} mt="100px" p="10" lineHeight={"10"}>
        <FormControl mt="10px" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="First name"
            value={fname}
            type="text"
            onChange={(e) => setFname(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Last name"
            value={lname}
            type="text"
            onChange={(e) => setLname(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>UserName</FormLabel>
          <Input
            placeholder="User name"
            value={Uname}
            type="text"
            onChange={(e) => setUname(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email Address"
            value={Email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            value={Pass}
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
          <Text fontSize="xs">
            Password must have more than 8 characters. Your password must have a special character "!@#$%^&()_", and it
            should have at least one uppercase and lowercase letter, and any digit.
          </Text>
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm Password"
            value={CPass}
            type="password"
            onChange={(e) => setCPass(e.target.value)}
          />
        </FormControl>
        <FormControl mt="10px" isRequired>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Address</FormLabel>
          <Textarea
            placeholder="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <Button mt="10px" colorScheme="blue" onClick={handleSignup}>
          Submit
        </Button>
        <Box onClick={handlegotologinup}>
  <h1>Already have an account click here</h1>
<Button colorScheme="red">Login</Button>
</Box>
      </Container>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Signup;
