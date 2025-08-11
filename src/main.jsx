import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import BhorModal from "./BhorModal";
import Details from "./Details";
import Table from "./Tables";
import SubShells from "./SubShells";
import './table.css';

export default function Main() {
    return (
        <div className="main-wrapper">
            <Router>
                <Routes>
                    <Route path="/SampleApp" element={<Table />} />
                    <Route path="/details/:index/:color?" element={<Details />} />
                    <Route path="/bhormodal/:pvalue/:esymbol/:ename/:subShells/:bgColor?" element={<BhorModal />} />
                    <Route path="/subShell/:index/:ename/:atomicNum/:bgColor?" element={<SubShells />} />
                </Routes>
            </Router>
        </div>
    );
}
