import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../../config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { member } from "../membersType";
import { useRouter } from "next/navigation";

interface Props {
  setOpenAuth: (isOpen: boolean) => void;
  setUser: (user: member) => void;
}

const Auth: React.FC<Props> = ({ setOpenAuth, setUser }) => {
  const [isRegisterd, setIsRegisterd] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const router = useRouter();

  const getUserData = (email: string) => {
    getDoc(doc(db, "users", email)).then((docSnap: any) => {
      if (!docSnap.exists()) {
        toast.error("User not Found");
        return;
      }
      setUser(docSnap.data());
      window.localStorage.setItem(
        "userPayload",
        JSON.stringify(docSnap.data())
      );
      toast.success(`${"Welcome Mr. " + docSnap.data()?.displayName}`);
    });
  };

  const login = () => {
    if (loginForm.username === "" && loginForm.password === "") {
      toast.error("Fill all Fields");
    } else if (!loginForm.username.match(isValidEmail)) {
      toast.error("Invalid Username or Password");
    } else {
      signInWithEmailAndPassword(auth, loginForm.username, loginForm.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user?.email && getUserData(user.email);
          setOpenAuth(false);
        })
        .catch((error) => {
          toast.error(error.code);
        });
    }
    setLoginForm({ username: "", password: "" });
  };

  const register = () => {
    if (
      registerForm.name === "" &&
      registerForm.email === "" &&
      registerForm.password === ""
    )
      toast.error("Fill all Fields");
    else if (!registerForm.email.match(isValidEmail)) {
      toast.error("Invalid Email");
    } else if (registerForm.password !== registerForm.cPassword) {
      toast.error("Entered Passwords do not Match");
    } else {
      createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      )
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: registerForm.name,
          });
          await setDoc(doc(db, "users", registerForm.email), {
            displayName: registerForm.name,
            email: registerForm.email,
          });
          toast.success("Registerd Succesfully");
          window.localStorage.setItem("registerPayload", JSON.stringify(user));
          setTimeout(() => {
            router.push("/register");
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.code);
          console.log(error);
        });
    }
    setRegisterForm({ name: "", email: "", password: "", cPassword: "" });
  };

  return (
    <>
      <p className="text-3xl underline text-blue-700 text-center font-bold mt-3">
        {isRegisterd ? "Login" : "Register"}
      </p>
      <div className="my-12 space-y-8">
        <div className={`${isRegisterd && "hidden"}`}>
          <label
            htmlFor="name"
            className="block text-gray-800 font-semibold text-sm"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              className="relative ring-0 outline-none border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081]  focus:border-[#000081] block w-full p-2.5 checked:bg-emerald-500"
              value={registerForm.name}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, name: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="mail"
            className="block text-gray-800 font-semibold text-sm"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="mail"
              placeholder="Enter Email"
              required
              className="relative ring-0 outline-none border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081]  focus:border-[#000081] block w-full p-2.5 checked:bg-emerald-500"
              value={isRegisterd ? loginForm.username : registerForm.email}
              onChange={(e) =>
                isRegisterd
                  ? setLoginForm({ ...loginForm, username: e.target.value })
                  : setRegisterForm({
                      ...registerForm,
                      email: e.target.value,
                    })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-800 font-semibold text-sm"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              className="relative ring-0 outline-none border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081]  focus:border-[#000081] block w-full p-2.5 checked:bg-emerald-500"
              value={isRegisterd ? loginForm.password : registerForm.password}
              onChange={(e) =>
                isRegisterd
                  ? setLoginForm({ ...loginForm, password: e.target.value })
                  : setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
              }
            />
          </div>
        </div>

        <div className={`${isRegisterd && "hidden"}`}>
          <label
            htmlFor="cnfPassword"
            className="block text-gray-800 font-semibold text-sm"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              id="cnfPassword"
              placeholder="Re-Enter Password"
              required
              className="relative ring-0 outline-none border border-neutral-500 placeholder-[#000081] rounded-lg focus:ring-[#000081]  focus:border-[#000081] block w-full p-2.5 checked:bg-emerald-500"
              value={registerForm.cPassword}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, cPassword: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-md focus:outline-none transition duration-150 ease-in-out"
          onClick={isRegisterd ? login : register}
        >
          {isRegisterd ? "Login" : "Register"}
        </button>

        <p className="text-center">
          {isRegisterd
            ? "Not having any Account?? Register "
            : "Already have an Account?? Login "}
          <button
            onClick={() => setIsRegisterd(!isRegisterd)}
            className="text-blue-700 underline"
          >
            here
          </button>
        </p>
      </div>
    </>
  );
};

export default Auth;
