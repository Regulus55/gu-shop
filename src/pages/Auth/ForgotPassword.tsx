import { AuthimageContainer, Button, Input } from "components/ui";
import { EMAIL_REGEX } from "data/Auth/authData";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface IProps {
  email: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const submit = (data: IProps) => {
    console.log(data);
  };

  return (
    <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
      <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Forgot your password? </h2>
          <p className="text-slate-500">Request a password reset email </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <form
            className="flex w-full max-w-sm flex-col"
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <Input
              {...register("email", {
                required: "Please provide an email",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please provide a properly formatted email address",
                },
              })}
              error={errors.email?.message}
              ariaInvalid={isDirty}
              labelText="Email"
              type="email"
              className="mb-3"
              autofocus
              autocomplete="on"
            />

            <Button
              text={"Send Email"}
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

      <AuthimageContainer
        image={"/images/lucent-login-and-password-folder.png"}
        firstText="Find your password"
        secondText=""
      />
    </section>
  );
};

export default ForgotPassword;
