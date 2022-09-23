import { MaterialPicker, SketchPicker, ChromePicker } from 'react-color'
import { useState, useEffect } from 'react'


export default function Picker({color, picker}) {
    // Create random Hex
    const randomColor = Math.floor(Math.random()*16777215).toString(16).padEnd(6, '0');   
    
    const [displayColorPicker, setDisplay] = useState(false);
    const [hexColor, setHexColor] = useState(`#${randomColor}`)

    function handleClick() {
        setDisplay(!displayColorPicker)
    };

    function handleClose() {
        setDisplay(false)
    };

    function handleChange(color) {
        setHexColor(color.hex)
    };

    useEffect(() => {
        color([hexColor, picker]);
    }, [setHexColor]);

    return(
        <div>
            <div className="w-16 h-16 custom-color" onClick={ handleClick }>
            {/* <div className="w-full h-full" style={styles.custom}> */}
            {/* </div> */}
            </div>
            { displayColorPicker ? <div className="absolute z-50">
            <div className="fixed" onClick={ handleClose }/>
                <SketchPicker color={ hexColor } onChange={ handleChange } />
             </div> : null }

            <style jsx>{`
                .custom-color {
                    background-color: ${hexColor};
                }
            `}</style>
      </div>

      

    )
}