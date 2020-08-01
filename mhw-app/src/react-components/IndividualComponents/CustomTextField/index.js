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
                borderWidth: props => `${props.borderWidthHover}`,
            },
            '&.Mui-focused fieldset': {
                borderColor: props => `${props.focusedBorderColour}`,//'rgb(164, 164, 164)',
                borderWidth: props => `${props.borderWidthFocused}`,

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
        marginBottom: props => `${props.marginBottom ?? "0pt"}`,
    },
    margin: {
        margin: theme.spacing(1),
    },
    
}));




export default function CreateCustomTextField(props) {
    const classes = useStyles(props);
    const {label,type, id, onChange, value, name, setFocus, onClick, multiline, rows, placeholder, onBlur} = props
  
    return (
        <TextField
          className={classes.root}
          variant="outlined"
          label={label ?? ""}
          type={type ?? "text"}
          onChange={onChange ?? (() => {})}
          value={value || ""}
          name={name ?? ""}
          autoFocus={setFocus ?? false}
          onClick={onClick ?? (() => {})}
          multiline={multiline ?? false}
          rows={rows ?? 1}
          placeholder={placeholder ?? ""}
          onBlur={onBlur ?? (() => {})}
          onClick={onClick ?? (() => {})}
          id={id ?? "css-custom-outlined-input"}
        />
    );
  }

