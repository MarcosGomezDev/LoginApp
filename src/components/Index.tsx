import { NavLink } from "react-router-dom";

export const Index = () => {
  return (
    <div>
      <h1>Identifícate</h1>

      <button className="login-bt">
        <NavLink to="/login">Login</NavLink>
      </button>
    </div>
  );
};
