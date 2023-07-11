import { TypeAnimation } from "react-type-animation";

export const AnimHeader = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          "Hola!!!",
          800,
          "Soy Jose Brusa",
          800,
          "Frontend Developer",
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
