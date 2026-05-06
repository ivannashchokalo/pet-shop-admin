import { Route, Routes } from "react-router";
import Layout from "../Layout";
import Home from "../../pages/Home/Home";
import Animals from "../../pages/Animals/AnimalsPage";
import AnimalDetailes from "../../pages/AnimalDetailes/AnimalDetails";
import Request from "../../pages/Requests/Request";
import Settings from "../../pages/Settings/Settings";
import CreateNewAnimal from "../../pages/Animals/CreateAnimalPage";
import EditAnimal from "../../pages/Animals/EditAnimalPage";
import SignIn from "../../pages/SignIn/SignIn";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AuthRedirect from "../AuthRedirect/AuthRedirect";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="animals" element={<Animals />} />
            <Route path="animals/:id" element={<AnimalDetailes />} />
            <Route path="animals/:id/edit" element={<EditAnimal />} />
            <Route path="animals/new" element={<CreateNewAnimal />} />
            <Route path="requests" element={<Request />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
