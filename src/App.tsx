import { Routes, Route, Navigate } from "react-router-dom";

import { mfs } from "./config/config";

import { MfLayout } from "./components/MfLayout";
import { MfNavigation } from "./components/MfNavigation";
import { MfRoute } from "./components/MfRoute";

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
    <div>
      <h1>Microfrontend Host</h1>

      <MfLayout mf={mfs.layout}>
        <MfNavigation mf={mfs.navigation} slot="content" />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {routeMfs.map((r) => (
            <Route
              key={r.id}
              path={r.path}
              element={<MfRoute mf={r} slot="content" />}
            />
          ))}
          <Route path="*" element={<div slot="content">Not found</div>} />
        </Routes>
      </MfLayout>
    </div>
  );
}
