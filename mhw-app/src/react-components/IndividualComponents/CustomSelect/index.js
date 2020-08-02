import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select'
import "./style.css"

class CustomSelect extends React.Component{


    customStyle = {
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: this.props.menuBackgroundColour
          
        }),
        option: (provided, state) => ({
          padding: 20,
          "&:hover": {
            backgroundColor: this.props.optionHoverBackgroundColour
          },
          color: this.props.optionColour
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: this.props.controlBackgroundColour,
            borderColor: this.props.controlBorderColor,
            "&:hover": {
                borderColor: this.props.controlHoverBorderColor
            },
            boxShadow: "none",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: this.props.singleValueColour
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: this.props.placeholderColour
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            color: this.props.valueContainerColour
        }),
        input: (provided, state) => ({
            ...provided,
        })
    }
    
    render(){
        const {name, onChange, className, placeholder, options, isSearchable} = this.props

        return(
           <Select
                name={name ?? ""}
                onChange={(e) => onChange(e)}
                className={className ?? ""}
                placeholder={placeholder ?? "Select..."}
                styles={this.customStyle}
                options={options ?? []}
                isSearchable={isSearchable ?? false}
           ></Select>
        )
    }
}

export default withRouter(CustomSelect);