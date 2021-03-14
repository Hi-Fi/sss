import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash'


const layouts = [
  { label: 'A4, landscape', value: 'columns' },
  { label: 'A5 leaflet', value: 'leaflet' },
  { label: 'High leaflet', value: 'highLeaflet' }
]

const columns = [
  { label: '1 column', value: 1 },
  { label: '2 columns', value: 2 },
  { label: '3 columns', value: 3 },
  { label: '4 columns', value: 4 },
  { label: '5 columns', value: 5 }
]

const fontSizes = [
  { label: '8 pts', value: 8 },
  { label: '10 pts', value: 10 },
  { label: '12 pts', value: 12 },
  { label: '14 pts', value: 14 },
  { label: '16 pts', value: 16 }
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
  control
}) => {
  const labelId = `${name}-label`;
  return (
    <section id={name}>
      <label htmlFor={labelId}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <Checkbox
            {...props}
            id={labelId}
            checked={props.value}
            onChange={(e) => props.onChange(e.target.checked)}
          />
        )}
      />
    </section>
  )
}

const ControlledFileUpload = ({
  name,
  register,
  updateCoverFunc,
  currentImage,
  ...props
}) => {
  const labelId = `${name}-label`;
  const imageSet = currentImage.data && currentImage.data.length > 0
  return (
    <FormControl {...props}>
      <input
        accept="image/*"
        name={name}
        id={labelId}
        hidden
        type="file"
        onChange={updateCoverFunc}
      />
      <label htmlFor={labelId}>
        <Button variant="contained" color="primary" component="span">
          Upload cover image
        </Button>
        { imageSet &&
        <div>
          Current image: <img alt={currentImage.name} src={currentImage.data} className="w3-left w3-circle w3-margin-right" width="60px" height="100%" />
        </div>
        }
      </label>
    </FormControl>
  )
}

ControlledCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  control: PropTypes.object,
}

export default function LeafletInfo({ leafletInfo, storeLeafletInfo, printLeaflet, updateCoverImage }) {
  const formDefaultValues = {
    style: "columns",
    columns: 4,
    fontSize: 10,
    saveEvent: false,
    useCoverImage: false,
    coverImage: "",
    coverImageName: "",
    songsOnCover: false,
    emptyBack: false,
  }
  const { handleSubmit, control, register, submitting, watch, reset } = useForm({
    defaultValues: formDefaultValues
  });

  let value = watch()
  useEffect(() => {
    if (!isEqual(value, leafletInfo)) {
      const delayDebounceFn = setTimeout(() => {
        storeLeafletInfo(value)
      }, 3000)
      return () => clearTimeout(delayDebounceFn)
    }
  }, [value, leafletInfo, storeLeafletInfo])

  const onSubmit = data => {
    storeLeafletInfo(data)
    printLeaflet()
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
            control={control}
          />
        </div>
        <div>
          <Controller
            name="description"
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
                control={control}
              />
            </div>
            {useCoverImage &&
              <div>
                <ControlledFileUpload
                name="coverImageFile"
                register={register}
                updateCoverFunc={updateCoverImage}
                currentImage={{name: leafletInfo.coverImageName, data: leafletInfo.coverImage}}/>
              </div>
            }
            {!useCoverImage &&
              <div>
                <ControlledCheckbox
                  name="songsOnCover"
                  label="Put songs on the cover page"
                  control={control}
                />
              </div>
            }
            <div>
              <ControlledCheckbox
                name="emptyBack"
                label="Put songs on the back page"
                control={control}
              />
            </div>
          </div>
        }
        <div>
        <button type="submit" disabled={submitting}>
          Generate leaflet
        </button>
        <button type="button" disabled={submitting} onClick={() => reset(formDefaultValues)}>
          Reset form
        </button>
        </div>

      </div>
    </form>
  )
}

LeafletInfo.propTypes = {
  printLeaflet: PropTypes.func,
  storeLeafletInfo: PropTypes.func
}
