import React, { Component } from 'react';
import {PropTypes} from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';


const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    {...input}
    {...custom}
  />
)

const renderVerses = ({ fields, meta: { error, submitFailed } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Verse
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    </li>
    {fields.map((verse, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Verse"
          onClick={() => fields.remove(index)}
        />
        <h4>
          Verse #{index + 1}
        </h4>
        <Field
          name={`${verse}.lyrics`}
          type="text"
          component={renderTextField}
          multiline
          label="{'Verse'+index + 1}"
        />
      </li>
    )}
  </ul>

let SongEdit = props => {
  const {handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
    <div>
      <h1>Song basic information</h1>
        <div>
        <Field
          name="songName"
          component={renderTextField}
          label="Song Name"
        />
      </div>
      <div>
        <Field
          name="extraInfo"
          component={renderTextField}
          multiline
          label="Extra Info"
        />
      </div>
      </div>
    </form>
  )
}

SongEdit = reduxForm({
  // a unique name for the form
  form: 'songEdit'
})(SongEdit)

export default SongEdit