import React, { useState, useRef } from "react";
import sound1 from "../../assets/sounds/sound1.mp3";
import sound2 from "../../assets/sounds/sound2.mp3";
import { PauseCircle, PlayCircle } from "iconsax-react";
import { Sound } from "../../slices/scratchCard";

interface PuzzleSoundEffectType {
  handleSoundData: (Sound: Sound | null, label: string) => void;
  label: string;
}
const PuzzleSoundEffect: React.FC<PuzzleSoundEffectType> = ({
  handleSoundData,
  label,
}) => {
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Define your list of sounds
  const sounds: Sound[] = [
    { id: 1, name: "Sound 1", url: sound1 },
    { id: 2, name: "Sound 2", url: sound2 },
    // Add more sounds as needed
  ];

  const handleSoundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSoundId = parseInt(event.target.value);
    const sound = sounds.find((s) => s.id === selectedSoundId) || null;
    setSelectedSound(sound);
    handleSoundData(sound, label);
  };

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex place-items-center gap-3">
      <select
        onChange={handleSoundChange}
        className="w-24 outline-none border border-slate-700 rounded-md bg-[#F1F5F9] px-1"
      >
        <option value="">Select a sound</option>
        {sounds.map((sound) => (
          <option key={sound.id} value={sound.id!}>
            {sound.name}
          </option>
        ))}
      </select>
      <div className="flex place-items-center">
        <button onClick={playSound} disabled={!selectedSound}>
          <PlayCircle size="20" color="#c0a0ff" variant="Bold" />
        </button>
        <button onClick={stopSound} disabled={!selectedSound}>
          <PauseCircle size="20" color="#c0a0ff" variant="Bold" />
        </button>
      </div>
      {selectedSound && (
        <audio ref={audioRef} src={selectedSound.url}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default PuzzleSoundEffect;
