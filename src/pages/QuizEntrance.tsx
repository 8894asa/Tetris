import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { url } from '@/const/url';

export function ThreeButtons() {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleClick = (buttonNumber: number) => {
    setClickedButton(buttonNumber);
    setTimeout(() => {
      const stageUrl = url[`selectstage${buttonNumber}` as keyof typeof url];
      navigate(stageUrl)

    }, 500); // アニメーションの持続時間と同じに設定
  };

  const buttons = ['Level 1', 'Level 2', 'Level 3'].map((buttonLabel, index) => ({
    label: buttonLabel,
    onClick: () => handleClick(index),
    className: `w-48 border rounded-md p-2 border-gray-500 transform transition duration-500 ease-in-out hover:scale-110 active:scale-95 ${clickedButton === 0 && index !== 0 ? 'translate-y-full' : clickedButton === 1 ? (index === 0 ? '-translate-y-full' : 'translate-y-full') : clickedButton === 2 && index !== 2 ? '-translate-y-full' : ''}`
  }));

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="text-6xl">難易度選択</div>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={button.className}
          type="button"
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
