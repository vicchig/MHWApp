import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import CustomSelect from './../../IndividualComponents/CustomSelect'

import './style.css'


const rarityOptions = [
    {value: 10, label: 10},
    {value: 11, label: 11},
    {value: 12, label: 12},
]

const levelOptions = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5}
]

const augmentOptions = [
    {value: 1, label: "Extra Augmentation Slots"},
    {value: 2, label: "Attack Increase"},
    {value: 3, label: "Affinity Increase"},
    {value: 4, label: "Defense Increase"},
    {value: 5, label: "Decoration Slot"},
    {value: 6, label: "Health Regen"},
    {value: 7, label: "Element/Status Effect Up"}
]

class AugmentPage extends React.Component{

    state = {
        rarity: 0,
        augment: 0,
        level: 0
    }

    handleSelect = (e, property) => {
        this.setState({
            [property]: e.value
        })
    }

    render(){

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="filtersDiv">
                    <CustomSelect
                        name="raritySelect" onChange={e => this.handleSelect(e, "rarity")} 
                        className="optionSelect" placeholder="Rarity" options={rarityOptions}
                        menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                        optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                        controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                        singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                        valueContainerColour="rgb(161, 184, 98)" isMulti={false}
                    >     
                    </CustomSelect>
                    <CustomSelect
                        name="augmentSelect" onChange={e => this.handleSelect(e, "augment")} 
                        className="optionSelect" placeholder="Augment" options={augmentOptions}
                        menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                        optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                        controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                        singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                        valueContainerColour="rgb(161, 184, 98)" isMulti={false}
                    >     
                    </CustomSelect>
                    <CustomSelect
                        name="levelSelect" onChange={e => this.handleSelect(e, "level")} 
                        className="optionSelect" placeholder="Level" options={levelOptions}
                        menuBackgroundColour="rgb(100, 100, 100)" menuBackgroundColour="rgb(100, 100, 100)" optionHoverBackgroundColour="rgb(120, 120, 120)"
                        optionColour="rgb(161, 184, 98)" controlBackgroundColour="rgb(61, 61, 61)"
                        controlBorderColor="rgb(100, 100, 100)" controlHoverBorderColor="rgb(161, 184, 98)"
                        singleValueColour="rgb(161, 184, 98)" placeholderColour="rgb(161, 184, 98)"
                        valueContainerColour="rgb(161, 184, 98)" isMulti={false}
                    >     
                    </CustomSelect>
                </div>
            </div>
        )
    }
}

export default withRouter(AugmentPage);
