import { AuthImageContainer, Button, Input } from "components/ui";
import { EMAIL_REGEX } from "data/Auth/authData";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../../components/ui/Checkbox";
import axios from "axios";
import { useState } from "react";
import LoadingSppiner from "../../components/layout/LoadingSppiner";

interface IProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
  consent: {
    overTwenty: boolean;
    agreeOfTerm: boolean;
    agreeOfPersonalInfo: boolean;
    agreeOfMarketing: boolean;
    etc: boolean;
  };
}

const Signup = () => {
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isLoading, isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
      consent: {
        overTwenty: false,
        agreeOfTerm: false,
        agreeOfPersonalInfo: false,
        agreeOfMarketing: false,
        etc: false,
      },
    },
  });

  // 인증메일 보내기
  const sendEmailHandler = async (data: IProps) => {
    const userInput = {
      email: data.email,
    };
    try {
      const url = "http://localhost:8000/api/auth/email/send";
      const { status } = await axios.post(url, userInput);
      if (status === 201) {
        alert("Email has been sent successfully");
        console.log("send email data", userInput);
        setIsSentEmail(true);
      }
    } catch (e) {
      console.log("send email errorrrr", e);
    }
  };

  // 코드체크
  const checkEmailHandler = async (data: IProps) => {
    const userInput = {
      email: data.email,
      code: data.code,
    };
    try {
      const url = "http://localhost:8000/api/auth/email/check";
      const { status } = await axios.post(url, userInput);
      if (status === 201) {
        console.log("checkemalhamdler", userInput);
        setIsCheckedEmail(true);
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        alert(
          "The verification code you entered is incorrect. Please try again"
        );
      }
      console.log("check email errorrrr", e);
    }
  };

  // 회원가입 버튼
  const submit = async (data: IProps) => {
    console.log("signup data", data);
    try {
      const url = "http://localhost:8000/api/auth/signup";
      const { status } = await axios.post(url, data);
      if (status === 201) {
        alert("Sign up successful");
        navigate("/login");
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        alert("A user with this email address already exists");
      }
      console.log("signup errorrrr", e);
    }
  };

  // consent 선택 부분

  const agreements = [
    {
      id: 1,
      label: "14세 이상입니다 (필수)",
      key: "overTwenty",
      required: true,
    },
    { id: 2, label: "이용약관(필수)", key: "agreeOfTerm", required: true },
    {
      id: 3,
      label: "개인정보수집 및 이용동의 (필수)",
      key: "agreeOfPersonalInfo",
      required: true,
    },
    {
      id: 4,
      label: "개인정보 마케팅 활용 동의 (선택)",
      key: "agreeOfMarketing",
      required: false,
    },
    {
      id: 5,
      label: "이벤트, 특가 알림 및 SMS 등 수신 (선택)",
      key: "etc",
      required: false,
    },
  ];

  const watchConsent = watch("consent");
  const selectAllChecked = Object.values(watchConsent).every((data) => data);

  const [checkItems, setCheckItems] = useState<number[]>([]);
  const [consent, setConsent] = useState<IProps["consent"]>({
    overTwenty: false,
    agreeOfTerm: false,
    agreeOfPersonalInfo: false,
    agreeOfMarketing: false,
    etc: false,
  });

  const handleSingleCheck = (checked: any, id: number, key: any) => {
    setValue(`consent.${key}` as keyof IProps, checked);
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
      setConsent((prev) => ({
        ...prev,
        [key]: true,
      }));
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
      setConsent((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  };

  const handleAllCheck = (checked: any) => {
    agreements.forEach((item) => {
      setValue(`consent.${item.key}` as keyof IProps, checked);
    });
    if (checked) {
      const idArray = agreements.map((el) => Number(el.id));
      setCheckItems(idArray);
      const newConsent = agreements.reduce((acc, cur) => {
        const key = cur.key as keyof IProps["consent"];
        acc[key] = true;
        return acc;
      }, {} as IProps["consent"]);
      setConsent(newConsent);
    } else {
      setCheckItems([]);
      setConsent({
        overTwenty: false,
        agreeOfTerm: false,
        agreeOfPersonalInfo: false,
        agreeOfMarketing: false,
        etc: false,
      });
    }
  };

  return (
    <section
      className={`m-auto grid min-h-[calc(100vh-65px)] w-full  ${
        isSubmitting ? "flex" : "grid-cols-10 max-h-500px"
      }`}
    >
      {isSubmitting ? (
        <LoadingSppiner />
      ) : (
        <>
          <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
            <div className="mb-6 mt-4 flex-col items-center text-center">
              <h2 className="mb-2 text-3xl font-bold">Welcome!</h2>
              <p className="text-slate-500">for your first visit! </p>
            </div>
            <div className="flex w-full flex-col items-center">
              {!isCheckedEmail ? (
                !isSentEmail ? (
                  <form
                    onSubmit={handleSubmit(sendEmailHandler)}
                    className="flex w-full max-w-sm flex-col"
                  >
                    <Input
                      {...register("email", {
                        required: "Please provide an email",
                        pattern: {
                          value: EMAIL_REGEX,
                          message:
                            "Please provide a properly formatted email address",
                        },
                      })}
                      error={errors.code?.message}
                      ariaInvalid={isDirty}
                      labelText="Email"
                      type="email"
                      className="mb-3"
                      autoComplete="on"
                      autoFocus
                    />

                    <Button
                      text={"Send Email"}
                      type="submit"
                      className="rounded-lg mb-4 bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
                    />
                  </form>
                ) : (
                  <form
                    onSubmit={handleSubmit(checkEmailHandler)}
                    className="flex w-full max-w-sm flex-col"
                  >
                    <Input
                      {...register("email")}
                      ariaInvalid={isDirty}
                      labelText="Email"
                      type="email"
                      className="mb-3"
                      disabled
                    />
                    <Input
                      {...register("code", {
                        required: "Please provide a code",
                      })}
                      error={errors.code?.message}
                      ariaInvalid={isDirty}
                      labelText="Code"
                      type="text"
                      className="mb-3"
                    />
                    <Button
                      text={"Verify Email"}
                      type="submit"
                      className="rounded-lg mb-4 bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
                    />
                  </form>
                )
              ) : (
                <form
                  className="flex w-full max-w-sm flex-col"
                  onSubmit={handleSubmit(submit)}
                >
                  <div className={"flex justify-end text-blue-500 mb-1 mr-1"}>
                    Your email has been successfully verified
                  </div>

                  <Input
                    {...register("email")}
                    ariaInvalid={isDirty}
                    labelText="Email"
                    type="email"
                    className="mb-3"
                    disabled
                  />

                  <Input
                    {...register("username", {
                      required: "Please provide a Username",
                    })}
                    error={errors.username?.message}
                    ariaInvalid={isDirty}
                    labelText="Username"
                    type="text"
                    className={"mb-3"}
                    autoComplete="on"
                  />

                  <Input
                    {...register("password", {
                      required: "Please provide a password",
                      minLength: {
                        value: 6,
                        message:
                          "Password needs to be between 6 to 20 characters",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Password needs to be between 6 to 20 characters",
                      },
                    })}
                    error={errors.password?.message}
                    ariaInvalid={isDirty}
                    labelText="Password"
                    type="password"
                    className="mb-3"
                    autoComplete="off"
                  />

                  <Input
                    {...register("confirmPassword", {
                      required: "Please provide a confirm password",
                      validate: (val: string) => {
                        if (watch("password") !== val) {
                          return "Please check your password";
                        }
                      },
                    })}
                    error={errors.confirmPassword?.message}
                    ariaInvalid={isDirty}
                    labelText={"Confirm password"}
                    type={"password"}
                    className={"mb-3"}
                    autoComplete="off"
                  />

                  <div
                    className={`border peer rounded-lg py-2 px-4 border-gray-300 ${
                      isSubmitted && Object.keys(errors).length > 0
                        ? "border-red-500"
                        : ""
                    } `}
                  >
                    <div className="border-b border-gray-300 pb-3 mb-3">
                      <Checkbox
                        type="checkbox"
                        labelText={"전체 동의"}
                        id="check-all"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={checkItems.length === agreements.length}
                      />
                    </div>

                    {agreements.map((item) => (
                      <Checkbox
                        type="checkbox"
                        {...register(`consent.${item.key}` as keyof IProps, {
                          required: item.required
                            ? "This field is required."
                            : false,
                        })}
                        labelText={item.label}
                        id={item.key}
                        key={item.key}
                        className={"mb-1"}
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, item.id, item.key)
                        }
                        checked={checkItems.includes(item.id)}
                      />
                    ))}
                  </div>

                  {isSubmitted && Object.keys(errors).length > 0 && (
                    <small
                      role="alert"
                      className={`animate-shake text-red-500`}
                    >
                      check please
                    </small>
                  )}

                  <Button
                    type="submit"
                    onClick={() => setIsSubmitted(true)}
                    text={"Signup"}
                    disabled={isSubmitting}
                    className="rounded-lg bg-violet-500 mt-4 py-4 font-semibold text-white hover:bg-violet-500"
                  />
                </form>
              )}

              <div className={"mt-10 text-slate-500"}>
                Already have an account?
                <Link
                  to={"/login"}
                  className={"p-2 font-semibold text-violet-500"}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
          <AuthImageContainer
            image={"/images/signup.webp"}
            firstText="Create your Account"
            secondText="Signup here"
            width={300}
            height={300}
          />
        </>
      )}
    </section>
  );
};

export default Signup;
