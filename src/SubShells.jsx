import { useParams } from "react-router-dom";
import { electronicConfiguration } from "../datas";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubShells.css";

// function SubShells() {
//     const navigate = useNavigate();
//     const { index, ename, atomicNum, bgColor } = useParams();
//     const decodedColor = bgColor ? decodeURIComponent(bgColor) : "green";
//     let subShellsArray = electronicConfiguration[index] || []; // Ensure data exists
//     let subShellsCount = [1, 2, 3, 4, 4, 3, 2]; // Number of subshells at each level
//     let lst = ["s", "p", "d", "f"]; // Subshell labels
//     let [electronVal, setVal] = useState(0);
//     console.log(subShellsArray);

//     useEffect(() => {
//         // Calculate total electrons once when `subShellsArray` changes
//         const totalElectrons = subShellsArray.reduce((acc, num) => acc + num, 0);
//         setVal(totalElectrons);
//     }, [subShellsArray]); // Dependency on `subShellsArray`

//     let subshellIndex = 0; // Track index in subShellsArray
//     const goToDetails = () => { 
//         navigate(`/Sample`);
//     };
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-4">
//                     <button className="custom-button home-btn-bhormodal pull-push-anime mb-2"
//                         style={{ backgroundColor: `${decodedColor}` }}
//                         onClick={goToDetails}>
//                         Home
//                     </button>
//                 </div>
//                 <div className="col-sm-4">
//                     <h2 className="head-style" style={{ backgroundColor: `${decodedColor}` }}>
//                         {ename}- {atomicNum}
//                     </h2>
//                 </div>
//                 <div className="col-sm-4"></div>
//             </div>

//             {/* Electron Configuration Box */}
//             <div className="electron-box">Electron Config</div>

//             <div className="row">
//                 {/* Electron Configuration Table */}
//                 <div className="col-sm-4">
//                     <div className="box e-config text-white" style={{ backgroundColor: decodedColor }}>
//                         {subShellsCount.map((count, i) => (
//                             <div
//                                 className="subShells-style"
//                                 key={i}
//                                 style={i >= 4 ? { gridRow: i - 3, gridColumn: 2 } : { gridRow: i + 1, gridColumn: 1 }}
//                             >
//                                 {Array.from({ length: count }).map((_, j) => {
//                                     let label = `${i + 1}${lst[j]}`;
//                                     let electrons = subShellsArray[subshellIndex] || 0; // Get electron count
//                                     subshellIndex++; // Move to next subshell

//                                     return (
//                                         <p key={j}>
//                                             <div><span style={{backgroundColor:'red',paddingLeft:'10%',paddingBottom:'10%',paddingRight:'10%'}}>{electrons}</span> : {label}</div>
//                                         </p>
//                                     );
//                                 })}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Subshell Pyramid Layout */}
//                 <div className="col-sm-4">
//                     <div className="pyramid">
//                         {subShellsCount.map((count, i) => (
//                             <div className="pyramid-row" key={i}>
//                                 {Array.from({ length: count }).map((_, j) => {
//                                     let label = `${i + 1}${lst[j]}`;
//                                     subshellIndex++;
//                                     let electrons = subShellsArray[subshellIndex] || 0;
//                                     console.log(electrons);

//                                     return (
//                                         <div 
//                                         className="subshell" 
//                                         key={j}
//                                         style={{ backgroundColor: electrons == 0 ? 'white' : 'red' }}
//                                     >
//                                         {label} <br />
//                                     </div>

//                                     );
//                                 })}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Electron Count Box */}
//                 <div className="col-sm-4">
//                     <div className="box text-white" style={{ height: "50%", backgroundColor: decodedColor }}>
//                         <h3>Electron</h3>
//                         <div className="box text-dark" style={{ height: "10%", backgroundColor: "white" }}>
//                             <h2>{electronVal}</h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

function SubShells() {
    const navigate = useNavigate();
    const { index, ename, atomicNum, bgColor } = useParams();
    const decodedColor = bgColor ? decodeURIComponent(bgColor) : "green";

    let subShellsArray = electronicConfiguration[index] || [];
    let subShellsCount = [1, 2, 3, 4, 4, 3, 2];
    let lst = ["s", "p", "d", "f"];
    let subShellsColor = ["red", "green", "blue", "purple"];
    let fillOrder = [0, 1, 2, 3, 4, 6, 5, 7, 10, 8, 11, 14, 9, 12, 15, 17, 13, 16, 18];
    let [electronVal, setVal] = useState(0);
    let currentIndex = 0;
    let pyramidIndex = -1;

    const goToDetails = () => {
        navigate(`/Sample`);
    };

    const [filledElectrons, setFilledElectrons] = useState([]);

    useEffect(() => {
        let filled = [];
        let index = 0;

        const interval = setInterval(() => {
            if (index < subShellsArray.length) {
                let orderFilling = fillOrder[index];
                let value = subShellsArray[orderFilling] || 0;
                filled.push(value);
                setFilledElectrons([...filled]);
                setVal((prev) => prev + value);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1000);


        return () => clearInterval(interval);
    }, [subShellsArray]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <button className="custom-button home-btn-bhormodal pull-push-anime mb-2"
                            style={{ backgroundColor: `${decodedColor}` }}
                            onClick={goToDetails}>
                            Home
                        </button>
                    </div>
                    <div className="col-sm-4">
                        <h2 className="head-style text-white" style={{ backgroundColor: `${decodedColor}` }}>
                            {ename}- {atomicNum}
                        </h2>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-xl-4 col-sm-6 col-md-6">
                        <div className="box e-config text-white" style={{ backgroundColor: decodedColor }}>
                            {subShellsCount.map((count, i) => {
                                let elements = Array.from({ length: count }).map((_, k) => {
                                    let value = subShellsArray[currentIndex] || 0;
                                    currentIndex++;
                                    return (
                                        <div key={`${i}-${k}`} className="e-config-texts" style={i >= 4 ? { gridRow: currentIndex - 10, gridColumn: 2 } : { gridRow: currentIndex, gridColumn: 1 }}>
                                            <p><span style={{ backgroundColor: subShellsColor[k] }} className="e-config-val">{value} </span> : {i + 1}{lst[k]}</p>
                                        </div>
                                    );
                                });
                                return elements;
                            })}
                        </div>
                    </div>
                    <div className="col-xl-4 col-sm-6 col-md-6">
                        <div className="pyramid">
                            {subShellsCount.map((count, i) => (
                                <div className="pyramid-row" key={i}>
                                    {Array.from({ length: count }).map((_, j) => {
                                        const orderIndex = subShellsCount
                                            .slice(0, i)
                                            .reduce((acc, cur) => acc + cur, 0) + j;

                                        const fillIndex = fillOrder.indexOf(orderIndex);
                                        const electrons = filledElectrons[fillIndex] || 0;
                                        const label = `${i + 1}${lst[j]}`;

                                        // Get max electrons for this subshell type
                                        const type = lst[j]; // e.g. 's', 'p', 'd', 'f'
                                        const maxElectrons =
                                            type === 's' ? 2 :
                                                type === 'p' ? 6 :
                                                    type === 'd' ? 10 :
                                                        type === 'f' ? 14 : 0;

                                        const isPartial = electrons > 0 && electrons < maxElectrons;

                                        return (
                                            <div
                                                className={`subshell ${isPartial ? "partial-fill" : ""}`}
                                                key={orderIndex}
                                                style={{
                                                    backgroundColor: electrons === 0 ? 'white' : subShellsColor[j],
                                                    color: electrons === 0 ? 'black' : 'white',
                                                    zIndex: 30
                                                }}
                                            >
                                                <div className="line"></div>
                                                {label} <br />
                                            </div>
                                        );
                                    })}

                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="col-xl-4 col-sm-12 col-md-12">
                        <div className="box electron-box text-white" style={{ height: "50%", backgroundColor: decodedColor }}>
                            <h3>Electron</h3>
                            <div className="box  text-dark" style={{ height: "10%", backgroundColor: "white" }}>
                                <h2>{electronVal}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default SubShells;
