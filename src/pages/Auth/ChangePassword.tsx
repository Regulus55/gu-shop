import { AuthImageContainer, Button, Input } from "components/ui";
import { EMAIL_REGEX } from "data/Auth/authData";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface IProps {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // console.log('query', queryParams.get('token'))

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (data: IProps) => {
    // console.log(data);
    if (data.password !== data.confirmPassword) {
      alert("password not match");
      return;
    }

    try {
      const userInput = {
        token: queryParams.get("token"),
        password: data.password,
      };
      console.log("data", userInput);

      const url = "http://localhost:8000/api/auth/change/password";
      const { status } = await axios.put(url, userInput);
      if (status === 200) {
        alert("Password has been changed successfully");
      }
    } catch (e) {
      console.log("errorrrrr", e);
    }
  };

  useEffect(() => {
    console.log("location", location.pathname);
  }, []);

  return (
    <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
      <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Change your Password </h2>
          <p className="text-slate-500">Provide new Password </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <form
            className="flex w-full max-w-sm flex-col"
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <Input
              {...register("password", {
                required: "Please provide a password",
                minLength: {
                  value: 6,
                  message: "Password needs to be between 6 to 20 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password needs to be between 6 to 20 characters",
                },
              })}
              error={errors.password?.message}
              ariaInvalid={isDirty}
              labelText="New Password"
              type="password"
              className="mb-3"
              autocomplete="off"
            />

            <Input
              {...register("confirmPassword", {
                required: "Please provide a confirm password",
              })}
              error={errors.confirmPassword?.message}
              ariaInvalid={isDirty}
              labelText={"Confirm Password"}
              type={"password"}
              className={"mb-10"}
              autocomplete="off"
            />

            <Button
              text={"Change Password"}
              disabled={isSubmitting}
              className="rounded-lg bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
            />
          </form>

          <div className="mt-10 text-slate-500">
            Forgot your email address?
            <Link
              to={"/forgot/email"}
              className="p-2 font-semibold text-violet-500"
            >
              Find My Account
            </Link>
          </div>
        </div>
      </div>

      <AuthImageContainer
        image={"/images/chpassword.webp"}
        firstText="Find your password"
        secondText="Make your new Password"
      />
    </section>
  );
};

export default ChangePassword;
