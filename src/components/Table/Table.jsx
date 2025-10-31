import React, { useState } from "react";
import styles from "./table.module.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Pagination from "../Pagination/Pagination";

function SongsTable({ album }) {
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  // ✅ Safety check: if album or songs is undefined
  if (!album || !Array.isArray(album.songs)) {
    return <p>Loading songs...</p>;
  }

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = album.songs.slice(indexOfFirstSong, indexOfLastSong);

  return (
    <div>
      <div style={{ marginBottom: "70px" }}></div>
      <div className={styles.table}>
        <Pagination
          songsPerPage={songsPerPage}
          totalSongs={album.songs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      <TableContainer
        sx={{
          maxHeight: {
            xs: 550,
            sm: "100vh",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table" className={styles.table}>
          <TableHead>
            <TableRow className={styles.tableHeader}>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentSongs.map((song) => {
              const mins = Math.floor(song.durationInMs / 60000);
              const sec = Math.floor((song.durationInMs % 60000) / 1000)
                .toString()
                .padStart(2, "0");
              const duration = `${mins}:${sec}`;
              return (
                <TableRow key={song.id}>
                  <TableCell className={styles.rowData}>
                    <div className={styles.imgRow}>
                      <div className={styles.songImg}>
                        <img src={song.image} alt={song.title} />
                      </div>
                      {song.title}
                    </div>
                  </TableCell>
                  <TableCell className={styles.rowData}>
                    {Array.isArray(song.artists)
                      ? song.artists.join(", ")
                      : "Unknown"}
                  </TableCell>
                  <TableCell className={styles.rowData}>{duration}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          margin: "20px 0 70px 0",
          borderBottom: "3px solid rgba(255, 255, 255, 0.35)",
        }}
      ></div>
    </div>
  );
}

export default SongsTable;
