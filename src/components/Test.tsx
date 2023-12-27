import React, { useState, useRef } from "react";
import sound1 from "../assets/sounds/sound1.mp3";
import sound2 from "../assets/sounds/sound2.mp3";
interface Sound {
  id: number;
  name: string;
  url: string;
}

const SoundSelector: React.FC = () => {
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
    <div>
      <select onChange={handleSoundChange}>
        <option value="">Select a sound</option>
        {sounds.map((sound) => (
          <option key={sound.id} value={sound.id}>
            {sound.name}
          </option>
        ))}
      </select>
      <button onClick={playSound} disabled={!selectedSound}>
        Play
      </button>
      <button onClick={stopSound} disabled={!selectedSound}>
        Stop
      </button>
      {selectedSound && (
        <audio ref={audioRef} src={selectedSound.url}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default SoundSelector;
