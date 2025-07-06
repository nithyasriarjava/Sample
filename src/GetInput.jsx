import { useState } from "react";

export default function GetInput() {
    const [p, setP] = useState("");
    const [n, setN] = useState("");
    const [eName, setEName] = useState("");
    const [finalP, setFinalP] = useState(0);
    const [finalN, setFinalN] = useState(0);
    const [finalEName, setFinalEName] = useState("");
    const [isSet, setIsSet] = useState(false);

    function setTheValues() {
        setFinalP(Number(p));
        setFinalN(Number(n));
        setFinalEName(eName);
        setIsSet(true);
        console.log("Protons:", p, "Neutrons:", n);
    }

    return (
        <div className="mt-5">
            {/* <h3 className="text-danger">Scandium - 21</h3> */}
            <input type="text" placeholder="Element Name" value={eName} onChange={(e) => setEName(e.target.value)} />
            <input
                className="m-2"
                type="number"
                placeholder="Number of protons"
                value={p}
                onChange={(e) => setP(e.target.value)}
            />
            <input
                className="m-2"
                type="number"
                placeholder="Number of neutrons"
                value={n}
                onChange={(e) => setN(e.target.value)}
            />
            <button onClick={setTheValues} className="m-2">Submit</button>
            {isSet && <CreateAnimation elementName={finalEName} pValue={finalP} nValue={finalN} />}
        </div>
    );
}

export function CreateAnimation({ elementName, pValue, isValance }) {
    let [getShellNum,setTheShellNum] = useState(0);
    return (
        <div className={isValance ? 'valance-atom': 'atom'} 
        style={{transform: !isValance && getShellNum > 3  ?  'scale(0.2)': 'scale(0.3)'}}>
            <Shells pValue={pValue} isValanceShell={isValance}
            setTheShellNum={setTheShellNum} />
            <div className="nucleus">
                <p className="element-name-style-details-page">{elementName}</p>
            </div>
        </div>
    );
}

export function Shells({ pValue, isValanceShell,setTheShellNum }) {
    let shells = [];
    let shellNumber = 1;
    let electronCount = 0;

    while (electronCount < pValue) {
        let maxElectrons = 2 * shellNumber ** 2;
        let electronsInShell = Math.min(pValue - electronCount, maxElectrons);
        let radius = 40 + shellNumber * 50;

        let currentShell = (
            <div
                key={shellNumber}
                className={`shell shell-${shellNumber}`}
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    animation: `rotate-shell ${5 + shellNumber}s linear infinite`,
                }}
            >
                {Array.from({ length: electronsInShell }).map((_, i) => {
                    let angle = (i / electronsInShell) * 2 * Math.PI;
                    let x = radius * Math.cos(angle);
                    let y = radius * Math.sin(angle);
                    return (
                        <span
                            key={i}
                            className="electron"
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                            }}
                        ></span>
                    );
                })}
            </div>
        );
        setTheShellNum(shellNumber);
        electronCount += electronsInShell;
        shells.push(currentShell); // always push the shell
        shellNumber++;
    }

    return (
        <div className="shells-container">
            {isValanceShell ? shells[shells.length - 1] : shells}
        </div>
    );
}

