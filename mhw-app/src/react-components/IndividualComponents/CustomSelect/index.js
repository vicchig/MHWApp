import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select'
import "./style.css"

class CustomSelect extends React.Component{


    customStyle = {
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: this.props.menuBackgroundColour//"rgb(100, 100, 100)",
          
        }),
        option: (provided, state) => ({
          padding: 20,
          "&:hover": {
            backgroundColor: this.props.optionHoverBackgroundColour//"rgb(120, 120, 120)"
          },
          color: this.props.optionColour//"rgb(161, 184, 98)",
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: this.props.controlBackgroundColour,//"rgb(61, 61, 61)",
            borderColor: this.props.controlBorderColor,//"rgb(100, 100, 100)",
            "&:hover": {
                borderColor: this.props.controlHoverBorderColor//"rgb(161, 184, 98)" 
            },
            boxShadow: "none",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: this.props.singleValueColour//"rgb(161, 184, 98)",
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: this.props.placeholderColour//"rgb(161, 184, 98)",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            color: this.props.valueContainerColour//"rgb(161, 184, 98)",
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