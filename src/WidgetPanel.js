import {Draggable} from "react-drag-and-drop";
import iconSearch from "./widget-icons/search.png";
import { useState } from "react/cjs/react.development";

function WidgetPanel() {

    const [widgetIcons, setWidgetIcons]=useState(['input', 'text']);
    const [showIcons, setShowIcons]=useState(['input', 'text']);

    /**
     * searchWidgetIcons
     * function to filter items to show by search text.
     * @param {*} e 
     */
    const searchWidgetIcons = (e)=>{
        var searchTxt=e.target.value;
        var icons=[];
        widgetIcons.forEach(txt => {
            if(txt.startsWith(searchTxt)){
                icons.push(txt)
            }
        });
        setShowIcons(icons)
    }

    return(
        <div className="widget-panel">
            <div className="search-panel">
                <input id="searchInput" placeholder="Search Widgets..." onChange={searchWidgetIcons}/>            
                <img src={iconSearch} style={{width:'20px',transform:'translate(-90px, -28px)'}}/>
            </div>
            <div className="widget-panel-description">
                <span id="description">Drag a widget and drop it on the Canvas.</span>
            </div>
            <div className="widget-panel-body">
            {
                showIcons.map((txt, i) =>
                    <Draggable className="draggable_widget_icon" type="tag" data={txt} key={i}>
                        <button className="widget_btn">
                            <img src={`icons/${txt}.png`} className="widget_icon" /><br />
                            {txt.toUpperCase()}
                        </button>
                    </Draggable>
                )
            }                
            </div>
        </div>
    );
}

export default WidgetPanel;