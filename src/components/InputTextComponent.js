import React from "react";
import { useEffect, useState } from "react";
import { Draggable } from "react-drag-and-drop";

function InputTextComponent(props) {

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [delta, setDelta] = useState({ x: -1, y: -1 });
    const [formatPos, setFormatPos] = useState(false);

    useEffect(() => {
        if (!formatPos) {
            //initalize position.
            setPos({ x: props.pos.left, y: props.pos.top });
            setFormatPos(true);

            //check overlap
            setTimeout(()=>props.checkOverLap(),5);
        }
    }, []);

    /**
    * handleDrag
    * Arrow function to calc the position and set that.
    * @param {*} event
     */
    const handleDrag = (event) => {

        const currentTargetRect = event.currentTarget.getBoundingClientRect();
        var x = event.clientX - delta.x;
        var y = event.clientY - delta.y;
        if (x < 230)
            x = currentTargetRect.left;
        if (y < 0)
            y = currentTargetRect.top;
        setPos({ x: x, y:y });
        props.checkOverLap();
        
    };

    /**
    * handleStop
    * Arrow function to reset delta when dragend.
     */
    const handleStop = () => {
        setDelta({x:-1,y:-1});
    }

    /**
    * handleStart
    * Arrow function to calc and set delta.
    * @param {*} event
     */
    const handleStart = (event) => { 
        const currentTargetRect = event.currentTarget.getBoundingClientRect();
        const dx = event.clientX - currentTargetRect.left;
        const dy = event.clientY - currentTargetRect.top;
        setDelta({ x: dx, y: dy });   
    }

    return (
        <Draggable
            className="draggable_widget"
            onMouseDown={handleStart}
            onDrag={handleDrag}
            onMouseUp={handleStop}
            axis="none"
            style={{
                position: "absolute",
                left: `${pos.x}px`,
                top: `${pos.y}px`,
            }}
        >
            <input type="text" />
        </Draggable>
    )
}

export default InputTextComponent;
