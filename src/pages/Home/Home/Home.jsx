import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = true;
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="underline font-bold text-3xl">Hello World</h1>
    </div>
  );
};

export default Home;
