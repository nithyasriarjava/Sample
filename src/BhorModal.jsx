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
        navigate(`/SampleApp`);
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
        <div className="container text-white">
            <div className="row">
                <div className="col-sm-4">
                    <button className="custom-button home-btn-bhormodal pull-push-anime mb-2"
                        style={{ backgroundColor: `${decodedColor}` }}
                        onClick={goToDetails}>
                        Home
                    </button>
                </div>
                 <div className="col-sm-4">
                    <h2 className='head-style' style={{ backgroundColor: `${decodedColor}` }}>{ename}-{pvalue}</h2>
                </div>
                <div className="col-sm-4"></div>
            </div>

            <div className="row">
                <div className="col-sm-6">
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
                <div className="col-sm-6">
                    {/* <ShellProvider> */}
                    <SubShellsAtom pValue={pvalue}
                        esymbol={esymbol}
                        isBoxShadow={isBoxShadow}
                        shellIndexValue={shellIndexValue}
                        electronList={electronList}
                        getShellName={getShellName}
                        decodedColor={decodedColor}
                        setSubValues={setSubValues}
                        subValues={subValues}
                    // setCheck={setCheck}
                    />
                    {/* </ShellProvider> */}
                </div>
            </div>
        </div>
    );
}

export function SubShellsAtom({ pValue, esymbol, isBoxShadow, shellIndexValue, electronList,
    getShellName, decodedColor, setSubValues, subValues }) {

    // const { subValues } = useContext(ShellContext);
    // setCheck(true);
    return (
        <div className="box-container">
            <div className="sub-head" style={{ backgroundColor: decodedColor }}>{getShellName == undefined ? 'K Sub Shell' : `${getShellName} Sub Shell`}</div>
            <div className="box-style mt-3">
                {/* <ShellProvider> */}
                {/* <div className="atom-box"> */}
                <BhormodalDesign
                    pValue={pValue}
                    esymbol={esymbol}
                    isSubStructure={true}
                    isBoxShadow={isBoxShadow}
                    shellIndexValue={shellIndexValue}
                    setSubValues={setSubValues}
                    // setCheck={setCheck}
                    electronList={electronList}
                />
                {/* </div> */}
                {/* </ShellProvider> */}
                <div style={{position: 'relative',top: '30px'}}>
                    <p className='text-dark border border-dark sub-shells-texts'>
                        {getShellName == undefined ? 'K Sub Shell' : `${getShellName} Sub Shell`}</p>
                    <div className="row border border-dark sub-shells-items">
                        {subValues.map((item, index) => (
                            <React.Fragment key={index}>
                                {item}
                            </React.Fragment>
                        ))}
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
        <div className="box-container">
            <div className="sub-head mt-3" style={{ backgroundColor: decodedColor }}>Bhor Modal</div>
            <div className="box-style mt-3">
                {/* <ShellProvider> */}
                <BhormodalDesign
                    pValue={pValue}
                    esymbol={esymbol}
                    isBoxShadow={isBoxShadow}
                    shellIndexValue={shellIndexValue}
                    isSubStructure={false}
                    electronList={electronList}
                    setSubValues={setSubValues}
                />
                {/* </ShellProvider> */}
            </div>
            <div className="shell-buttons">
                <div className="container-fluid">
                    <div className="row g-3">
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
                        {/* {subShellButtonsAccurateNamesList.map((name, index) => (
                            <ShellButtons
                                key={index}
                                index={index}
                                shellName={name}
                                shellColor={shellColorsList[index]}
                                buttonActive={buttonActive} // Pass function here
                                setIndexValue={setIndexValue}
                                isBoxShadow={isBoxShadow}
                                shellIndexValue={shellIndexValue}
                            />
                        ))} */}
                    </div>
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
        <div className="col-sm-3 col-3">
            <button className='text-white shell-button-style'
                onClick={buttonAction}
                style={{
                    backgroundColor: shellColor,
                    // boxShadow: " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    boxShadow: (shellIndexValue == undefined && index == 0) || (shellIndexValue === index && isBoxShadow)
                        ? `0 0 8px 2px ${shellColor}, 0 0 15px 4px ${shellColor}, 0 0 25px 6px ${shellColor}`
                        : `0 2px 6px ${shellColor}`,


                    border: 'none',
                    transition: 'box-shadow 0.3s ease-in-out' // Smooth effect
                }}>
                {shellName}
            </button>
        </div>
    );
}

export default BhorModal;