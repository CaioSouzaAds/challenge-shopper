import { useNavigate } from "react-router-dom";

const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  const goToOptions = () => {
    navigate("/options");
  };

  const goToHistory = () => navigate("/history");

  return { navigate, goToHome, goToOptions, goToHistory };
};

export default useAppNavigation;
