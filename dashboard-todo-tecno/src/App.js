import "./assets/css/app.css";
import SideBar from "./components/SideBar/SideBar";
import ContentWrapper from "./views/ContentWrapper/ContentWrapper";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import NotFound from "./views/404/NotFound";
import './App.css';

function App() {
  return (
		<div id="wrapper">
			{/* <!-- Sidebar --> */}
			<SideBar />
			{/* <!-- End of Sidebar --> */}

			<div id="content-wrapper" className="d-flex flex-column">
				<TopBar />

				<Routes>
					<Route path="/" element={<ContentWrapper />} />
					<Route path="*" element={<NotFound />} />					
				</Routes>

				<Footer />
			</div>
		</div>
	);
}

export default App;
