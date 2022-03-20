import React, { useLayoutEffect, useState, useRef} from "react";

const BgCanvas = () => {
    const bgCanvas = useRef(null);

    return (
        <canvas class="bgCanvas" ref={bgCanvas}>
            
        </canvas>
    );
}

export default BgCanvas;

