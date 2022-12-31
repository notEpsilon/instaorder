import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Container from "../components/Container";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "../trpc/client.trpc";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const initialValues = { username: "", email: "", password: "", owner: 0 };
const typeOptions: Array<Customer | Owner> = [{ customer: 0 }, { owner: 1 }];
interface Customer {
  customer: 0;
}
interface Owner {
  owner: 1;
}

const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username is too long")
    .matches(/^[a-zA-Z_]{1}[a-zA-Z0-9_]+$/, "Invalid username format")
    .required("Username is required"),
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

const RegisterPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<Customer | Owner>(
    typeOptions[0]
  );

  const createUserMutation = useMutation(
    ["createUser"],
    (userData: typeof initialValues) => trpc.auth.createUser.mutate(userData)
  );

  const navigate = useNavigate();

  const handleSubmit = (values: typeof initialValues) => {
    createUserMutation.mutate(values);
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 dark:bg-slate-900">
      <Container
        className="flex flex-col justify-center space-y-7 rounded-lg bg-white py-8 px-8 shadow dark:bg-slate-800"
        maxW="max-w-[min(90%,29rem)]"
      >
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Create an account
        </h1>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            handleSubmit({ ...values, owner: Object.values(selectedType)[0] });
            setSubmitting(false);
            resetForm();
          }}
          validationSchema={RegisterSchema}
        >
          {({ isSubmitting }) => (
            <Form method="POST" className="flex flex-col space-y-5">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 outline-none focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-slate-800 dark:bg-slate-700 dark:text-white"
                    placeholder="ex. star_123"
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="username"
                    component="div"
                  />
                </div>
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
                {/*  */}
                <div className="">
                  <label className="font-medium text-sm">Register as</label>
                  <Listbox
                    value={selectedType}
                    onChange={(e) => setSelectedType(e)}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#f9fafb] border border-gray-300 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {Object.keys(selectedType)[0]}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {typeOptions.map((t, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={t}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {Object.keys(t)[0]}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                {/*  */}
              </div>
              <button
                className="rounded-lg bg-blue-600 p-2.5 text-sm font-medium text-white outline-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 disabled:bg-blue-400"
                type="submit"
                disabled={isSubmitting}
              >
                Sign up
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login Here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default RegisterPage;
