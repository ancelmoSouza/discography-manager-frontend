import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OptionContext from "../../context/OptionContext";

const BaseSelect = (props) => {
  return (
    <FormControl sx={{ width: "100%", margin: "2%" }}>
      <InputLabel id="demo-simple-select-label">Opções</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.option}
        label="Option"
        onChange={props.handleChange}
      >
        <MenuItem value={1}>Album</MenuItem>
        <MenuItem value={2}>Musicas</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BaseSelect;
