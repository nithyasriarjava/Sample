import { useNavigate } from "react-router-dom";
import {
    elementsNames, elementsSymbols, elementsNumber, elementsMassNo,
    elementPositions,
    elementCardColor,
    elementColors
} from "../datas";
import './table.css';
import NavBar from "./NavBar";

function Table() {
    const navigate = useNavigate();

    const handleClickInThisFun = (index) => {
        const selectedColor = elementColors[elementCardColor[index]] || 'green';
        const encodedColor = encodeURIComponent(selectedColor); // Encode #
        navigate(`/details/${index}/${encodedColor}`, { replace: true });
    };
    return (
        <div className="home-style">
                {/* <NavBar /> */}
                <div className="periodic-table">
                    {elementsNames.map((item, index) => {
                        const position = elementPositions[index] || {}; // Get position data
                        return (
                            <>
                                {position.row === 6 && position.column === 3 ? (
                                    <>
                                        <div
                                            className={`element element-${index + 1}`}
                                            style={{
                                                gridColumn: position.column,
                                                gridRow: position.row,
                                                backgroundColor: 'white'
                                            }}>
                                            <p className="text-dark">57-71</p>
                                        </div>
                                        <div
                                            className={`element element-${index + 1}`}
                                            style={{
                                                gridColumn: 4,
                                                gridRow: 8,
                                                backgroundColor: elementColors[elementCardColor[index]] || "gray"
                                            }}
                                            onClick={() => handleClickInThisFun(index)}>
                                            <span className="element-number">{elementsNumber[index]}</span>
                                            <span className="element-symbol">{elementsSymbols[index]}</span>
                                            <span className="element-mass">{elementsMassNo[index]}</span>
                                        </div>
                                    </>


                                ) : position.row === 7 && position.column === 3 ? (
                                    <>
                                        <div
                                            className={`element element-${index + 1}`}
                                            style={{
                                                gridColumn: position.column,
                                                gridRow: position.row,
                                                backgroundColor: 'white'
                                            }}>
                                            <p className="text-dark">89-103</p>
                                        </div>
                                        <div
                                            className={`element element-${index + 1}`}
                                            style={{
                                                gridColumn: 4,
                                                gridRow: 9,
                                                backgroundColor: elementColors[elementCardColor[index]] || "gray"
                                            }}
                                            onClick={() => handleClickInThisFun(index)}>
                                            <span className="element-number">{elementsNumber[index]}</span>
                                            <span className="element-symbol">{elementsSymbols[index]}</span>
                                            <span className="element-mass">{elementsMassNo[index]}</span>
                                        </div>

                                    </>
                                ) :
                                    (
                                        <Button
                                            key={index}
                                            index={index}
                                            elementName={item}
                                            elementSymbol={elementsSymbols[index]}
                                            elementNum={elementsNumber[index]}
                                            massNum={elementsMassNo[index]}
                                            cardColor={elementCardColor[index]}
                                            position={position} // Pass position
                                        />
                                    )}

                            </>
                        );
                    })}
                </div >
        </div>
    );
}

function Button({ index, elementName, elementSymbol, elementNum, massNum, cardColor, position }) {
    const navigate = useNavigate();

    console.log(elementColors[cardColor]);
    const handleClick = () => {
        const selectedColor = elementColors[cardColor] || 'green';
        const encodedColor = encodeURIComponent(selectedColor); // Encode #
        navigate(`/details/${index}/${encodedColor}`, { replace: true });
    };




    return (
        <>
            {/* Original element placement */}
            <div
                className={`element element-${index + 1}`}
                onClick={handleClick}
                style={{
                    gridColumn: position.column,
                    gridRow: position.row,
                    backgroundColor: (position.row === 6 && position.column === 3) ||
                        (position.row === 7 && position.column === 3)
                        ? "white"
                        : elementColors[cardColor] || "gray"
                }}
            >
                {position.row === 6 && position.column === 3 ? (
                    <p>57-71</p>
                ) : position.row === 7 && position.column === 3 ? (
                    <p>89-103</p>
                ) : (
                    <>
                        <span className="element-number">{elementNum}</span>
                        <span className="element-symbol">{elementSymbol}</span>
                        <span className="element-mass">{massNum}</span>
                    </>
                )}
            </div>

            {/* Additional element for specific conditions */}
            {(position.row === 6 && position.column === 3) && (
                <div
                    className="element"
                    style={{
                        gridColumn: "4",  // Set column 4
                        gridRow: "8",      // Set row 8
                        backgroundColor: elementColors[cardColor] || "gray"
                    }}
                >
                    <span className="element-number">{elementNum}</span>
                    <span className="element-symbol">{elementSymbol}</span>
                    <span className="element-mass">{massNum}</span>
                </div>
            )}

            {(position.row === 7 && position.column === 3) && (
                <div
                    className="element"
                    style={{
                        gridColumn: "4",  // Set column 4
                        gridRow: "9",      // Set row 9
                        backgroundColor: elementColors[cardColor] || "gray"
                    }}
                >
                    <span className="element-number">{elementNum}</span>
                    <span className="element-symbol">{elementSymbol}</span>
                    <span className="element-mass">{massNum}</span>
                </div>
            )}
        </>
    );
}


export default Table;
