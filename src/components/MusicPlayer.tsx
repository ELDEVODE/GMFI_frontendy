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
    Math.floor(Math.random() * (tracks?.length || 1))
  );
  const { isMusicPlaying } = useQuizStore();

  useEffect(() => {
    if (!audioRef.current && tracks && tracks.length > 0) {
      audioRef.current = new Audio();
      audioRef.current.src = tracks[currentTrackIndex].url;
      audioRef.current.load();
    }

    const handleEnded = () => {
      playNextTrack();
    };

    audioRef.current?.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.pause();
      }
    };
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current
          .play()
          .then(() => showTrackToast())
          .catch((error) => console.error("Audio playback failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const showTrackToast = () => {
    if (tracks && tracks[currentTrackIndex]) {
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
    }
  };

  const playNextTrack = () => {
    if (tracks && tracks.length > 0) {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
  };

  return null;
};

export default MusicPlayer;
