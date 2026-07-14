"use client";

import { TypeAnimation } from "react-type-animation";

export const AnimHeader = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          "Full Stack Developer",
          800,
          "React · Node.js · TypeScript",
          800,
          "Apps, APIs y automatizaciones",
          800,
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{
          fontSize: "1em",
          paddingLeft: "5px",
        }}
      />
    </div>
  );
};
