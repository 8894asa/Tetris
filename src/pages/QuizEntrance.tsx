import { Link } from "react-router-dom";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { url } from '@/const/url';

export function ThreeButtons() {
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleClick = (buttonNumber: number) => {
    setClickedButton(buttonNumber);
    setTimeout(() => {
      // SelectStage.tsxからselectstage0,1,2という関数を作り、buttonNumberで行き先を管理
      const stageUrl = url[`selectstage${buttonNumber}` as keyof typeof url];
      navigate(stageUrl)

    }, 500); // アニメーションの持続時間と同じに設定
  };


  // こちらでbuttonsを名前、クリックイベント操作、形態と動作を指定
  const buttons = ['Level 1', 'Level 2', 'Level 3'].map((buttonLabel, index) => ({
    label: buttonLabel,
    onClick: () => handleClick(index),
    className: `w-48 border rounded-md p-2 border-gray-500 transform transition duration-250
     ease-in-out hover:scale-110 active:scale-95 ${clickedButton === 0 && index !== 0 ?
      'translate-y-3' : clickedButton === 1 ? (index === 0 ? '-translate-y-3' : index === 2 ?'translate-y-3' : '')
      : clickedButton === 2 && index !== 2 ? '-translate-y-3' : ''}`
  }));

   return (
   <div className="flex justify-center items-center h-screen">
      <div className="w-32 mr-4 flex flex-col">
        <Link className="flex justify-center items-center border rounded-md p-2 border-gray-500 mb-2 transform transition duration-250 ease-in-out hover:scale-110 active:scale-95" to={url.menu}>
            メニュー
        </Link>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
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
    </div>
  );
}
