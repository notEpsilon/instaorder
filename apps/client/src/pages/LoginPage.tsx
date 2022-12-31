import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Container from "../components/Container";
import { useAuth } from "../stores/useAuth";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "../trpc/client.trpc";

const initialValues = { email: "", password: "" };

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .min(6, "Email must be at least 6 characters")
    .max(80, "Email is too long")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const authState = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation(
    ["login"],
    (userInfo: typeof initialValues) => trpc.auth.logUserIn.mutate(userInfo)
  );

  const handleSubmit = async (values: typeof initialValues) => {
    const { msg, err } = await loginMutation.mutateAsync(values);
    if (err === null && msg !== null) {
      authState.setLoggedIn(true);
      authState.setUserId(msg);
      navigate("/home");
    } else {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-20 dark:bg-slate-900">
      <Container
        className="flex flex-col justify-center space-y-7 rounded-lg bg-white py-10 px-8 shadow dark:bg-slate-800"
        maxW="max-w-[min(90%,29rem)]"
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Sign in to your account
        </h1>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await handleSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
          validationSchema={LoginSchema}
        >
          {({ isSubmitting }) => (
            <Form method="POST" className="flex flex-col space-y-5">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 outline-none focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-slate-800 dark:bg-slate-700 dark:text-white"
                    placeholder="name@gmail.com"
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="email"
                    component="div"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 outline-none focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-slate-800 dark:bg-slate-700 dark:text-white"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="password"
                    component="div"
                  />
                </div>
              </div>
              <button
                className="rounded-lg bg-blue-600 p-2.5 text-sm font-medium text-white outline-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 disabled:bg-blue-400"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default LoginPage;
