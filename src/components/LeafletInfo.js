import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem';
import SelectField from '@material-ui/core/Select';



// const [state, setState] = React.useState({
//   layout: "columns",
//   columns: "4",
//   fontSize: "10",
//   saveEvent: false,
//   coverImage: false,
//   songsOnCover: false,
//   songsOnBack: false,
// });

const layouts = [
  { label: 'A4, landscape', template: 'columns' },
  { label: 'A5 leaflet', template: 'booklet' },
  { label: 'High leaflet', template: 'highBooklet' }
]

const columns = [
  { label: '1 column', value: '1' },
  { label: '2 columns', value: '2' },
  { label: '3 columns', value: '3' },
  { label: '4 columns', value: '4' },
  { label: '5 columns', value: '5' }
]

const fontSizes = [
  { label: '8 pts', value: '8' },
  { label: '10 pts', value: '10' },
  { label: '12 pts', value: '12' },
  { label: '14 pts', value: '14' },
  { label: '16 pts', value: '16' }
];

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      placeholder={label}
      label={label}
      error={touched && error}
      {...input}
      {...custom}
    />
  )

const renderCheckboxField = ({
  input,
  label
}) => (
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onChange={input.onChange}
    />
  )

const renderSelectField = (
  { input, label, meta: { touched, error }, values, ...custom },
) => (
    <SelectField
      label={label}
      error={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={values.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      {...custom}
    />
  );

// const handleChange = (event) => {
//   console.dir(event)
//   setState({ ...state, [event.target.name]: event.target.checked });
// };

let LeafletInfo = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Leaflet basic information</h1>
        <div>
          <Field
            name="event"
            component={renderTextField}
            label="Event"
          />
        </div>
        <div>
          <Field
            name="save_event"
            component={renderCheckboxField}
            label="Save event to included songs"
            disabled
          />
        </div>
        <div>
          <Field
            name="description"
            component={renderTextField}
            label="Description (e.g. date)"
          />
        </div>
        <div>
          <Field
            name="style"
            component={renderSelectField}
            label="Style of leaflet"
            values={layouts}
          />
        </div>
        <h2>Additional style settings</h2>
        <div>
          <Field
            name="fontSize"
            component={renderSelectField}
            label="Font size"
            values={fontSizes}
          />
        </div>
        <div>
          <Field
            name="columns"
            component={renderSelectField}
            label="Amount of columns"
            values={columns}
          />
        </div>
        <div>
          <Field
            name="useCoverImage"
            component={renderCheckboxField}
            label="Use cover image"
          />
        </div>
        <div>
          <Field
            name="songsOnCover"
            component={renderCheckboxField}
            label="Put songs on the cover page"
          />
        </div>
        <div>
          <Field
            name="songsOnBackPage"
            component={renderCheckboxField}
            label="Put songs on the back page"
          />
        </div>
      </div>
    </form>
  )
}

LeafletInfo = reduxForm({
  // a unique name for the form
  form: 'LeafletInfo'
})(LeafletInfo)

export default LeafletInfo