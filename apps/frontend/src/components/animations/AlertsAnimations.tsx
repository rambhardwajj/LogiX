import Lottie from "react-lottie";
import animationData from "../../jsons/alerts.json";

export default function Overnight() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="animation h-[45vh] ">
      <Lottie  options={defaultOptions} />
    </div>
  );
}
