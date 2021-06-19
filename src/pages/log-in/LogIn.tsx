import { useRef, BaseSyntheticEvent } from "react";
import { useHistory } from "react-router-dom";

import "./log-in.scss";
import { useAuth } from "../../contexts/AuthContext";

export default function LogIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { isAuthed } = useAuth()!;
  if (isAuthed) {
    history.goBack();
    return null;
  }
  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
  }

  return (
    <main className="log-in-section">
      <div className="inner">
        <div className="wrapper">
          <div className="left">
            <h1>LOG IN</h1>
            <button>with Google</button>
            <button className="amazon">with Amazon</button>
            <button className="facebook">with Facebook</button>
          </div>
          <form className="right">
            <div className="form-group">
              <label htmlFor="username">Username / Email</label>
              <input
                type="text"
                name="username"
                id="username"
                ref={usernameRef}
                required
                maxLength={15}
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                required
                minLength={6}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              LOG IN
            </button>
            <p>No account? Create one here.</p>
          </form>
        </div>
      </div>
    </main>
  );
}
