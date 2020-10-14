import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import CustomSelect from './../../IndividualComponents/CustomSelect'
import CustomButton from './../../IndividualComponents/CustomButton'
import {getAugmentMaterials} from './../../../actions/dataActions'
import BeatLoader from "react-spinners/BeatLoader";
import GeneralResultCard from '../../IndividualComponents/GeneralResultCard'
import { uid } from 'react-uid';

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
    {value: "Extra Augmentation Slots", label: "Extra Augmentation Slots"},
    {value: "Attack Increase", label: "Attack Increase"},
    {value: "Affinity Increase", label: "Affinity Increase"},
    {value: "Defense Increase", label: "Defense Increase"},
    {value: "Decoration Slot", label: "Decoration Slot"},
    {value: "Health Regen", label: "Health Regen"},
    {value: "Element/Status Effect Up", label: "Element/Status Effect Up"}
]

class AugmentPage extends React.Component{

    state = {
        rarity: 0,
        augment: 0,
        level: 0,
        loading: false,
        results: []
    }

    handleSelect = (e, property) => {
        this.setState({
            [property]: e.value
        })
    }

    loadAugmentMaterials = () => {
        this.setState({
            loading: true
        }, async () => {
            const augmentMats = await getAugmentMaterials(this.state.level, this.state.rarity, this.state.augment).catch(err => {
                console.error("An error occured")
            })

            if(augmentMats.status === 200 || augmentMats.status === 304){
                this.setState({
                    results: augmentMats.data.materials,
                    loading: false
                })
            }
            else{
                console.error("An error occured")
            }
        })
    }

    render(){

        const resultDisplay = this.state.results.map(item => (
            <GeneralResultCard
                key={uid(item)}
                hasCount={true}
                count={item.quantity}
                name={item.name}
                displayType={2}
                className={"augment"}
            >
                <div>
                    {item.description}
                </div>
            </GeneralResultCard>
        ))

        return(
            <div id="mainDivAugment">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="filtersDiv-Augment">
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
                    <CustomButton
                        id={"doSearchButton"}
                        border={"solid"}
                        textColor={"rgb(161, 184, 98)"}
                        height={"30px"}
                        width={"150px"}
                        borderColor={"rgb(164, 164, 164)"}
                        fontSize={"10pt"}
                        position={"absolute"}
                        buttonText={"Select"}
                        position={"relative"}
                        borderRadius={"10px"}
                        hoverColor={"rgb(74, 74, 74)"}
                        hoverTextColor={"rgb(161, 184, 98)"}
                        onClick={() => {this.loadAugmentMaterials()}}
                        justifySelf={"center"}
                        alignSelf={"center"}
                    ></CustomButton>
                </div>
                <div id="loaderDiv">
                    {this.state.loading ? <BeatLoader color="rgb(161, 184, 98)"></BeatLoader> : null}
                </div>
                <div id="resultsDivAugment">
                    {this.state.loading ? null : resultDisplay}
                </div>
            </div>
        )
    }
}

export default withRouter(AugmentPage);
