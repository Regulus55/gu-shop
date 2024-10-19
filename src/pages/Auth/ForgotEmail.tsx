import { AuthimageContainer, Button, Input } from "components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface IProps {
  username: string;
}

const ForgotEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
    },
  });

  const submit = (data: IProps) => {
    console.log(data);
  };

  return (
    <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
      <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Forgot your Email? </h2>
          <p className="text-slate-500">
            Check the email you registered at sign-up{" "}
          </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <form
            className="flex w-full max-w-sm flex-col"
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <Input
              {...register("username", {
                required: "Please provide an email",
              })}
              error={errors.username?.message}
              ariaInvalid={isDirty}
              labelText="Username"
              type="text"
              className="mb-3"
              autofocus
              autocomplete="on"
            />
            <Button
              text="Find my email"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
            />
          </form>

          <div className="mt-10 text-slate-500">
            Forgot your password?
            <Link
              to={"/forgot/password"}
              className="p-2 font-semibold text-violet-500"
            >
              Find My Password
            </Link>
          </div>
        </div>
      </div>

      <AuthimageContainer
        image={"/images/forgotemail.svg"}
        firstText="Find your email"
        secondText=""
        width={300}
        height={300}
      />
    </section>
  );
};

export default ForgotEmail;
