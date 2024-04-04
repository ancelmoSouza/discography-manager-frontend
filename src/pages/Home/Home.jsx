import React, { useEffect, useState } from "react";
import {
  getMusics,
  deleteMusic,
  uploadMusic,
  getAudio,
  getByName,
} from "../../services/musicService";
import {
  deleteAlbum,
  getAlbums,
  getByTitle,
  postAlbum,
} from "../../services/albumService";

import { Link } from "react-router-dom";

import BaseSelect from "../../components/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.css";
import StopIcon from "@mui/icons-material/Stop";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const Home = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const [id, setId] = useState("");
  const [start, setStart] = useState(false);
  const audio = new Audio();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAlbum, setOpenAlbum] = useState(false);
  const [list, setList] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [musics, setMusics] = useState([]);
  const [option, setOption] = useState(1);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const [search, setSearch] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenAlbum = () => setOpenAlbum(true);
  const handleCloseAlbum = () => setOpenAlbum(false);

  const handleSubmitAlbum = () => {
    postAlbum({
      title: title,
      release_date: year,
    }).then((res) => {
      handleCloseAlbum();
      setSuccess(true);
      setMessage(res.data.message);

      setTimeout(() => {
        return window.location.reload();
      }, 2000);
    });
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handlerOption = (e) => {
    e.preventDefault();
    setOption(e.target.value);
  };

  const handlerSearch = (e) => {
    setSearch(e.target.value);
  };

  const delAlbum = (id) => {
    deleteAlbum(id)
      .then((res) => {
        setSuccess(true);
        setMessage(res.data.message);

        setTimeout(() => {
          return window.location.reload();
        }, 2500);
      })
      .catch((error) => console.log(error));
  };

  const getSearch = () => {
    if (option === 1) {
      console.log(search);
      getByTitle(search)
        .then((res) => {
          setAlbums(res.data.data);
          setSearch("");
        })
        .catch((error) => console.log(error));
    } else {
      getByName(search)
        .then((res) => {
          setMusics(res.data.data);
          setSearch("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const details = () => {
    const fileInput = document.getElementById("input-file");
    const fileName = fileInput.files[0].name;

    setFileName(fileName);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFileChange = (event) => {
    details();
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const data = {
      name: name,
      release_date: date,
      author_id: 1,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("file", file);

    uploadMusic(formData)
      .then((resp) => {
        handleClose();
        setSuccess(true);
        setMessage(resp.data.message);

        setTimeout(() => {
          return window.location.reload();
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  const load = (uuid) => {
    getAudio(uuid)
      .then((res) => {
        const data = atob(res.data.base64_file);
        const dataArray = new Uint8Array(data.length);

        for (let i = 0; i < data.length; i++) {
          dataArray[i] = data.charCodeAt(i);
        }
        const blob = new Blob([dataArray.buffer], { type: "audio/mp3" });

        audio.src = URL.createObjectURL(blob);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const delMusic = (id) => {
    deleteMusic(id)
      .then((resp) => {
        setSuccess(true);
        setMessage(resp.data.data.message);

        setTimeout(() => {
          return window.location.reload();
        }, 2500);

        console.log(resp.data);
      })
      .catch((error) => console.log(error));
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
    getAlbums()
      .then((res) => {
        setAlbums(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getMusics()
      .then((res) => {
        setMusics(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {success ? (
        <Alert
          sx={{ margin: "2%" }}
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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "2%",
          }}
        >
          <div></div>
          <BaseSelect option={option} handleChange={handlerOption} />
          {option === 2 ? (
            <Button
              sx={{
                margin: "6% 0 0 3%",
                width: "80%",
                height: "10%",
                backgroundColor: "#363636",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                },
              }}
              onClick={() => {
                handleOpen();
                audio.pause();
                audio.currentTime = 0;
              }}
            >
              Adicionar
            </Button>
          ) : (
            <Button
              onClick={handleOpenAlbum}
              sx={{
                margin: "6% 0 0 3%",
                width: "80%",
                height: "10%",
                backgroundColor: "#363636",
                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                },
              }}
            >
              Adicionar
            </Button>
          )}
        </div>
        {option === 2 ? (
          <Alert
            sx={{ margin: "2%" }}
            icon={<InfoIcon fontSize="inherit" />}
            severity="info"
          >
            Click na musica para caregá-la em seguida clique no botão de início
          </Alert>
        ) : (
          <></>
        )}
        <Box id="home-box">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "5%",
              justifyContent: "space-between",
            }}
          >
            <Search onChange={(event) => handlerSearch(event)} value={search} />
            <Button
              sx={{
                backgroundColor: "#363636",
                fontSize: "12px",
                marginLeft: "1%",

                color: "#fff",
                ":hover": {
                  backgroundColor: "green",
                },
              }}
              onClick={getSearch}
            >
              Pesquisar
            </Button>
          </div>
          <List>
            {option === 1
              ? albums.map((e) => {
                  return (
                    <ListItem
                      sx={{
                        marginBottom: "2%",
                        padding: 0,
                        width: "100%",
                        borderBottom: "2px solid #363636",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to={`/album/${e.id}`}
                      >
                        {e.title}
                      </Link>{" "}
                      <Button
                        onClick={(event) => {
                          event.preventDefault();
                          delAlbum(e.id);
                        }}
                        endIcon={<DeleteIcon />}
                      ></Button>
                    </ListItem>
                  );
                })
              : musics.map((e) => {
                  return (
                    <ListItem
                      sx={{
                        marginBottom: "2%",
                        padding: 0,
                        width: "100%",
                        borderBottom: "2px solid #363636",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        onClick={() => load(e.uuid_file)}
                      >
                        {e.name}
                      </Link>{" "}
                      <div>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            delMusic(e.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            audio.play();
                          }}
                        >
                          <PlayArrowIcon />
                        </Button>
                        <Button>
                          <PauseCircleFilledIcon
                            onClick={() => audio.pause()}
                          />
                        </Button>
                        <Button
                          onClick={() => {
                            audio.pause();
                            audio.currentTime = 0;
                          }}
                        >
                          <StopIcon />
                        </Button>
                      </div>
                    </ListItem>
                  );
                })}
          </List>
        </Box>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "2%" }}
          >
            Adicionar Musica
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "5px 5px 5px 5px",
              }}
            >
              <TextField
                id="standard-basic"
                label="Name"
                value={name}
                onChange={(e) => handleNameChange(e)}
                variant="standard"
                sx={{ margin: "1%" }}
              />
              <TextField
                id="standard-basic"
                label="Ano de Lancamento"
                onChange={(e) => handleDateChange(e)}
                value={date}
                sx={{ margin: "1%" }}
                variant="standard"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "80%",
                alignItems: "center",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <Input
                  id="input-file"
                  sx={{
                    height: 1,
                    overflow: "hidden",
                    position: "absolute",
                    width: 1,
                    clip: "rect(0 0 0 0)",
                    clipPath: "inset(50%)",
                    bottom: 0,
                    left: 0,
                    whiteSpace: "nowrap",
                  }}
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
              <label style={{ margin: "2%", overflow: "hidden" }}>
                <p style={{ fontSize: 14 }}>{fileName}</p>
              </label>
            </div>
          </div>
          <Button
            sx={{
              margin: "2%",
              backgroundColor: "#363636",
              color: "#fff",
              ":hover": {
                backgroundColor: "green",
              },
            }}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openAlbum}
        onClose={handleCloseAlbum}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Adicionar Album</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "5px 5px 5px 5px",
              }}
            >
              <TextField
                id="standard-basic"
                label="Titulo"
                value={title}
                onChange={(e) => handleTitle(e)}
                variant="standard"
                sx={{ margin: "1%" }}
              />
              <TextField
                id="standard-basic"
                label="Ano de Lancamento"
                onChange={(e) => handleYear(e)}
                value={year}
                sx={{ margin: "1%" }}
                variant="standard"
              />
            </div>
          </div>
          <Button
            sx={{
              backgroundColor: "green",
              color: "#fff",
              ":hover": {
                color: "#000",
              },
            }}
            onClick={handleSubmitAlbum}
          >
            Salvar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
