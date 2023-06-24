import { useNavigate } from "react-router-dom";

function SkinPath() {
  const navigate = useNavigate();

  const navigateToSection = (skinType) => {
    navigate.push(`/products#${skinType}`);
  };

  return (
    <div>
      <h1>Select Your Skin Type</h1>
      <button onClick={() => navigateToSection("dry-skin")}>Dry Skin</button>
      <button onClick={() => navigateToSection("dehydrated-skin")}>
        Dehydrated Skin
      </button>
      <button onClick={() => navigateToSection("oily-skin")}>Oily Skin</button>
      <button onClick={() => navigateToSection("combination-skin")}>
        Combination Skin
      </button>
    </div>
  );
}
export default SkinPath;
