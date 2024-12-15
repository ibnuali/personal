// src/components/Layout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Widget from "./Widget";

const Layout: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      role="none"
      className="bg-[#201f25]"
      style={{
        background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, #f56565, #000)`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-28 min-h-screen">
        <div className="flex flex-col">
          <Header />
          <Outlet />
        </div>
      </div>
      <Widget />
    </div>
  );
};

export default Layout;
