import Lottie from "react-lottie";
import animationData from "../../jsons/analytics.json";

export default function Analytics() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="animation  h-[27vh] w-[27vw] ml-[-4vw]">
      <Lottie options={defaultOptions} />
    </div>
  );
}
