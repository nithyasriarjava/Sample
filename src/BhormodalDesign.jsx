import './bhormodalDesign.css';
import { useState, useEffect } from 'react';


export default function BhormodalDesign({ pValue,
    esymbol, isBoxShadow, shellIndexValue,
    isSubStructure, electronList,
    setSubValues
}) {

    let copyShellIndexValue = shellIndexValue == undefined ? 0 : shellIndexValue;
    let scaleDecimalLastDigitValue = 4;
    let shellNumber = 1;
    let shells = [];
    let labels = ["K", "L", "M", "N", "O", "P", "Q"];
    let subShellsCount = [1, 2, 3, 4, 4, 3, 2];
    let colors = ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'brown'];
    let subShellsLabel = ["S", "P", "D", "F"];
    let [isShellHighlightIndex, setShellHighlightIndex] = useState([]);
    let [noElectronsCount, setNoElectronsCount] = useState([]);

    const [subShellLst, setSubShellLst] = useState([]);

    const labelPositions = [
        { x: -450, y: 150 }, //0
        { x: -500, y: -10 }, //1
        { x: -550, y: -170 }, //2
        { x: -550, y: -300 }, //3
        { x: 520, y: -350 }, //4
        { x: 600, y: -60 }, //5
        { x: 600, y: 250 }, //6
        { x: -700, y: 100 } //7
    ];

    const arrowPositions = [
        { x: -390, y: 130, rotate: -20 }, //k
        { x: -470, y: 30, rotate: 0 }, //l
        { x: -500, y: -80, rotate: 10 }, //m
        { x: -500, y: -200, rotate: 20 }, //n
        { x: 200, y: -200, rotate: 150 }, //o
        { x: 290, y: -20, rotate: 180 }, //p
        { x: 280, y: 200, rotate: -150 },  //q
        { x: -700, y: 100, rotate: -30 }  //q
    ];


    let [subVal, setSubVal] = useState([]);

    const handleUpdate = (subList, setSubValues) => {
        let temp = [];
        for (let i = 0; i < subList.length; i++) {
            let val = (
                <div className="col-sm-4 col-4">
                    <div className="sub-shells-texts text-white">
                        <p className='text-dark'>
                            {subShellsCount[copyShellIndexValue]}
                            {subShellsLabel[i]}
                            <sub>{subList[i]}</sub>
                        </p>
                    </div>
                </div>
            );

            temp.push(val);
            // console.log("modifyVal", subList[i]);
        }
        setSubValues(temp);
        // console.log("func check",typeof(setSubValues));
        // setSubValues(prev => [...prev, temp]);
    };

    useEffect(() => {
        if (!electronList) return; // skip if not yet available

        // Get the sub shell Arrows names like => s,sp,spd,spdf..
        let newSubShells = shellIndexValue == undefined ? ['s'] : [];
        for (let i = 0; i < subShellsCount[shellIndexValue]; i++) {
            newSubShells.push(subShellsLabel[i]);
        }
        setSubShellLst(newSubShells);


        // get the sub shell list depend shellIndexValue
        let modifySubVal = [];
        let getNoElecronSubShellCount = [];
        let count = 0;
        let subElectron = 2;
        let checkVal = subElectron;
        let getTheLastSubVal = electronList[copyShellIndexValue];
        // showed the K shell when page reload 
        if (shellIndexValue == undefined) {
            if (pValue < subElectron) {
                modifySubVal.push(1);
            }
            else {
                modifySubVal.push(2);
            }
        }
        // After click the buttons showed the modifyvalues 
        else {
            while (checkVal <= electronList[copyShellIndexValue]) {
                modifySubVal.push(subElectron);
                if (checkVal == electronList[copyShellIndexValue]) {
                    break;
                }
                getTheLastSubVal = getTheLastSubVal - subElectron;
                subElectron += 4;
                checkVal += subElectron;
            }

            if (checkVal != electronList[copyShellIndexValue]) {
                modifySubVal.push(getTheLastSubVal);
                // modifySubVal.push(subElectron - electronList[copyShellIndexValue]);
            }
            if (subShellsCount[copyShellIndexValue] != modifySubVal.length) {
                let getVal = subShellsCount[copyShellIndexValue] - modifySubVal.length;
                for (let l = 0; l < getVal; l++) {
                    modifySubVal.push(0);
                    getNoElecronSubShellCount.push(count)
                    count++;
                }
            }
        }

        setNoElectronsCount(getNoElecronSubShellCount);
        // Call the function to update the sub shell list
        if (isSubStructure && modifySubVal.length > 0) { // Only if subList is ready
            handleUpdate(modifySubVal, setSubValues);
        }
        else {
            setSubValues([]);
        }


        // Modify the orginal electron list add sub val =>
        //     like [2,8,18] => change to [2,2,6,18]

        let newSub = [];
        let GetTheSubValueIndex = [];
        for (let i = 0; i < electronList.length; i++) {
            let k = i;
            if (i == shellIndexValue) {
                for (let j = 0; j < modifySubVal.length; j++) {
                    newSub.push(modifySubVal[j]);
                    GetTheSubValueIndex.push(k);
                    k++;
                }

            } else {
                newSub.push(electronList[i]);
            }
        }
        console.log("newSub", newSub);
        setSubVal(newSub);
        setShellHighlightIndex(GetTheSubValueIndex);

    }, [shellIndexValue]); // <-- include electronList here!

    let subValIndex = 0;
    let passVal = undefined;
    let i = 0;
    let m = 0;
    const safeElectronList = electronList || [];
    let isHighlightVal = false;
    // let isNoElectronShell = false;
    while ((isSubStructure && subValIndex < subVal.length) || (i < safeElectronList.length)) {
        let shellSize = 100 + shellNumber * 80;
        if (shellNumber > 6 && scaleDecimalLastDigitValue > 2) {
            scaleDecimalLastDigitValue -= 0.5;
        }
        console.log(scaleDecimalLastDigitValue);

        if (i == 0 && shellIndexValue == undefined) {
            isHighlightVal = true;
        }
        else if (subValIndex < subVal.length) {
            passVal = subVal[subValIndex];
            if (subVal[subValIndex] != 0 && subValIndex == isShellHighlightIndex[m]) {
                isHighlightVal = true;
                m++;
            }
            else {
                isHighlightVal = false;
            }
            subValIndex++;
        }
        else {
            isHighlightVal = false;
        }


        shells.push(
            <div key={shellNumber} className="shell-wrapper">

                {!isSubStructure ? (
                    <>
                        <Atom val={safeElectronList[i]}
                            shellNumber={shellNumber}
                            shellSize={shellSize}
                            isShellHighlight={true}
                        />

                        <div
                            className="shell-arrow"
                            style={{
                                position: "absolute",
                                top: `calc(50% + ${arrowPositions[shellNumber - 1]?.y}px)`,
                                left: `calc(50% + ${arrowPositions[shellNumber - 1]?.x}px)`,
                                transform: `rotate(${arrowPositions[shellNumber - 1]?.rotate}deg)`,
                            }}
                        >
                            <div className="arrow-line" style={{
                                backgroundColor: colors[shellNumber - 1],
                                boxShadow: (colors[shellIndexValue] === colors[shellNumber - 1]) && isBoxShadow
                                    ? `2px 2px 5px ${colors[shellNumber - 1]}`
                                    : 'none',
                                transition: 'box-shadow 0.3s ease-in-out'
                            }}>
                            </div>
                            <div className="arrow-head"></div>
                        </div>

                        <div
                            className="shell-label fs-2"
                            style={{
                                top: `calc(50% + ${labelPositions[shellNumber - 1]?.y}px)`,
                                left: `calc(50% + ${labelPositions[shellNumber - 1]?.x}px)`,
                                backgroundColor: colors[shellNumber - 1],
                                borderRadius: "100%"
                            }}
                        >
                            {labels[shellNumber - 1]}
                        </div>
                    </>
                ) : (

                    <>
                        <Atom
                            shellNumber={shellNumber}
                            shellSize={shellSize}
                            val={shellIndexValue === undefined ? safeElectronList[i] : passVal}
                            isShellHighlight={isHighlightVal}
                        />
                        {subShellLst.map((item, index) => {
                            let posIndex = shellIndexValue == undefined ? index : shellIndexValue + index; // Compute index instead of modifying counter
                            // if (reverseIndex < noElectronsCount.length) {
                            //     noElectronSubName = subShellLst[subShellLst.length - (reverseIndex + 1)];
                            //     reverseIndex++;
                            // }

                            const grayStartIndex = subShellLst.length - noElectronsCount.length;
                            const shouldGray = index >= grayStartIndex;

                            // console.log("posIndex", index);
                            // if (posIndex >= arrowPositions.length || posIndex >= labelPositions.length) {
                            //     console.warn(`Skipping rendering for posIndex=${posIndex}, out of bounds.`);
                            //     return null;
                            // }

                            return (
                                <>
                                    <div
                                        className="shell-arrow"
                                        style={{
                                            position: "absolute",
                                            top: `calc(50% + ${arrowPositions[posIndex]?.y}px)`,
                                            left: `calc(50% + ${arrowPositions[posIndex]?.x}px)`,
                                            transform: `rotate(${arrowPositions[posIndex]?.rotate}deg)`,
                                        }}
                                    >
                                        <div className="arrow-line" style={{
                                            backgroundColor: shouldGray ? 'gray' : colors[posIndex],
                                            transition: 'box-shadow 0.3s ease-in-out'
                                        }}></div>
                                        <div className="arrow-head"></div>
                                    </div>

                                    <div
                                        className="shell-label"
                                        style={{
                                            top: `calc(50% + ${labelPositions[posIndex]?.y}px)`,
                                            left: `calc(50% + ${labelPositions[posIndex]?.x}px)`,
                                            backgroundColor: shouldGray ? 'gray' : colors[posIndex],
                                            borderRadius: "100%",
                                            fontSize: "40px",
                                        }}
                                    >
                                        {item}
                                    </div>
                                </>
                            );
                        })}
                    </>
                )}

            </div>
        );

        shellNumber++;
        i++;
    }

    return (
        <div className="atom-container"
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: `scale(0.${scaleDecimalLastDigitValue})`
            }}>
            <div className="nucleus" style={{ position: "absolute" }}>{esymbol}</div>
            {shells}
        </div>
    );
}


function Atom({ val, shellNumber, shellSize, isShellHighlight }) {
    const electrons = [];
    const angleStep = (2 * Math.PI) / val;
    for (let i = 0; i < val; i++) {
        let angle = i * angleStep;
        electrons.push(
            <div
                key={i}
                className="electron"
                style={{
                    position: "absolute",
                    transform: `rotate(${angle}rad) translate(${shellSize / 2}px)`,
                    // transform: isShellHighlight ? `rotate(${angle}rad) translate(${shellSize / 2}px)` : 'none',
                    backgroundColor: isShellHighlight ? 'red' : 'gray',
                }}
            />
        );
    }
    return (
        <div
            className={`shell shell-${shellNumber} ${isShellHighlight ? '' : 'stop-rotation'}`}
            style={{
                position: "absolute",
                width: shellSize,
                height: shellSize,
                border: isShellHighlight ? `6px solid ${['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'yellow'][shellNumber - 1]}` : '7px solid gray'
                , borderRadius: "50%",
            }}
        >
            {electrons}
        </div>
    );
}
