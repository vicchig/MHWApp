import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData, getEquipmentInfo} from '../../../actions/dataActions'
import {getEquipment} from '../../../actions/mhwActions'
import {processErrorWNav} from '../../../actions/utilities'
import GeneralResultCard from '../../IndividualComponents/GeneralResultCard'
import { uid } from 'react-uid';
import BeatLoader from "react-spinners/BeatLoader";
import './style.css'

const weaponProjection = {
    id: true, name: true, type: true, rarity: true,
    crafting: true, assets: true
}

const armorProjection = {
    id: true, name: true, type: true, rarity: true,
    crafting: true, rank: true, assets: true
}

const armourTypes = ["chest", "head", "waist", "legs", "gloves"]
const equipmentToIconMap = {
    "insect-glaive": "./../../../Images/ig.png",
    "great-sword": "./../../../Images/gs.png",
    "bow": "./../../../Images/b.png",
    "switch-axe": "./../../../Images/sa.webp",
    "long-sword": "./../../../Images/ls.jpg",
    "sword-and-shiled": "./../../../Images/sns.png",
    "dual-blades": "./../../../Images/db.png",
    "hammer": "./../../../Images/h.png",
    "hunting-horn": "./../../../Images/hh.png",
    "lance": "./../../../Images/l.png",
    "gunlance": "./../../../Images/gl.webp",
    "charge-blade": "./../../../Images/cb.webp",
    "light-bowgun": "./../../../Images/lbg.png",
    "heavy-bowgun": "./../../../Images/hbg.png",
    "head": "",
    "chest": "",
    "waist": "",
    "gloves": "",
    "legs": ""
}

class MatsPage extends React.Component{

    state = {
        searchbarText: "",
        selectedItems: [],
        materialTallies: {},
        nextMatCardID: 1,
        loading: false
    }

    updateMaterialTally = (materials) => {
        let tally = this.state.materialTallies
        materials.forEach(material => {
            if(tally[material.item.name] === undefined){
                tally[material.item.name] = {
                    description: material.item.description,
                    id: material.item.id,
                    count: material.quantity,
                    rarity: material.item.rarity
                }
            }
            else{
                tally[material.item.name].count += material.quantity
            }
        })

        return tally
    }

    handleSearchSelect = (e) => {
        this.setState({
            searchbarText: e.value.name,
            loading: true
        }, async () => {
            const currentlySelected = this.state.selectedItems
            let item, res = null

            res = await getEquipmentInfo(e.value.name, e.value.type).catch(err => {
                console.error("An error occurred while waiting for server response. \n\n" + err)
            })
            
            if(res.status !== 200 && res.status !== 304) {processErrorWNav(this, res.status, res.errorMsg); return;}
            else item = res.data.item[0] //the endpoint returns an array even if it finds only a single item

            currentlySelected.push({...item, internalID: this.state.nextMatCardID})
            
            this.setState({
                    selectedItems: currentlySelected,
                    materialTallies: this.updateMaterialTally(item.crafting.materials),
                    nextMatCardID: this.state.nextMatCardID + 1,
                    loading: false
            })
        })
    }

    removeMatCardHandler = (id) => {
        const removedItem = this.state.selectedItems.filter(item => item.internalID === id)[0]
        const newSelectedItems = this.state.selectedItems.filter(item => item.internalID !== id)
        const newMaterialTallies = this.state.materialTallies

        let materials = removedItem.crafting.materials

        materials.forEach(material => {
            newMaterialTallies[material.item.name].count -= material.quantity
        })

        this.setState({
            selectedItems: newSelectedItems,
            materialTallies: newMaterialTallies
        })
    }

    convertRarityToRank = (rarity) => {
        if(rarity >= 1 && rarity <= 4){
            return "LR"
        }
        else if(rarity >= 5 && rarity <= 8){
            return "HR"
        }
        else{
            return "MR"
        }
    }

    getEquipmentIcon = (type) => {
        switch(type){
            case "insect-glaive": 
                return require("./../../../Images/ig.png")
            case "great-sword": 
                return require("./../../../Images/gs.png")
            case "bow": 
                return require("./../../../Images/b.png")
            case "switch-axe": 
                return require("./../../../Images/sa.webp")
            case "long-sword": 
                return require("./../../../Images/ls.png")
            case "sword-and-shield": 
                return require("./../../../Images/sns.png")
            case "dual-blades": 
                return require("./../../../Images/db.png")
            case "hammer": 
                return require("./../../../Images/h.png")
            case "hunting-horn": 
                return require("./../../../Images/hh.png")
            case "lance": 
                return require("./../../../Images/l.png")
            case "gunlance": 
                return require("./../../../Images/gl.webp")
            case "charge-blade": 
                return require("./../../../Images/cb.webp")
            case "light-bowgun": 
                return require("./../../../Images/lbg.webp")
            case "heavy-bowgun": 
                return require("./../../../Images/hbg.webp")
            case "head":
                return require("./../../../Images/helmet.png")
            case "chest":
                return require("./../../../Images/chest.png")
            case "waist":
                return require("./../../../Images/waist.png")
            case "gloves":
                return require("./../../../Images/gloves.png")
            case "legs":
                return require("./../../../Images/legs.png")
            default:
                return null
        }
    }
    

    render(){
        const selection = this.state.selectedItems.map(item => (
            (
                <GeneralResultCard
                    key={uid(item)}
                    hasCount={false}
                    hasCloseButton={true}
                    hasIcon={true}
                    iconWidth={"50vw"}
                    iconHeight={"70vh"}
                    iconSource={item?.assets?.icon ?? this.getEquipmentIcon(item.type)}
                    name={item.name + " (" + this.convertRarityToRank(item.rarity) + ")"}
                    closeButtonClickHandler={this.removeMatCardHandler}
                    id={item.internalID}
                    displayType={1}
                >
                    <div>{"Required materials:"}</div>
                    <ul>
                        {(() => {
                                return (item.crafting.materials.map(mat => (
                                    <li key={uid(mat)}>{"x"+mat.quantity + " " + mat.item.name}</li>
                                )))
                        })()}
                    </ul>
                </GeneralResultCard>
            ))
        )

        const materialTallyDisplay = (() => {
            return (
                <div id="materialTallyDiv">
                    {
                        (() => {
                            let tallies = []
                            let keys = Object.keys(this.state.materialTallies)
                            keys.forEach(key => {
                                if(this.state.materialTallies[key].count > 0){
                                    tallies.push(
                                        <GeneralResultCard
                                            key={uid(key)}
                                            hasCount={true}
                                            count={this.state.materialTallies[key].count}
                                            name={key + " (" + this.convertRarityToRank(this.state.materialTallies[key].rarity) +")"}
                                            displayType={2}
                                        >
                                            <div>
                                                {this.state.materialTallies[key].description}
                                            </div>
                                        </GeneralResultCard>
                                    )
                                }
                            })
                            return tallies
                        })()
                    }
                </div>
            )
        })()

        return(
            <div id="mainDiv">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <div id="searchbarDiv">
                    <SearchBar id={"searchbar1"} textFieldID={"searchbar"} buttonText={"Add"} searchFunction={getData} searchCategory={"equipmentNames"}      
                               parentContext={this} dataObjectName={"dataList"} onSetSelect={this.handleSearchSelect} placeholder={"Select a piece of equipment..."}
                               searchObjectProperties={["name", "type"]}
                    ></SearchBar>
                </div>
                <div id="loadingDiv">
                    {this.state.loading ? <BeatLoader color="rgb(161, 184, 98)"></BeatLoader> : null}
                </div>
                <div id="selectionResultsDiv">
                    <h1 id="selectionHeader">Selection</h1>
                    <h1 id="totalMatsHeader">Total Materials Required</h1>
                    <div id="selectionDiv">{selection}</div>
                    {materialTallyDisplay}
                </div>
            </div>
        )
    }
}

export default withRouter(MatsPage);
