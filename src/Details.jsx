import './details.css';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as data from '../datas';
import { CreateAnimation } from './GetInput';
// import pathRealTimeValue from '../public/Element RealTime Images/${Esymbol}_Rimg.JPG';
// import pathElementValue from '../public/real-time-images/${Esymbol}_Img.imageset/${Esymbol}_Img.JPG';
import path1 from  './public/Element RealTime Images';
import path2 from  './public/real-time-images';
function Details() {
    const navigate = useNavigate();
    const { index, color } = useParams();
    const decodedColor = color ? decodeURIComponent(color) : 'green';
    let Ename = data.elementsNames[index];
    let Esymbol = data.elementsSymbols[index];
    let automicNum = data.elementsNumber[index];
    let massNum = data.elementsMassNo[index];
    let valanceShellNum = data.valanceShellElectrons[index];
    let subShells = data.electronicConfiguration[index];
    let elementItemsValue = data.ElementItems[index];
    let nutronNum = data.neutrons[index];
    let watchAndLearnLink = data.elementUsesVediosLink[index];
let pathRealTimeValue = `${path2}/${Esymbol}_Rimg.jpg`;
let pathElementValue = `${path1}/${Esymbol}_Img.imageset/${Esymbol}_Img.jpg`;


    const components = [
        {
            id: 1, component: <ElementCard elementName={Ename} elementSymbol={Esymbol}
                atomicNumber={automicNum}
                atomicMass={massNum}
                elementImage={pathRealTimeValue} />
        },
        { id: 2, component: <ElementDetails elementName={Ename} elementSymbol={Esymbol} /> },
        { id: 3, component: <ValanceElectron eSymbol={Esymbol} pValue={automicNum} /> },
        {
            id: 4, component: <AtomStructure eSymbol={Esymbol} automicNum={automicNum} nutron={nutronNum}
            />
        },
        {
            id: 5, component: <Application elementImg={pathElementValue}
                elementItems={elementItemsValue} />
        }
    ];

    const gotoTable = () => {
        navigate(`/SampleApp`);
    };

    const gotoBhorModalPage = () => {
        const bhorModalColor = encodeURIComponent(decodedColor);
        navigate(`/bhormodal/${automicNum}/${Esymbol}/${Ename}/${subShells}/${bhorModalColor}`, { replace: true });
    };
    const goToSubShellPage = () => {
        const bhorModalColor = encodeURIComponent(decodedColor);
        navigate(`/subShell/${index}/${Ename}/${automicNum}/${bhorModalColor}`, { replace: true });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <button className="custom-button pull-push-anime mb-2" style={{ backgroundColor: decodedColor }} onClick={gotoTable}>Back</button>
                </div>
                <div className="col-sm-4">
                    <h3 className='head-style text-white' style={{ backgroundColor: `${decodedColor}` }}>{Ename}-{automicNum}</h3>
                </div>
            </div>

            {/* <h3>{index}</h3> */}
            <div className="row g-3">
                {components.map(({ id, component }) => (
                    <div className="col-sm-12 col-md-6 col-xl-4" key={id}>
                        <Box decodedColor={decodedColor}>{component}</Box>
                    </div>
                ))}
                <div className="col-sm-12 col-md-6 col-xl-4">
                    <div className="button-container">
                        <button className="custom-button pull-push-anime" style={{ backgroundColor: decodedColor }} onClick={gotoBhorModalPage}>Bhor Modal</button>
                        <button className="custom-button pull-push-anime" style={{ backgroundColor: decodedColor }} onClick={goToSubShellPage}>Aufbau Principal</button>
                        {/* <a href={watchAndLearnLink}><button className="custom-button pull-push-anime" style={{ backgroundColor: decodedColor }}>Watch and Learn</button></a> */}
                        <a href={watchAndLearnLink} className="custom-button text-center pull-push-anime" style={{ backgroundColor: decodedColor, textDecoration: 'none' }}>Watch and Learn</a>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Box({ children, decodedColor }) {
    return (
        <div className="box" style={{ backgroundColor: decodedColor }}>
            {children}
        </div>
    )
}


function ElementCard({ elementSymbol, elementName, atomicNumber, atomicMass, elementImage }) {
    return (
        <div className="card card-style element-card">
            <div className="row">
                <div className="col-sm-4">
                    <img src={elementImage} alt={elementName} className="img-fluid rounded fixed-image" />
                    {/* <img src="" alt="" /> */}
                    {/* <p>This is image seciton</p> */}
                </div>
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <p className="mb-0">{atomicNumber}</p>
                            <p className="mb-0">{atomicMass}</p>
                        </div>
                        <div className="card-body text-center">
                            <h2 className="element-symbol">{elementSymbol}</h2>
                        </div>
                        <div className="card-footer text-center">
                            <strong>{elementName}</strong>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}


function ElementDetails({ elementName, elementSymbol }) {
    return (
        <div className="card card-style element-details">
            <div className="card-header">Element Detail</div>
            <div className="card-body">
                <p><strong>Element Name</strong></p>
                <p>{elementName}</p>
                <p><strong>Element Symbol</strong></p>
                <p>{elementSymbol}</p>
            </div>
        </div>
    );
}

function ValanceElectron({ eSymbol, pValue }) {
    return (
        <div className="card card-style valence-card">
            <div className="card-header">Valance Electron</div>
            <div className="card-body">
                <CreateAnimation elementName={eSymbol} pValue={pValue} isValance={true} />
            </div>
        </div>
    );
}

function AtomStructure({ eSymbol, automicNum, nutron }) {
    return (
        <div className="card card-style atom-structure">
            <div className="card-header">Basic particles of an atom</div>
            <div className="card-body text-center">
                <div className="row">
                    <div className="col-sm-6">
                        <CreateAnimation elementName={eSymbol} pValue={automicNum} isValance={false} />
                    </div>
                    <div className="col-sm-6">
                        <div className="elementNum">
                            <p>Protons: {automicNum}</p>
                            <p>Neutrons: {nutron}</p>
                            <p>Electrons: {automicNum}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Application({ elementImg, elementItems }) {
    return (
        <div className="card card-style application">
            <div className="card-header">Applications of Lead</div>
            <div className="card-body text-center">
                <div className="row">
                    <div className="col-sm-6">
                        <img src={elementImg} alt="Applications" className="img-fluid" />
                    </div>
                    <div className="col-sm-6">
                        <ul className="text-start">
                            <li>{elementItems[0]}</li>
                            <li>{elementItems[1]}</li>
                            <li>{elementItems[2]}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;