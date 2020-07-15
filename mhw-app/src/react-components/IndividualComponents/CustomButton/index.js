import React from 'react';

import { styled } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

class CustomButton extends React.Component{

    render(){
        const {buttonText, borderColor, width, height, padding, boxShadow, background,
               border, borderRadius, textColor, backgroundColor, variant,
               disableElevation, top, left, display, fontSize, onClick, position, disabled, margin,
               hoverColor, hoverTextColor,  float, gridColStart, gridColEnd,
               gridRowStart, gridRowEnd, alignSelf, justifySelf} = this.props


        const CustomButton = styled(Button)({
            background: background,
            border: border,
            borderRadius: borderRadius,
            boxShadow: boxShadow,
            color: textColor,
            height: height,
            width: width, 
            padding: padding,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            top: top,
            left: left,
            fontSize: fontSize,
            position: position,
            margin: margin,
            display: display,
            "&:hover": {
                color: hoverTextColor,
                background: hoverColor
            },
            float: float,
            gridColumnStart: gridColStart,
            gridColumnEnd: gridColEnd,
            gridRowStart: gridRowStart,
            gridRowEnd: gridRowEnd,
            justifySelf: justifySelf,
            alignSelf: alignSelf
        })
        return (
            <CustomButton
                variant={variant}
                disableElevation={disableElevation}
                onClick={onClick}
                disabled={disabled}
            >
                {buttonText}
            </CustomButton>
        )
    }
}

export default CustomButton