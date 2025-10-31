import React, { useState, useEffect } from "react";
import sectionStyles from "../Section/section.module.css";
import Hero from "../Hero/Hero";
import Navbar from "../Navbar/Navbar";
import Section from "../Section/Section";
import {
  fetchTopAlbum,
  fetchNewAlbum,
  fetchSongs,
  fetchGenres,
} from "../../api/api";
import { FAQs } from "../FAQs/FAQs";
import Footer from "../Footer/Footer";

function HomePage() {
  const [topAlbum, setTopAlbum] = useState([]);
  const [newAlbum, setNewAlbum] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
  (async () => {
    try {
      const topAlbumData = await fetchTopAlbum();
      console.log("🎵 Top Albums:", topAlbumData);
      setTopAlbum(Array.isArray(topAlbumData) ? topAlbumData : []);

      const newAlbumData = await fetchNewAlbum();
      console.log("🆕 New Albums:", newAlbumData);
      setNewAlbum(Array.isArray(newAlbumData) ? newAlbumData : []);

      const fetchSongsData = await fetchSongs();
      console.log("🎶 Songs:", fetchSongsData);
      setSongs(Array.isArray(fetchSongsData) ? fetchSongsData : []);

      const fetchSongsGenere = await fetchGenres();
      console.log("🎧 Genres:", fetchSongsGenere);
      setGenres(Array.isArray(fetchSongsGenere) ? fetchSongsGenere : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })();
}, []);

  const allAlbums = (Array.isArray(topAlbum) ? topAlbum : []).concat(
    Array.isArray(newAlbum) ? newAlbum : []
  );

  return (
    <>
      <Navbar data={allAlbums} page="home" />
      <Hero />
      <div className={sectionStyles.sectionWrapper}>
        <Section title="Top Albums" data={topAlbum} type="album" />
        <Section title="New Albums" data={newAlbum} type="album" />
        <hr />
        <Section title="Songs" data={songs} type="songs" genres={genres} />
        <hr />
      </div>
      <FAQs />
      <hr style={{ backgroundColor: "gray", border: "1px solid gray" }} />
      <Footer />
      <hr />
    </>
  );
}

export default HomePage;
