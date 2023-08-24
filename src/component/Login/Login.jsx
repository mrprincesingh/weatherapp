import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
    FormControl,
    FormLabel,
    Input,
    Container,
    Textarea,
    Button,
    Text,
  } from "@chakra-ui/react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginfunc } from "../../Redux/action";

const Login = () => {
    const {isAuth} = useSelector((state) => state);
    
    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

      
        if (!Email || !Pass) {
          toast.error("Please provide both Email and Password.");
          return;
        }

        dispatch(loginfunc(Email ,Pass ))
     if(isAuth){
        toast.success("Login successful!");
            setTimeout(() => {
                navigate("/");
              }, 5000); 
     }else{
        toast.error("Invalid Email or Password. Please try again.");
     }

     setEmail("")
     setPass("")
      };
      
  return (
    <div>
      <Container bgColor={"black.100"} mt="100px" p="10" lineHeight={"10"}>
       
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
      
        </FormControl>
     
        <Button mt="10px" colorScheme="blue" onClick={handleLogin}>
          Submit
        </Button>
      </Container>

      <ToastContainer position="top-right" />
    </div>
  )
}

export default Login