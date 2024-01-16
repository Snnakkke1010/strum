import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoLoginPage from "../NoLoginPage/NoLoginPage";
import {ROUTES} from "../../utils/routes";
import Auth from "../Auth/Auth";
import Cabinet from "../Cabinet/Cabinet";
import UserProfileUpdate from "../UpdateProfile/UpdateProfile";
import Vacancies from "../Vacancies/Vacancies";
import ProtectedRoute from "../../utils/ProtectedRoute";



const ProjectRoutes = () => {
  return (
      <Routes>
          <Route path={ROUTES.ANONIM} element={<NoLoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<Auth/>} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<Cabinet/>} />
          </Route>
          <Route path={ROUTES.UPDATEPROFILE} element={<UserProfileUpdate/>} />
          <Route path={ROUTES.VACANCIES} element={<Vacancies/>} />
      </Routes>
  );
};

export default ProjectRoutes;
