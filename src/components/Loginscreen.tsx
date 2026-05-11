import { useNavigate } from "react-router-dom";

function Loginscreen() {
  const navigate = useNavigate();
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-70 h-90 border border-[#6c63ff] rounded-lg pt-6">
        <h2>LOGIN</h2>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-left pl-6 text-sm">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
          />
          <label htmlFor="" className="text-left pl-6 text-sm">
            Password
          </label>
          <input
            type="text"
            placeholder="Password"
            className="w-55 h-9 rounded-md border border-[#6c63ff] pl-2 ml-6"
          />
          <p className="text-xs text-left pl-6">Forgot Password?</p>
        </div>
        <div className="flex flex-col gap 6 pt-4 gap-2">
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/home")}
              className="w-55 rounded-md bg-[#6c63ff] text-white text-sm border border-[#6c63ff] h-7 "
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="text-xs pt-5 flex flex-row justify-center gap-1">
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
