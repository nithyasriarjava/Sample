import './bhormodal.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BhormodalDesign from './BhormodalDesign';

function BhorModal() {
    let [subShellButtonsAccurateNamesList, setsubShellButtonsAccurateNamesList] = useState([]);
    let [electronList, setElectron] = useState([]);
    let [isBoxShadow, setBoxShadow] = useState(false);
    let [getShellName, setShellName] = useState();

    const navigate = useNavigate();
    const { esymbol, ename, pvalue, subShells, bgColor } = useParams();
    let subShellsCount = [1, 2, 3, 4, 4, 3, 2];
    let [shellIndexValue, setIndexValue] = useState();

    const decodedColor = bgColor ? decodeURIComponent(bgColor) : 'green';

    let [subValues, setSubValues] = useState([]);
    let result = []; // This stores the growing list

    let index = 0; // This keeps track of the position in the subShells array

    for (let i = 0; i < subShellsCount.length; i++) {
        result.push(subShells[index]); // Add the value from subShells
        index++; // Move to the next index in subShells
    }
    const goToDetails = () => {
        navigate(`/Sample`);
    };
    // let [check,setCheck] = useState(false);

    // console.log("check",check );
    useEffect(() => {

        let capacityList = [ // orbital-wise capacities
            2,  // 1s
            2,  // 2s
            6,  // 2p
            2,  // 3s
            6,  // 3p
            2,  // 4s
            10, // 3d
            6,  // 4p
            2,  // 5s
            10, // 4d
            6,  // 5p
            2,  // 6s
            14, // 4f
            10, // 5d
            6,  // 6p
            2,  // 7s
            14, // 5f
            6   // 7p
        ];

        let shellMap = [1, 2, 2, 3, 3, 4, 3, 4, 5, 4, 5, 6, 4, 5, 6, 7, 5, 7];
        // Corresponding shell number for each orbital above ↑

        let tempValueList = [];
        let remaining = pvalue;

        for (let i = 0; i < capacityList.length && remaining > 0; i++) {
            let add = Math.min(capacityList[i], remaining);
            let shellIndex = shellMap[i] - 1;

            // Extend array if not exists yet
            if (!tempValueList[shellIndex]) {
                tempValueList[shellIndex] = 0;
            }

            tempValueList[shellIndex] += add;
            remaining -= add;
        }

        // Remove undefined or 0 entries
        tempValueList = tempValueList.filter(val => val > 0);

        console.log("tempValueList", tempValueList);
        setElectron(tempValueList);

        // let addVal = 0;
        // let tempValueList = [];
        // let i = 1;

        // while (addVal < pvalue) {
        //     if (addVal + 2 * (i ** 2) > pvalue) {
        //         break;
        //     }
        //     tempValueList.push(2 * (i ** 2));
        //     addVal += 2 * (i ** 2);
        //     i++;
        // }
        // if ((addVal + 2 * (i ** 2) > pvalue) && addVal != pvalue) {
        //     tempValueList.push(pvalue - addVal);
        // }
        // setElectron(tempValueList);

        setsubShellButtonsAccurateNamesList(tempValueList.length);

        // Add class to body
        document.body.classList.add('bhor-modal-bg');

        return () => {
            // Remove class when component unmounts
            document.body.classList.remove('bhor-modal-bg');
        };
    }, []);


    return (
        <div className="page-wrapper">
            <div className="page-inner">
                <div className="page-header">
                    <button
                        className="btn btn-sm"
                        style={{ backgroundColor: decodedColor }}
                        onClick={goToDetails}
                    >
                        ← Home
                    </button>
                    <h1 className="page-title" style={{ backgroundColor: decodedColor }}>
                        {ename} — {pvalue}
                    </h1>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <CreateBox
                            pValue={pvalue}
                            esymbol={esymbol}
                            decodedColor={decodedColor}
                            buttonActive={setBoxShadow}
                            isBoxShadow={isBoxShadow}
                            shellIndexValue={shellIndexValue}
                            setIndexValue={setIndexValue}
                            subShellButtonsAccurateNamesList={subShellButtonsAccurateNamesList}
                            electronList={electronList}
                            setShellName={setShellName}
                            setSubValues={setSubValues}
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <SubShellsAtom pValue={pvalue}
                            esymbol={esymbol}
                            isBoxShadow={isBoxShadow}
                            shellIndexValue={shellIndexValue}
                            electronList={electronList}
                            getShellName={getShellName}
                            decodedColor={decodedColor}
                            setSubValues={setSubValues}
                            subValues={subValues}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SubShellsAtom({ pValue, esymbol, isBoxShadow, shellIndexValue, electronList,
    getShellName, decodedColor, setSubValues, subValues }) {

    console.log("subValues", subValues);
    return (
        <div className="modal-box-container">
            <div className="modal-header-badge" style={{ backgroundColor: decodedColor }}>
                {getShellName == undefined ? 'K Sub Shell' : `${getShellName} Sub Shell`}
            </div>
            <div className="modal-content-box">
                <BhormodalDesign
                    pValue={pValue}
                    esymbol={esymbol}
                    isSubStructure={true}
                    isBoxShadow={isBoxShadow}
                    shellIndexValue={shellIndexValue}
                    setSubValues={setSubValues}
                    electronList={electronList}
                />
                <div className="sub-shell-display">
                    <p className='sub-shell-title'>
                        {getShellName == undefined ? 'K Sub Shell' : `${getShellName} Sub Shell`}
                    </p>
                    <div className="sub-shell-content">
                        <div className="row g-2 justify-content-center">
                            {subValues.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CreateBox({ pValue, esymbol, decodedColor, buttonActive,
    isBoxShadow, shellIndexValue,
    setIndexValue, subShellButtonsAccurateNamesList, electronList,
    setShellName,
    setSubValues }) {
    let shellNamesList = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
    let shellColorsList = ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'yellow'];


    // let [subShellButtonsAccurateNamesList, setsubShellButtonsAccurateNamesList] = useState([]);
    // let [electronList,setElectron] = useState([]);
    // const [shellButtonsCount, setShellButtonsCount] = useState(0);



    return (
        <div className="modal-box-container">
            <div className="modal-header-badge" style={{ backgroundColor: decodedColor }}>Bohr Model</div>
            <div className="modal-content-box">
                <BhormodalDesign
                    pValue={pValue}
                    esymbol={esymbol}
                    isBoxShadow={isBoxShadow}
                    shellIndexValue={shellIndexValue}
                    isSubStructure={false}
                    electronList={electronList}
                    setSubValues={setSubValues}
                />
            </div>
            <div className="shell-buttons-container">
                <div className="row g-2 justify-content-center">
                    {Array.from({ length: subShellButtonsAccurateNamesList }).map((_, index) => (
                        <ShellButtons
                            key={index}
                            index={index}
                            shellName={shellNamesList[index]}
                            shellIndexValue={shellIndexValue}
                            shellColor={shellColorsList[index]}
                            buttonActive={buttonActive}
                            isBoxShadow={isBoxShadow}
                            setIndexValue={setIndexValue}
                            setShellName={setShellName}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ShellButtons({ index, shellName, shellColor,
    buttonActive, setIndexValue, isBoxShadow,
    shellIndexValue,
    setShellName }) {

    const buttonAction = () => {
        buttonActive(true);
        setIndexValue(index);
        setShellName(shellName);
    };

    return (
        <div className="col-6 col-sm-4 col-md-3 col-lg-auto">
            <button className='shell-btn'
                onClick={buttonAction}
                style={{
                    backgroundColor: shellColor,
                    boxShadow: (shellIndexValue == undefined && index == 0) || (shellIndexValue === index && isBoxShadow)
                        ? `0 0 0 3px ${shellColor}40, 0 0 20px ${shellColor}`
                        : `0 4px 10px ${shellColor}60`,
                    border: (shellIndexValue == undefined && index == 0) || (shellIndexValue === index && isBoxShadow)
                        ? `2px solid ${shellColor}`
                        : 'none'
                }}>
                {shellName}
            </button>
        </div>
    );
}

export default BhorModal;