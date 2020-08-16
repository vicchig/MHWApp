import React from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import {Clear} from '@material-ui/icons'
import './style.css'


class GeneralResultCard extends React.Component{

    render(){

        const {hasCloseButton, hasCount, hasIcon, iconSource, count, iconWidth, iconHeight, closeButtonClickHandler, name} = this.props
        console.log(require("./../../../Images/bannerImg.jpg"))

        const icon = (hasIcon ?? false ) ? <img src={iconSource}
                                                alt="Image Error"
                                                height={iconHeight}
                                                width={iconWidth}
                                                className={"cardIcon"}
                                           ></img> : null
        const countDisplay = (hasCount ?? false) ? <div className="countDiv">x<span className="cardCountText">{count}</span></div> : null
        const closeButton = (hasCloseButton ?? false) ? <IconButton
                                                            className={"cardIconButton"}
                                                            onClick={() => {}}
                                                         >
                                                            <Clear
                                                                width={"5pt"}
                                                            ></Clear>
                                                         </IconButton> : null

        return(
            <div className="mainCardDiv">
                <table className="cardTable">
                    <tbody className="cardTBody">
                        <tr className="cardRow">
                            <td className="cardSection1">
                                {countDisplay}
                                {icon}
                            </td>
                            <td className="cardItemNameSection">{name}</td>
                            <td className="cardSection2"> 
                                <div className="childDiv">{this.props.children}</div>
                            </td>
                            {hasCloseButton ? <td className="cardCloseButtonCell">{closeButton}</td> : null}

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(GeneralResultCard);
