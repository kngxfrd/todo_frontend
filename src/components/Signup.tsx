import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RegisterPayload } from "../services/auth";
import { registerUser } from "../services/authService";

function Signup() {
  const [form, setForm] = useState<RegisterPayload>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await registerUser(form);
      localStorage.setItem("token", data.token);
      setSuccessMessage(
        `Account created! Welcome, ${data.user?.name ?? "there"}`,
      );
      setTimeout(() => navigate("/Hompage"), 2500);
      console.log("Registered:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  const navigate = useNavigate();
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="text-center w-70 h-120 border border-[#6c63ff] rounded-lg pt-6">
        <div className="text-[24px] font-bold">
          <h1>REGISTER</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="text-left pl-6 text-sm">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              type="text"
              placeholder="John Doe"
              className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
            />
            <label htmlFor="" className="text-left pl-6 text-sm">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              type="text"
              placeholder="johndoe123"
              className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
            />
            <label htmlFor="" className="text-left pl-6 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="johndoe@icloud.com"
              className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
            />
            <label htmlFor="" className="text-left pl-6 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
            />
          </div>
          <div className="flex flex-col gap 6 pt-4 gap-2">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-55 rounded-md bg-[#6c63ff] text-white text-sm border border-[#6c63ff] h-7 "
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </div>
            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green", fontSize: "12px" }}>
                {successMessage}
              </p>
            )}
          </div>
        </form>
        <div className="text-xs pt-5 flex flex-row justify-center gap-1">
          <p>Already have an account?</p>
          <button onClick={() => navigate("/")}>
            <u>Sign in</u>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
