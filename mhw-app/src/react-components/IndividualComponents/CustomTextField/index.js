import React from 'react';
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components';
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
    const {placeholder, width, top, left, position, float,
           hoverBorderColour, regularBorderColour, focusedBorderColour, label,
           justifySelf, alignSelf, gridRowStart, gridRowEnd, gridColStart, gridColEnd,
           type, labelFocusedColour, borderWidthFocused
          } = props

    const CustomTextField = withStyles({
        root: {
            '& label.Mui-focused': { //label color for if there is a label
                color: labelFocusedColour,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'green',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': { 
                    borderColor: regularBorderColour,//'rgb(164, 164, 164)',
                },
                '&:hover fieldset': { 
                    borderColor: hoverBorderColour, //'rgb(161, 184, 98)'
                },
                '&.Mui-focused fieldset': {
                    borderColor: focusedBorderColour,//'rgb(164, 164, 164)',
                    borderWidth: borderWidthFocused
                },
            },
            width: width,
            top: top,
            left: left,
            position: position,
            float: float,
            gridColumnStart: gridColStart,
            gridColumnEnd: gridColEnd,
            gridRowStart: gridRowStart,
            gridRowEnd: gridRowEnd,
            alignSelf: alignSelf,
            justifySelf: justifySelf,

        }
       
    })(TextField);

  
    return (
        <CustomTextField
          className={classes.margin}
          variant="outlined"
          label={label}
          type={type}
          id="custom-css-outlined-input"
        />
    );
  }