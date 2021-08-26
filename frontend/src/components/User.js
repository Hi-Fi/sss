import React from 'react';
import { useForm, Controller } from "react-hook-form"
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';

const defaultValues = {
  username: "",
  password: ""
}

const loginPage = (user, loginUser) => {
  const { handleSubmit, control, reset, submitting, formState: { errors } } = useForm(defaultValues);
  return (
    <div className="user">
      <form onSubmit={handleSubmit(loginUser)}>
        <div>
          <div>
            <Controller
              name="username"
              render={({ field }) => <TextField label="Username" {...field} />}
              control={control}
              rules={{ required: true}}
              defaultValue=""
            />
            {errors.username && <div>Username is required</div>}
          </div>
          <div>
            <Controller
              name="password"
              render={({ field }) => <TextField label="Password" type="password" {...field} />}
              control={control}
              rules={{ required: true}}
              defaultValue=""
            />
            {errors.password && <div>Password is required</div>}
          </div>

          <div>{user.userLoginErrors}</div>
          <Button type="submit" disabled={submitting}>
            Login
          </Button>
          <Button type="button" disabled={submitting} onClick={() => reset(defaultValues)}>
            Reset
          </Button>
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
  return !user.user && loginPage(user, loginUser) || loggedInPage(user)
};

export default User;
