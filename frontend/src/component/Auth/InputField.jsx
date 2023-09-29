import { IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useField, Field, ErrorMessage } from 'formik'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import useStyles from './inputfield.style';

const InputField = ({ ...props }) => {
    const classes = useStyles();
    const [field, meta] = useField(props);
    const [showpass, setshowpass] = useState(false);

    return (
        <Stack direction={'column'} className={classes.singleInput}>
            <label htmlFor={props.name} className={classes.inputLabel}>{props.label}</label>
            <Field
                id={props.name}
                autoComplete='off'
                className={`${classes.input} ${meta.touched && meta.error ? classes.inputerror : ""}`}
                name={props.name}
                type={props.showpassicon && !showpass ? props.type : "text"}
                placeholder={props.placeholder} />
            {props.showpassicon && !showpass ?
                <IconButton onClick={() => setshowpass(!showpass)} sx={{
                    position: 'absolute',
                    top: '42%',
                    right: '0',
                }}>
                    <AiFillEye color='lightseagreen' size={20} />
                </IconButton> : null
            }
            {props.showpassicon && showpass ?
                <IconButton onClick={() => setshowpass(!showpass)} sx={{
                    position: 'absolute',
                    top: '42%',
                    right: '0',
                }}>
                    <AiFillEyeInvisible color='lightseagreen' size={20} />
                </IconButton> : null
            }
            <ErrorMessage component={"div"} name={field.name} className={classes.error} />
        </Stack >
    );
}


export default InputField;
