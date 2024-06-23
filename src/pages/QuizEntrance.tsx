import { url } from '@/const/url';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ThreeButtons() {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleClick = (buttonNumber: number) => {
    setClickedButton(buttonNumber);
    setTimeout(() => {
      if(buttonNumber == 0){
        navigate(url.selectstage);
      }
      else if(buttonNumber == 1){
        navigate(url.tetrisQuiz);
      }
      else if(buttonNumber == 2){
        navigate(url.tetrisQuiz);
      }
       //to={url.tetrisQuiz}
    }, 500); // アニメーションの持続時間と同じに設定
  };

  return (

    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="text-6xl">難易度選択</div>
      {['Level 1', 'Level 2', 'Level 3'].map((buttonLabel, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-48 border rounded-md p-2 border-gray-500 transform transition duration-500 ease-in-out hover:scale-110 active:scale-95 ${clickedButton === 0 && index !== 0 ? 'translate-y-full' : clickedButton === 1 ? (index === 0 ? '-translate-y-full' : 'translate-y-full') : clickedButton === 2 && index !== 2 ? '-translate-y-full' : ''}`}

        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
}
