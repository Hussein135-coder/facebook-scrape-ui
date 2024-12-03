import { useState } from "react";
import Error from "./FormErrors";
import { Link, useNavigate } from "react-router-dom";
import useDataContext from "../hooks/useDataContext.tsx";
import { ImSpinner2 } from "react-icons/im";
import Button from "./Button";
import Card from "./Card";

interface LoginData {
  username: string;
  password: string;
}

function loginValidation(
  data: LoginData,
  userNameErrors: string[],
  passwordErrors: string[]
) {
  if (data.username.length === 0) {
    userNameErrors.push("Username is required");
  }
  if (data.username.length < 3) {
    userNameErrors.push("Username must be at least 3 characters");
  }
  if (data.password.length === 0) {
    passwordErrors.push("Password is required");
  }
  if (data.password.length < 6) {
    passwordErrors.push("Password must be at least 6 characters");
  }
}

const Login = () => {
  const [data, setData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [clicked, setClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userNameErrors, setUserNameErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  // Context Data
  const { wait, userLogin } = useDataContext();

  // Handle Data
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });

    // Clear errors when typing
    const newUserNameErrors: string[] = [];
    const newPasswordErrors: string[] = [];
    loginValidation(
      { ...data, [name]: value },
      newUserNameErrors,
      newPasswordErrors
    );
    setUserNameErrors(newUserNameErrors);
    setPasswordErrors(newPasswordErrors);
  };

  // Submit Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClicked(true);
    setErrorMsg("");

    const newUserNameErrors: string[] = [];
    const newPasswordErrors: string[] = [];
    loginValidation(data, newUserNameErrors, newPasswordErrors);
    setUserNameErrors(newUserNameErrors);
    setPasswordErrors(newPasswordErrors);

    if (newUserNameErrors.length === 0 && newPasswordErrors.length === 0) {
      const res = await userLogin({
        username: data.username, // Map username to email for API
        password: data.password,
      });

      if (res.status === "failed") {
        setErrorMsg("An error occurred");
      } else if (res.status === "Network Error") {
        setErrorMsg("Check network connection");
      } else {
        navigate("/money");
      }
    }
  };

  return (
    <div className="py-4 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-100 mb-10">Login</h1>
      <Card className={"px-8 py-10"}>
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            {/* Username */}
            <div className="mb-2">
              <label className="block mb-2 pb-2 text-gray-100" htmlFor="name">
                Username
              </label>
              <input
                id="name"
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="p-2 rounded w-full text-gray-900 focus:outline-0"
                placeholder="Username"
                aria-label="Username"
              />
            </div>
            {clicked && <Error errorsArr={userNameErrors} />}

            {/* Password */}
            <div className="mt-3 mb-2">
              <label className="block mb-2 text-gray-100" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="p-2 rounded w-full text-gray-900 focus:outline-0"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            {clicked && <Error errorsArr={passwordErrors} />}

            {/* Submit */}
            <div className="flex flex-wrap justify-between mt-4">
              <Button
                type="submit"
                disabled={wait}
                className={"w-full px-6 py-2"}
              >
                {wait ? (
                  <ImSpinner2 className="mx-auto text-xl animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>

              <Link
                to="/reset-password"
                className="text-gray-100 mt-3 inline-block"
              >
                Forgot Password?
              </Link>
            </div>

            {errorMsg && (
              <span className="text-red-500 text-center mt-4 block">
                {errorMsg}
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
