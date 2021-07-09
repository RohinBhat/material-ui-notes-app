import React from "react";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const url = "http://localhost:8000/notes";

const useStyles = makeStyles({
  field: {
    marginTop: "2rem",
    marginBottom: "2rem",
    display: "block",
  },
  title: {
    marginTop: "2rem",
    fontWeight: "600",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("Todos");

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => {
        history.push("/");
      });
      setTitle("");
      setDetails("");
      setCategory("Todos");
    }
  };

  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h4"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="false" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          name="title"
          value={title}
          className={classes.field}
          variant="outlined"
          label="Note Title"
          color="secondary"
          required
          fullWidth
          error={titleError}
          helperText={titleError ? "This field cannot be empty" : ""}
        />
        <TextField
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          name="details"
          value={details}
          className={classes.field}
          variant="outlined"
          label="Details"
          color="secondary"
          required
          fullWidth
          multiline
          rows={6}
          error={detailsError}
          helperText={detailsError ? "This field cannot be empty" : ""}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <FormControlLabel
              value="Todos"
              control={<Radio />}
              label="Todos"
            ></FormControlLabel>
            <FormControlLabel
              value="Money"
              control={<Radio />}
              label="Money"
            ></FormControlLabel>
            <FormControlLabel
              value="Reminders"
              control={<Radio />}
              label="Reminders"
            ></FormControlLabel>
            <FormControlLabel
              value="Work"
              control={<Radio />}
              label="Work"
            ></FormControlLabel>
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
