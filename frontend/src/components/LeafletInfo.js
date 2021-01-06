import React from 'react';
import { useForm, Controller } from "react-hook-form"
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types';


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

const ControlledSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

ControlledSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  control: PropTypes.object,
  defaultValue: PropTypes.string,
  children: PropTypes.array
}

const ControlledCheckbox = ({
  name,
  label,
  register
}) => {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={label}
      name={name}
      inputRef={register}
    />
  )
}

ControlledCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.func,
}

export default function LeafletInfo() {

  const { handleSubmit, control, register, submitting, reset, watch } = useForm({
    defaultValues: {
      style: layouts[0].value,
      fontSize: 10,
      columns: 4
    }
  });

  const onSubmit = data => {
    //props.saveSong(data)
    console.dir(data)
  };

  const isColums = watch("style") === "columns"
  const useCoverImage = watch("useCoverImage")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Leaflet basic information</h1>
        <div>
          <Controller
            name="event"
            as={TextField}
            control={control}
            label="Event"
            defaultValue=""
          />
        </div>
        <div>
          <ControlledCheckbox
            name="saveEvent"
            label="Save event to included songs"
            register={register}
          />
        </div>
        <div>
          <Controller
            name="desription"
            as={TextField}
            control={control}
            label="Description (e.g. date)"
            defaultValue=""
          />
        </div>
        <div>
          <ControlledSelect
            name="style"
            label="Style of leaflet"
            control={control}
          >
            {layouts.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </ControlledSelect>
        </div>
        <h2>Additional style settings</h2>
        <div>
        <ControlledSelect
            name="fontSize"
            label="Font size"
            control={control}
          >
            {fontSizes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </ControlledSelect>
        </div>
        {
          isColums &&
          <div>
            <ControlledSelect
              name="columns"
              label="Amount of columns"
              control={control}
            >
              {columns.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </ControlledSelect>
          </div>
        }
        {
          !isColums &&
          <div>
            <div>
              <ControlledCheckbox
                name="useCoverImage"
                label="Use cover image"
                register={register}
              />
            </div>
            {useCoverImage &&
              <div>
                <Controller
                  name="coverImage"
                  as={TextField}
                  control={control}
                  label="Cover image"
                  type="file"
                  accept="image/*"
                  defaultValue=""
                />
              </div>
            }
            {!useCoverImage &&
              <div>
                <ControlledCheckbox
                  name="songsOnCover"
                  label="Put songs on the cover page"
                  register={register}
                />
              </div>
            }
            <div>
              <ControlledCheckbox
                name="songsOnBackPage"
                label="Put songs on the back page"
                register={register}
              />
            </div>
          </div>
        }
        <div>
        <button type="submit" disabled={submitting}>
          Generate leaflet
        </button>
        <button type="button" disabled={submitting} onClick={reset}>
          Reset form
        </button>
        </div>
        
      </div>
    </form>
  )
}

LeafletInfo.propTypes = {
}
