import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form"
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';

const defaultValues = {
  username: "",
  password: "",
  email: ""
}

const RegisterUser = ({ registerUser, registrationErrors }) => {
  const { handleSubmit, control, reset, submitting, formState: { errors } } = useForm(defaultValues);

  return (
    <div className="user">
      <form onSubmit={handleSubmit(registerUser)}>
        <div>
          <div>
            <Controller
              name="username"
              render={({ field }) => <TextField label="Username" {...field} />}
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.username && <div>Username is required</div>}

          </div>
          <div>
            <Controller
              name="password"
              render={({ field }) => <TextField label="Password" type="password" {...field} />}
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.password && <div>Password is required</div>}

          </div>
          <div>
            <Controller
              name="email"
              render={({ field }) => <TextField label="Email" {...field} />}
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.email && <div>Email is required</div>}

          </div>

          <div>{registrationErrors}</div>

          <Button type="submit" disabled={submitting}>
            Register
          </Button>
          <Button type="button" disabled={submitting} onClick={() => reset(defaultValues)}>
            Reset
          </Button>
        </div>

      </form>
    </div>
  )
};

RegisterUser.propTypes = {
  registerUser: PropTypes.func,
  registrationErrors: PropTypes.object
}

export default RegisterUser;
