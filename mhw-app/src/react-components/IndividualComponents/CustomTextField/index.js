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
        '& label.Mui-focused': { //label color for if there is a label
            color: props => `${props.labelFocusedColour}`,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { 
                borderColor: props => `${props.regularBorderColour}`,//'rgb(164, 164, 164)',
            },
            '&:hover fieldset': { 
                borderColor: props => `${props.hoverBorderColour}`, //'rgb(161, 184, 98)'
            },
            '&.Mui-focused fieldset': {
                borderColor: props => `${props.focusedBorderColour}`,//'rgb(164, 164, 164)',
                borderWidth: props => `${props.borderWidthFocused}`
            },
        },
        width: props => `${props.width}`,
        top: props => `${props.top}`,
        left: props => `${props.left}`,
        position: props => `${props.position}`,
        float: props => `${props.float}`,
        gridColumnStart: props => `${props.gridColStart}`,
        gridColumnEnd: props => `${props.gridColEnd}`,
        gridRowStart: props => `${props.gridRowStart}`,
        gridRowEnd: props => `${props.gridRowEnd}`,
        alignSelf: props => `${props.alignSelf}`,
        justifySelf: props => `${props.justifySelf}`,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));




export default function CreateCustomTextField(props) {
    const classes = useStyles(props);
    const {placeholder, width, top, left, position, float,
           hoverBorderColour, regularBorderColour, focusedBorderColour, label,
           justifySelf, alignSelf, gridRowStart, gridRowEnd, gridColStart, gridColEnd,
           type, labelFocusedColour, borderWidthFocused, onChange, value, name, setFocus, onClick
          } = props
  
    return (
        <TextField
          className={classes.root}
          variant="outlined"
          label={label}
          type={type}
          onChange={onChange}
          value={value || ""}
          name={name}
          autoFocus={setFocus}
          onClick={onClick}
          id="custom-css-outlined-input"
        />
    );
  }

