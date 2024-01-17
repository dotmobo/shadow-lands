import { faMusic, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import React, { useState, useRef, useEffect } from 'react';

const LecteurAudio: React.FC<{ src: string }> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={src}
        loop={true}
        // onLoadedData={() => setIsPlaying(true)}
      />
      <Button onClick={togglePlayPause} aria-label='toggle playing music'>
        <FontAwesomeIcon icon={faMusic} size='sm' className='mr-1' />
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size='sm' />
      </Button>
    </div>
  );
};

export default LecteurAudio;
