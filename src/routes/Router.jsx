import React from "react";
import { Route, Routes } from "react-router-dom";
import views from "./views";

export const Router = () => {
  return (
    <Routes>
      {views.map((view, index) => (
        <Route
          key={index}
          path={view.path}
          element={<view.component />}
          exact={view.exact}
        />
      ))}
    </Routes>
  );
};
