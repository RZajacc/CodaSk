'use client';
import {useRouter} from 'next/navigation';

function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="text-4xl text-black">
      <button onClick={goBack}>←</button>
    </div>
  );
}
export default BackButton;
