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
// import AudioBar from "../Audio Bar/AudioBar";

function HomePage() {
  const [topAlbum, setTopAlbum] = useState([]);
  const [newAlbum, setNewAlbum] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGeneres] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const topAlbumData = await fetchTopAlbum();
        setTopAlbum(Array.isArray(topAlbumData) ? topAlbumData : []);

        const newAlbumData = await fetchNewAlbum();
        setNewAlbum(Array.isArray(newAlbumData) ? newAlbumData : []);

        const fetchSongsData = await fetchSongs();
        setSongs(Array.isArray(fetchSongsData) ? fetchSongsData : []);

        const fetchSongsGenere = await fetchGenres();
        setGeneres(fetchSongsGenere?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // ✅ Ensure concat is always safe
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
      {/* <AudioBar song={{}} /> */}
    </>
  );
}

export default HomePage;
