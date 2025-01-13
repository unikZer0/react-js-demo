import "../src/dist/styles.css";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom"; 
import Team from "./Pages/Team";
import Form from "./Pages/From";
import Contact from "./Pages/Contact";
import Booking_begin from "./Pages/Booking_begin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="booking" element={<Booking_begin/>} />
        <Route path="from" element={<Form />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
