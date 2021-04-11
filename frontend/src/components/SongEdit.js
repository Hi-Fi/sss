import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from "react-hook-form"
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

const ControlledAutocomplete = ({options, onChange, name, label, register, watch}) => {
  const value = watch(name) || [];


  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <Autocomplete
      value={value}
      multiple
      id={name}
      name={name}
      options={options}
      // Has to call explicitly with name, as clears are not sending the name in the event
      onChange={(_, value) => onChange(name, value)}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} name={name} label={label}/>
      )}
    />
  )
}

ControlledAutocomplete.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  watch: PropTypes.func
}

export default function SongEdit(props) {
  const { handleSubmit, control, reset, submitting, register, watch, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "verses"
  });
  const onSubmit = data => {
    props.saveSong(data)
  };

  if (fields.length === 0) {
    append({ lyrics: "" })
  }

  const handleChange = (name, value) => {
    console.log(name, value)
    setValue(name, value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Song basic information</h1>
        <div>
          <Controller
            name="title"
            render={({ field }) => <TextField label="Song Name" {...field} />}
            control={control}
            defaultValue=""
          />
        </div>
        <div>
          {fields.map((item, index) => (
            <div key={item.id}>
              <h4>
                Verse #{index + 1}
              </h4>
              <Controller
                name={`verses[${index}].lyrics`}
                control={control}
                render={({ field }) => <TextField {...field} />}
                multiline
                defaultValue=""
              />
              {fields.length > 1 && <FontAwesomeIcon
                icon={faMinusCircle}
                title="Remove Verse"
                onClick={() => remove(index)}
              />}
            </div>
          )
          )}
          <button
            type="button"
            onClick={() => append({ lyrics: "" })}
          >
            Add new verse
          </button>
        </div>
        <div>
          <Controller
            name="extraInfo"
            render={({ field }) => <TextField label="Extra Info" {...field} />}
            control={control}
            multiline
            defaultValue=""
          />
        </div>
        <h1>Additional information</h1>
        <div>
          <Controller
            name="melody.melody"
            render={({ field }) => <TextField label="Melody" {...field} />}
            control={control}
            defaultValue=""
          />
        </div>
        <div>
          <ControlledAutocomplete
            options={[]}
            register={register}
            watch={watch}
            label="Composer"
            name="composers"
            onChange={handleChange}
          />
        </div>
        <div>
          <ControlledAutocomplete
            options={[]}
            register={register}
            watch={watch}
            label="Lyricist"
            name="lyricists"
            onChange={handleChange}
          />
        </div>
        <div>
          <ControlledAutocomplete
            options={[]}
            register={register}
            watch={watch}
            label="Arranger"
            name="arrangers"
            onChange={handleChange}
          />
        </div>
        <div>
          <ControlledAutocomplete
            options={[]}
            register={register}
            watch={watch}
            label="Tags"
            name="tags"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={submitting}>
          Save song
        </button>
        <button type="button" disabled={submitting} onClick={reset}>
          Reset form
        </button>
        {props.errors && props.errors[props.songId] && <div>Error at submit of form. Error message: {props.errors[props.songId]}</div>}
        </div>
    </form>
  )
}

SongEdit.propTypes = {
  saveSong: PropTypes.func,
  errors: PropTypes.object,
  songId: PropTypes.string,
}
