import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tracks as defaultTracks } from "../data/music";
import { useQuizStore } from "../store/store";

interface Track {
  url: string;
  name: string;
  artist: string;
}

interface MusicPlayerProps {
  tracks?: Track[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks = defaultTracks,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * tracks.length)
  );
  const { isMusicPlaying } = useQuizStore();

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const handleEnded = () => {
      playNextTrack();
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].url;
      audioRef.current.load();

      if (isMusicPlaying) {
        audioRef.current
          .play()
          .then(() => showTrackToast())
          .catch((error) => console.error("Audio playback failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIndex, isMusicPlaying, tracks]);

  const showTrackToast = () => {
    const { name, artist } = tracks[currentTrackIndex];
    toast.info(`Now playing: ${name} by ${artist}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  return null;
};

export default MusicPlayer;
