import { createRoot } from "react-dom/client";
import Chatbot from "./Chatbot";

function App() {
    return (
        <>
            <Chatbot />
        </>
    )
}


createRoot(document.getElementById('root')).render(<App />);