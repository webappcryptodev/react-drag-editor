import * as React from "react";
import { useState } from "react";
import { Droppable } from "react-drag-and-drop";
import InputTextComponent from "./components/InputTextComponent";
import LabelComponent from "./components/LabelComponent";

function WidgetBoard() {

    const [isEditing, setEditingState]=useState(false);
    const [InputsOnCanvos, setInputsOnCanvos] = useState([]);
    const [LabelsOnCanvos, setLabelsOnCanvos] = useState([]);

    /**
    * checkOverlap
    * function to check the overlap.
    * this is called by draggable components.
     */
    const checkOverlap = () =>{
        
        let points = document.querySelectorAll('.draggable_widget');
        let rightPos = (elem) => elem.getBoundingClientRect().right;
        let leftPos = (elem) => elem.getBoundingClientRect().left;
        let topPos = (elem) => elem.getBoundingClientRect().top;
        let btmPos = (elem) => elem.getBoundingClientRect().bottom;

        let checkArray=[];
        
        for(let i = 0 ; i < points.length ; i++)
            checkArray[i] = false; 

        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                let isOverlapping = !(
                    rightPos(points[i]) < leftPos(points[j]) ||
                    leftPos(points[i]) > rightPos(points[j]) ||
                    btmPos(points[i]) < topPos(points[j]) ||
                    topPos(points[i]) > btmPos(points[j])
                );

                if (isOverlapping && j !== i) {
                    checkArray[i] = true;
                }
            }
        }
        for(let i = 0 ; i < points.length ; i++) {
            if(checkArray[i] == true) points[i].children[0].style.backgroundColor="red";
            else points[i].children[0].style.backgroundColor="white";
        }
    }

    /** 
    * onDrop
    * function to add draggable component to board.
    * this is called when drop event is triggered.
    * @param {*} event
    * @param {*} data
     */
    const onDrop =(event, data) => {

        if(!isEditing){
            setEditingState(true);
        }
        if (event.tag === "input") {
            const id=InputsOnCanvos.length;
            const pos={
                top:data.clientY,
                left:data.clientX,
            }
            setInputsOnCanvos([...InputsOnCanvos, <InputTextComponent  pos={pos} key={id} checkOverLap={checkOverlap} />]);
        }
        if (event.tag === "text") {
            const id=LabelsOnCanvos.length;
            const pos={
                top:data.clientY,
                left:data.clientX,
            }
            setLabelsOnCanvos([...LabelsOnCanvos, <LabelComponent  pos={pos}  key={id}  checkOverLap={checkOverlap}/>]);
        }
    }

    return (
        <Droppable
            style={{ height: "100%" }}
            types={["tag"]} // <= allowed drop types
            onDrop={onDrop}
            >
            <div id="board" className={isEditing?"board edit_board": "board"}>
                {
                    !isEditing&&(
                        <p id="board_description">Drag and drop a widget here</p>
                    )
                }
                {InputsOnCanvos}
                {LabelsOnCanvos}
            </div>
        </Droppable>

    );
}

export default WidgetBoard;