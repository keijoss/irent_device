import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStoreInformation from "@/Hook/userStoreInformation";
import { isValidUser } from "@/Hook/isValidUser";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Authenticate() {

  const naviate = useNavigate();
  const  verifyUser = isValidUser();
  const [isloading, setIsLaodinf] = useState(); // to set loggin user
  const [error, setError] = useState(null);
  const [submitting, Issubmitting] = useState(false);
  const setAuthenticatedUser = useUserStoreInformation(
    (state) => state.setAuthenticatedUser
  ); // to set loggin user
  const authenticatedUser = useUserStoreInformation(
    (state) => state.authenticatedUser
  ); // to set loggin user

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  }); // for form for login

  useEffect(() => {
    setIsLaodinf(true)
    console.log(authenticatedUser);
    if (authenticatedUser?.role_id === 1) {
      naviate("/admin", { replace: true });
    } else if (authenticatedUser?.role_id === 2) {
      naviate("/Customer", { replace: true });
    }else{
      setIsLaodinf(false)
    }
  }, [authenticatedUser]);

  function onSubmit(values) {
    const sugnIn = async () => {
      Issubmitting(true);
      try {
        const login = await axios.post(
          "http://localhost:3300/auth/login",
          values
        );
        localStorage.setItem("token", login.data.token);
        const verify = await axios.get("http://localhost:3300/auth/verify", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const user = await verify.data;
        setAuthenticatedUser(user);
        if (user.role_id === 1) naviate("/admin", { replace: true });
      } catch (error) {
        const erro = await error?.response?.data?.error;
        console.log(error);
        setError(erro);
        Issubmitting(false);
      }
    };
    sugnIn();
  }
  if(isloading === true){ return <div className="h-[100vh] w-full bg-red-500">Loading...</div>}
  else{
return (
  <section className="authentication flex justify-center items-center font-medium">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white w-2/4 rounded-md p-8"
      >
        <div className="logo text-2xl">iRent</div>
        <div className="w-full flex space-y-6 flex-col items-center ">
          <p className="text-3xl font-semibold">Sign-in</p>
          <div className="w-full space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email"
                      required
                      {...field}
                      className="rounded-sm border  border-2 mt-2 border-[#80667F] px-2 h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter Password"
                      {...field}
                      className="rounded-sm border  border-2 mt-2 border-[#80667F] focus-visible:border[#80667F]  px-2 h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}
          <Button
            disabled={submitting}
            type="submit"
            className="w-1/2 h-12 bg-[#80667F] text-white font-semibold "
          >
            {submitting ? "Signing In" : "Sign In"}
          </Button>
        </div>
        <div>
          <p className="text-center text-sm">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </form>
    </Form>
  </section>
);
  }
  
}
