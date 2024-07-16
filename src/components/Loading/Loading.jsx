import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";

const Loading = () => {
  return (
    <div className="min-h-96 flex justify-center items-center">
      <Lottie className="max-w-[6rem]" animationData={loadingAnimation} />
    </div>
  );
};

export default Loading;
