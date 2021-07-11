import React from 'react';
import { useForm, Controller } from "react-hook-form"
import TextField from '@material-ui/core/TextField'

const defaultValues = {
  username: "",
  password: ""
}

const loginPage = (loginUser) => {
  const { handleSubmit, control, reset, submitting } = useForm(defaultValues);
  return (
    <div className="user">
      <form onSubmit={handleSubmit(loginUser)}>
        <div>
          <div>
            <Controller
              name="username"
              render={({ field }) => <TextField label="Username" {...field} />}
              control={control}
              defaultValue=""
            />
          </div>
          <div>
            <Controller
              name="password"
              render={({ field }) => <TextField label="Password" type="password" {...field} />}
              control={control}
              defaultValue=""
            />
          </div>

          <button type="submit" disabled={submitting}>
            Login
          </button>
          <button type="button" disabled={submitting} onClick={() => reset(defaultValues)}>
            Reset
          </button>
        </div>

      </form>
    </div>
  )
}

const loggedInPage = (user) => (
  <div className="user">
    <div>user {user.user.username}</div>
  </div>
)

const User = ({ user, loginUser }) => {
  return !user.user && loginPage(loginUser) || loggedInPage(user)
};

export default User;
