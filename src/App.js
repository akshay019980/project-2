import { HashRouter,Routes,Route } from "react-router-dom";
import Brand from "./brand";
import Save from "./save";
import Cat from "./category";
import Catedit from "./editcat";
import Header from "./headers";
import Product from "./product";
import EDitP from "./editproduct";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Brand/>}/>
        <Route exact path="/save/:brandid" element={<Save/>}/>
        <Route exact path="/category" element={<Cat/>}/>
        <Route exact path="/editcat/:catid" element={<Catedit/>}/>
        <Route exact path="/headers" element={<Header/>}/>
        <Route exact path="/product" element={<Product/>}/>
        <Route exact path="/editproduct/:productid" element={<EDitP/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
