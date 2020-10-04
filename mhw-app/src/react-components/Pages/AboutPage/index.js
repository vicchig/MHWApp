import React from 'react';
import { withRouter } from 'react-router-dom';
import WebsiteHeader from './../../IndividualComponents/WebsiteHeader'
import './style.css'


class AboutPage extends React.Component{
    render(){


        return(
            <div id="mainDivAbout">
                <WebsiteHeader appContext={this.props.parentContext}/>
                <h1 className="aboutHeader">About this Project</h1>
                <p className="aboutPara">
                    I enjoy playing Monster Hunter World from time to time with my friends, however we found that some information that comes up quite often is a little bit annoying to find in game or has to be searched for on various wikis. 
                    So I decided to put together this small website to address this problem and offer a way to make our MHW experience more enjoyable and efficient. This website combines functionalities for searching
                    for different kind of information that can be tedious in game such as figuring our Augmentation materials for the first time when all of them are just denoted by ??? or keeping track of how much of each 
                    material you need to craft multiple pieces of equipment from different sets. Hopefully it can be helpful to others as well.
                </p>
                <p className="aboutPara"><strong>PLEASE NOTE THAT THIS INFORMATION IS MEANT FOR MASTER RANK ONLY.</strong></p>
                <h1 className="aboutHeader">Skill to Deco Page</h1>
                <p className="aboutPara">
                    Here you can view what decorations provide a specific skill. That way it is easier to tell which ones you are still missing. There are various filters and sort options available on
                    this page in order to enable you to see only the information you want.
                </p>
                <h1 className="aboutHeader">Equipment Materials</h1>
                <p className="aboutPara">
                    Here you can select a list of armour pieces and weapons that you want to craft and see the total material counts required. In addition, you will also be able to tell which Monster
                    drops each material or where in the guiding lands it can be collected in the case of bones and crystals. This information can be found in the description. 
                </p>
                <h1 className="aboutHeader">Monster Info</h1>
                <p className="aboutPara">
                    On this page you can view various information about monsters and use the filters and sorting functionality to quickly see information for a desired subset of monsters. This page is 
                    mostly intended to be used when you want to, for example, find all all brute wyverns weak to ice quickly instead of going through your hunter notes. This page also offers a difficulty
                    score for most monsters. This is not a perfect measure, but it does take into account the monster's rank (stars), health, elemental weaknesses and speed run time data to determine how difficult a monster is.
                </p>
                <h1 className="aboutHeader">Augment Page</h1>
                <p className="aboutPara">
                    Here you can select the rarity of your weapon as well as the level of the augment you want and have the materials required for it displayed. The description of each material
                    lets you know where to obtain it from and the display has quantities required for each material. This is especially useful if you have not fought every single monster in the guiding lands
                    including tempered variants of every monster.
                </p>

            </div>
        )
    }
}

export default withRouter(AboutPage);
