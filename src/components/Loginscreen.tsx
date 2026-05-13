import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoginPayload } from "../services/auth";
import { loginUser } from "../services/authService";

function Loginscreen() {
  const [form, setForm] = useState<LoginPayload>({
    email: "",
    username: "",
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
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      setSuccessMessage(` Welcome, ${data.user?.name ?? "there"}`);
      setTimeout(() => navigate("/home"), 500);
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
      <div className="text-center w-70 h-105 border border-[#6c63ff] rounded-lg pt-6">
        <div className="font-bold text-[24px]">
          <h1>LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="text-left pl-6 text-sm">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
            />
            <label htmlFor="" className="text-left pl-6 text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="email"
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
            <p className="text-xs text-left pl-6">Forgot Password?</p>
          </div>
          <div className="flex flex-col gap 6 pt-4 gap-2">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-55 rounded-md bg-[#6c63ff] text-white text-sm border border-[#6c63ff] h-7 "
              >
                {loading ? "Signing in..." : "Sign in"}
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
        <div className="text-xs pt-2 flex flex-row justify-center gap-1">
          <p>Dont have an account?</p>
          <button onClick={() => navigate("/signup")}>
            <u>Register</u>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
