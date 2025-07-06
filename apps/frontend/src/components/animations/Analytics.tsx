import Lottie from "react-lottie";
import animationData from "../../jsons/analytics.json";

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
    <div className="animation">
      <Lottie options={defaultOptions} />
    </div>
  );
}
