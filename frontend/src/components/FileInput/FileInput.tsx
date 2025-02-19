import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }

    onGetFile(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid size={{xs: 9}}>
          <TextField
            disabled
            label={label}
            value={fileName}
            onClick={activateInput}
            sx={{width: 1}}
          />
        </Grid>
        <Grid size={{xs: 2}}>
          <Button variant="contained" onClick={activateInput} sx={{width: 1}}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
