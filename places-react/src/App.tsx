import { Routes, Route, Navigate } from "react-router-dom";
import NewPlace from "./places/pages/NewOlace";
import Users from "./users/pages/Users";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/places/new" element={<NewPlace />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />} //this is a way to redirect
      />
    </Routes>
  );
};

export default App;
