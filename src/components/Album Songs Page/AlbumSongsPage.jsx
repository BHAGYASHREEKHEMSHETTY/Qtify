import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchTopAlbum, fetchNewAlbum } from "../../api/api";
import Navbar from "../Navbar/Navbar";
import SongsHero from "../Songs Page Hero/SongsHero";
import SongsTable from "../Table/Table";

const AlbumSongsPage = () => {
  const location = useLocation();
  const clickedAlbum = location?.state?.album; // safely access
  const { title } = useParams();
  const [songs, setSongs] = useState([]);

  // Fetch songs from all albums (top + new)
  const fetchSongs = async (albums) => {
    const findSong = albums.find((album) => album.slug === title);
    if (findSong && findSong.songs) {
      setSongs(findSong.songs);
    } else {
      setSongs([]);
    }
  };

  useEffect(() => {
    const fetchAlbumData = async () => {
      // If songs are already passed via location, use them directly
      if (clickedAlbum && clickedAlbum.songs) {
        setSongs(clickedAlbum.songs);
        return;
      }

      // Otherwise, fetch both album lists
      const topAlbum = await fetchTopAlbum();
      const newAlbum = await fetchNewAlbum();

      const allAlbums = topAlbum.concat(newAlbum);
      fetchSongs(allAlbums);
    };

    fetchAlbumData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, clickedAlbum]);

  return (
    <div>
      {/* Navbar with songs info */}
      <Navbar songsData={songs} page="song" />

      {/* Display album details (image, title, etc.) */}
      <SongsHero album={clickedAlbum} />

      {/* Display song list table */}
      <SongsTable album={songs} />
    </div>
  );
};

export default AlbumSongsPage;
