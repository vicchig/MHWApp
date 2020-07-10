import React from 'react';
import TextField from '@material-ui/core/TextField'
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme
  } from '@material-ui/core/styles';

import './style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));




export default function CreateCustomTextField(props) {
    const classes = useStyles();
    const {placeholder, width, top, left, position, float} = props

    const CustomTextField = withStyles({
        root: {
            '& label.Mui-focused': {
                color: 'green',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'green',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'rgb(164, 164, 164)',
                },
                '&:hover fieldset': {
                    borderColor: 'rgb(161, 184, 98)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'rgb(164, 164, 164)',
                },
            },
            width: width,
            top: top,
            left: left,
            position: position,
            float: float
        },
        
       
    })(TextField);
  
    return (
        <CustomTextField
          className={classes.margin}
          variant="outlined"
          placeholder={placeholder}
          id="custom-css-outlined-input"
        />
    );
  }