import React from 'react';
import { withRouter } from 'react-router-dom';
import {getSkill} from '../../../actions/mhwActions'
import { uid } from 'react-uid';
import {processErrorWNav} from '../../../actions/utilities'
import "./style.css"

class ResultCard extends React.Component{

    state = {
        loading: false,
        skillObj: null
    }

    componentDidMount = () => {
        this.setState({
            loading: true
        }, async () => {
            const skillInfo = await getSkill({id: this.props.skill.skill}).catch(err => {
                console.error("An error occurred while waiting for server response. \n\n" + err)
            })
            if(skillInfo.status !== 200 && skillInfo.status !== 304) processErrorWNav(this, skillInfo.status, skillInfo.errorMsg)
            else{
                this.setState({
                    skillObj: {
                                level: this.props.skill.level,
                                description: skillInfo.data.skill.description,
                                ranks: skillInfo.data.skill.ranks,
                                name: skillInfo.data.skill.name
                              },
                    loading: false
                }) 
            } 
        })
    }

    render(){
        let skillDisplayCards = this.state.loading ? null : 
            


            
                        <div className="skillCardDiv">
                            <h2 className={"skillFloatHeading"}>{this.state.skillObj?.name}</h2>
                            <div className={"skillCardDescription"}>{this.state.skillObj?.description}</div>
                            <table cellspacing={"0"} className={"skillCardTable"}>
                                <tbody>
                                    {this.state.skillObj?.ranks.map((rank, index) => (() => {
                                        if(index === this.state.skillObj.level - 1){
                                            if(index === 0){
                                                return <tr key={uid(rank)} className={"skillCardRow"}>
                                                    <td className={"skillCardRankDescriptionTopLevel"}>{`Level ${index + 1}: ` + rank.description}</td>
                                                </tr>
                                            }
                                            else{
                                                return <tr key={uid(rank)} className={"skillCardRow"}>
                                                    <td className={"skillCardRankDescriptionLevel"}>{`Level ${index + 1}: ` + rank.description}</td>
                                                </tr>
                                            }
                                        }
                                        else if(index === 0) {
                                            return (
                                                <tr key={uid(rank)} className={"skillCardRow"}>
                                                    <td className={"skillCardRankDescriptionTop"}>{`Level ${index + 1}: ` + rank.description}</td>
                                                </tr>
                                            ) 
                                        }
                                        else if(index === this.state.skillObj?.ranks.length - 1){
                                            return <tr key={uid(rank)} className={"skillCardRow"}>
                                                        <td className={"skillCardRankDescriptionBottom"}>{`Level ${index + 1}: ` + rank.description}</td>
                                                    </tr>
                                        }
                                        else{
                                            return (
                                                <tr key={uid(rank)} className={"skillCardRow"}>
                                                    <td className={"skillCardRankDescription"}>{`Level ${index + 1}: ` + rank.description}</td>
                                                </tr>
                                            )
                                        }
                                    })()
                                    
                                        
                                    )}
                                </tbody>
                            </table>
                        </div>
            
                                

        
            
        return(
            <div className="resultCardMainDiv">
                {skillDisplayCards}
            </div>   
        )
    }
}

export default withRouter(ResultCard);