import { RideProvider } from "./context/RideProvider";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <RideProvider>
      <div className='h-screen'>
      <ToastContainer />
        <AppRoutes />
      </div>
    </RideProvider>
  );
}

export default App;
