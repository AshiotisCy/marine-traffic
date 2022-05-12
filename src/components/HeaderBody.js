import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const HeaderBody = (props) => {
  const { queryParams, setQueryParams } = props;

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Vessel ID"
        variant="outlined"
        onChange={(e) => setQueryParams({...queryParams, mmsi: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Days"
        variant="outlined"
        onChange={(e) => setQueryParams({...queryParams, days: e.target.value })}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={queryParams.period ?? ''}
          label="Period"
          onChange={(e) => setQueryParams({...queryParams, period: e.target.value })}
        >
          <MenuItem value={"hourly"}>Hourly</MenuItem>
          <MenuItem value={"daily"}>Daily</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default HeaderBody;
