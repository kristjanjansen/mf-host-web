import { Routes, Route, Navigate } from "react-router-dom";

import { mfs } from "./config/config";

import { MfElement } from "./components/MfElement";
import { MfNavigation } from "./components/MfNavigation";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

const routeMfs = Object.values(mfs).filter((m) => m.route);

export default function App() {
  return (
    <>
      <MfElement mf={mfs.layout}>
        <MfNavigation mf={mfs.navigation} slot="navigation" />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {routeMfs.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={<MfElement mf={r} slot="content" />}
            />
          ))}
          <Route path="*" element={<div slot="content">Not found</div>} />
        </Routes>
      </MfElement>
      <MfElement mf={mfs.cookiebot} />
    </>
  );
}
