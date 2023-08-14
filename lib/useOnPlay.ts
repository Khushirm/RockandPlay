import { Song } from "@prisma/client";
import usePlayer from "./usePlaySong";

const useOnPlay = (song: Song) => {
  const player = usePlayer();

  const onPlay = (id: string) => {
    player.setId(id);
  };

  return onPlay;
};

export default useOnPlay;
