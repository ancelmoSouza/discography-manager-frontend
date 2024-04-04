import { useEffect, useState } from "react";
import { addMusic, getMusicsByAlbum } from "../../services/albumService";
import { useParams } from "react-router-dom";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from "@mui/icons-material/Info";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { Link, useNavigate } from "react-router-dom";
import { getMusics } from "../../services/musicService";

const Album = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [year, setYear] = useState("");
  const [musics, setMusics] = useState([]);
  const [allMusics, setAllMusics] = useState([]);
  const [selected, setSelected] = useState({});
  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeSelected = (event) => {
    setSelected(event.target.value);
  };

  const AddMusicToAlbum = () => {
    addMusic({ musicId: selected, albumId: id })
      .then((res) => {
        console.log(res.data);
        handleClose();
        setSelected("");
        setSuccess(true);
        setMessage(res.data.message);
        setTimeout(() => {
          return window.location.reload();
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  const handleMusics = (musics) => {
    setMusics(musics);
  };

  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getMusicsByAlbum(id)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.data.album_title);
        setYear(res.data.data.release_date);
        setMusics(res.data.data.songs);
      })
      .catch((error) => console.log(error));
    getMusics()
      .then((res) => {
        setAllMusics(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {success ? (
        <Alert
          sx={{ margin: "8px" }}
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
        >
          {message}
        </Alert>
      ) : (
        <></>
      )}
      <div
        id="back-buttom"
        style={{
          display: "flex",
          margin: "2em 0 1em 20em",
          alignSelf: "start",
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar Musica
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ minWidth: "50%", margin: "2%" }}>
              <InputLabel id="demo-simple-select-label">Opções</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="Musica"
                onChange={changeSelected}
              >
                {allMusics.map((e) => {
                  return <MenuItem value={e.id}>{e.name}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <Button
              sx={{
                backgroundColor: "#363636",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                },
              }}
              onClick={AddMusicToAlbum}
            >
              Adicionar
            </Button>
          </div>
        </Box>
      </Modal>

      <h2>{`${year} - ${title}`}</h2>
      <div
        style={{
          width: musics.length === 0 ? "25%" : "20%",
          padding: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: musics.length === 0 ? "center" : "start",
          border: "1px solid #363636",
          borderRadius: "8px",
        }}
      >
        {musics.length === 0 ? (
          <Alert
            sx={{
              margin: "8px",
              width: "400em",
              textAlign: "center",
              display: "flex",
            }}
            icon={<InfoIcon fontSize="inherit" />}
            severity="info"
          >
            Este Álbum ainda n contém Faixas. Adicione uma nova!
          </Alert>
        ) : (
          <></>
        )}
        <List style={{ padding: "2%", width: "100%" }}>
          {musics.map((e) => {
            return (
              <ListItem
                sx={{
                  marginBottom: "10%",
                  padding: 0,
                  width: "100%",
                  borderBottom: "2px solid #363636",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {e.name}
              </ListItem>
            );
          })}
        </List>
      </div>
      <Button
        sx={{
          margin: "2em",
          backgroundColor: "green",
          color: "#fff",
          ":hover": {
            backgroundColor: "#363636",
          },
        }}
        onClick={handleOpen}
      >
        Adicionar Musica
      </Button>
    </div>
  );
};

export default Album;
