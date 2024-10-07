import { AuthimageContainer, Button, Input } from "components/ui";
import { EMAIL_REGEX } from "data/Auth/authData";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface IProps {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: "onSubmit",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = (data: IProps) => {
    console.log(data);
  };

  return (
    <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
      <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Welcome!</h2>
          <p className="text-slate-500">for your first visit!</p>
        </div>

        <div className="flex w-full max-w-sm flex-col">
          <form
            onSubmit={handleSubmit((data) => submit(data))}
            className="flex w-full max-w-sm flex-col"
          >
            <Input
              {...register("userName", {
                required: "Please provide an Username",
              })}
              error={errors.userName?.message}
              ariaInvalid={isDirty}
              labelText="Username"
              type="text"
              className="mb-3"
              autocomplete="on"
              autofocus
            />

            <Input
              {...register("email", {
                required: "Please provide an Email",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please provide a properly formatted email address",
                },
              })}
              error={errors.email?.message}
              ariaInvalid={isDirty}
              labelText="Email"
              type="text"
              className="mb-3"
              autocomplete="on"
            />

            <Input
              {...register("password", {
                required: "Please provide a Password",
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
              labelText="Password"
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
              labelText="Confirm password"
              type="password"
              className="mb-10"
              autocomplete="off"
            />

            <Button
              text="Sign up"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
            />
          </form>

          <div>
            Already have an account?
            <Link to="/login" className="p-2 font-semibold text-violet-500">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <AuthimageContainer
        image="/images/isometric-lock-button.png"
        firstText="shop smarter"
        secondText="Signup here"
      />
    </section>
  );
};

export default Signup;
