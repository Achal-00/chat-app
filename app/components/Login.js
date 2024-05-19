import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const response = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.message === "success") {
      props.setIsLoggedIn(true);
      props.setUsername(formData.get("username"));
    } else {
      toast.error(data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <input
            type="text"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Username"
            name="username"
          />
          <input
            type="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
            name="password"
          />
          <div className="flex items-center justify-between flex-wrap">
            <p className="text-gray-900 mt-4">
              {" "}
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-sm text-blue-500 -200 hover:underline mt-4"
                onClick={() => props.setChooseLog(false)}
              >
                Signup
              </a>
            </p>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            {isLoading ? "..." : "Login"}
          </button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
