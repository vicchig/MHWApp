import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import SearchBar from './../../IndividualComponents/SearchBar'
import {getData} from '../../../actions/dataActions'
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

class MatsPage extends React.Component{

    state = {
        searchbarText: "",
        selectedItems: [],
        materialTallies: {},
        nextMatCardID: 1,
        loading: false
    }

    updateMaterialTallies = (craftingData, type, item) => {
        let newMaterialTallies = this.state.materialTallies
        if(type === "armour"){
            this.updateMaterialTally(craftingData.materials, newMaterialTallies)
        }
        else{
            if(item.crafting.craftable){
                this.updateMaterialTally(craftingData.craftingMaterials, newMaterialTallies)
            }
            else{
                this.updateMaterialTally(craftingData.upgradeMaterials, newMaterialTallies)
            }
        }

        return newMaterialTallies
    }

    updateMaterialTally = (materials, tally) => {
        materials.forEach(material => {
            if(tally[material.item.name] === undefined){
                tally[material.item.name] = {
                    description: material.item.description,
                    id: material.item.id,
                    count: material.quantity
                }
            }
            else{
                tally[material.item.name].count += material.quantity
            }
        })
    }

    handleSearchSelect = (e) => {
        this.setState({
            searchbarText: e.value.name,
            loading: true
        }, async () => {
            const currentlySelected = this.state.selectedItems
            let item, res = null
            let type = ""

            if(armourTypes.includes(e.value.type)){
                type = "armour"
                res = await getEquipment("armor", armorProjection, {id: e.value.id}).catch(err => {
                    console.error("An error occurred while waiting for server response. \n\n" + err)
                })
            }
            else{ //should not be possible for something that is of not type 'armour' also not be of type 'weapon'
                type = "weapon"
                res = await getEquipment("weapons", weaponProjection, {id: e.value.id}).catch(err => {
                    console.error("An error occurred while waiting for server response. \n\n" + err)
                })
            }
            if(res.status !== 200 && res.status !== 304) processErrorWNav(this, res.status, res.errorMsg)
            else item = res.data.item[0] //the endpoint returns an array even if it finds only a single item
            currentlySelected.push({...item, internalID: this.state.nextMatCardID})

            this.setState({
                    selectedItems: currentlySelected,
                    materialTallies: this.updateMaterialTallies(item.crafting, type, item),
                    nextMatCardID: this.state.nextMatCardID + 1,
                    loading: false
            })
        })
    }

    removeMatCardHandler = (id) => {
        const removedItem = this.state.selectedItems.filter(item => item.internalID === id)[0]
        const newSelectedItems = this.state.selectedItems.filter(item => item.internalID !== id)
        const newMaterialTallies = this.state.materialTallies

        const materials = (removedItem.crafting.materials ?? (removedItem.crafting.craftingMaterials ?? removedItem.crafting.upgradeMaterials))
        materials.forEach(material => {
            newMaterialTallies[material.item.name].count -= material.quantity
        })

        this.setState({
            selectedItems: newSelectedItems,
            materialTallies: newMaterialTallies
        })
    }

    render(){
        const selection = this.state.selectedItems.map(item => (
            (
                <GeneralResultCard
                    key={uid(item)}
                    hasCount={false}
                    hasCloseButton={true}
                    hasIcon={(item.assets === null || (item.assets.icon ?? true)) ? false : true}
                    iconWidth={"50vw"}
                    iconHeight={"70vh"}
                    iconSource={item.assets?.icon ?? null}
                    name={item.name}
                    closeButtonClickHandler={this.removeMatCardHandler}
                    id={item.internalID}
                >
                    <div>{"Required materials:"}</div>
                    <ul>
                        {(() => {
                            //apparently for armour the API sometimes uses crafting.materials and sometimes crafting.craftingMaterials
                            if(item.crafting.craftingMaterials){
                                return (item.crafting.craftingMaterials.map(mat => (
                                    <li key={uid(mat)}>{"x"+mat.quantity + " " + mat.item.name}</li>
                                )))
                            }
                            else if(item.crafting.materials){
                                return (item.crafting.materials.map(mat => (
                                    <li key={uid(mat)}>{"x"+mat.quantity + " " + mat.item.name}</li>
                                )))
                            }
                        })()}
                        
                        {/*another small hack, weapons that are only reachable 
                           by upgrading a previous version will have no crafting materials, but they will have 
                           upgrade materials which are basically the same thing as long as you have a previous 
                           version of the weapon

                           NOTE: Might want to make an option for getting materials and including in the list all weapons
                                 that lead to the selected weapon?
                        */}
                        {item.crafting.upgradeMaterials !== undefined ? item.crafting.upgradeMaterials.map(mat => (
                            <li key={uid(mat)}>{"x"+mat.quantity + " " + mat.item.name}</li>
                        )) : null}
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
                                            name={key}
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
                    ></SearchBar>
                </div>
                <div id="loadingDiv">
                    {this.state.loading ? <BeatLoader color="rgb(161, 184, 98)"></BeatLoader> : null}
                </div>
                <div id="selectionDiv">
                    {selection}
                </div>
                {materialTallyDisplay}
            </div>
        )
    }
}

export default withRouter(MatsPage);
