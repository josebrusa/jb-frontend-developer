import { TypeAnimation } from "react-type-animation";

export const AnimHeader = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          "Hola!!!",
          1000,
          "Soy Jose Brusa",
          2000,
          "Frontend Developer",
          5000,
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
