import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, propTypes, formValueSelector } from 'redux-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select';

const layouts = [
  { label: 'A4, landscape', value: 'columns' },
  { label: 'A5 leaflet', value: 'booklet' },
  { label: 'High leaflet', value: 'highBooklet' }
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
  <FormControlLabel
    control={
    <Checkbox
      checked={input.value ? true : false}
      onChange={input.onChange}
    />
    }
    label={label}
    />
  )

const renderSelectField = (
  { input, label, meta: { touched, error }, values, ...custom },
) => (
  <FormControl error={touched && error}>
        <InputLabel>{label}</InputLabel>
    <Select
      native
      label={label}
      name={name}
      error={touched && error}
      {...input}
      {...custom}
    >
      {values.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
    </FormControl>
  );

const onSubmit = (event) => {
  event.preventDefault()
  console.log("Submit")
  console.dir(event)
}
let LeafletInfo = props => {
  const {reset, submitting, isColums, useCoverImage } = props
  return (
    <form onSubmit={onSubmit}>
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
        {isColums &&
          <div>
            <Field
              name="columns"
              component={renderSelectField}
              label="Amount of columns"
              values={columns}
            />
          </div>
        }
        {!isColums &&
          <div>
            <div>
              <Field
                name="useCoverImage"
                component={renderCheckboxField}
                label="Use cover image"
              />
            </div>
            {useCoverImage && 
              <div>
                <Field
                  name="coverImage"
                  component={renderTextField}
                  label="Cover image"
                  type="file"
                  accept="image/*"
                />
              </div>
            }
            {!useCoverImage &&
              <div>
                <Field
                  name="songsOnCover"
                  component={renderCheckboxField}
                  label="Put songs on the cover page"
                />
              </div>
            }
            <div>
              <Field
                name="songsOnBackPage"
                component={renderCheckboxField}
                label="Put songs on the back page"
              />
            </div>
          </div>
        }
        <button type="submit" disabled={submitting}>
          Generate leaflet
        </button>
        <button type="button" disabled={submitting} onClick={reset}>
          Reset form
        </button>
      </div>
    </form>
  )
}

LeafletInfo.propTypes = {
  ...propTypes
}

const selector = formValueSelector("LeafletInfo")

LeafletInfo = reduxForm({
  destroyOnUnmount: false,
  // a unique name for the form
  form: 'LeafletInfo'
})(LeafletInfo)

LeafletInfo = connect(state => {
  const isColums = selector(state, "style") == "columns"
  const useCoverImage = selector(state, "useCoverImage")
  return {
    isColums,
    useCoverImage
  }
})(LeafletInfo)

export default LeafletInfo