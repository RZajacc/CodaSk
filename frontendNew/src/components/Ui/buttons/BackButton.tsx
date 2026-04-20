import {useNavigate} from 'react-router';

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="text-4xl text-black">
      <button onClick={goBack}>←</button>
    </div>
  );
}
export default BackButton;
