import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

class HospitalSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      isLoaded: false,
    };
  }

  async componentWillMount() {
    const data = await getHospitals();
    const sorted = data.sort((a,b) => (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0));
    this.setState({hospitals : sorted });
  }

  handleHospitalSelect(value) {
    if (value) {
      this.props.onSelectHospital(value.npi_number);
    }
  }

  render() {
    return (
      <Autocomplete
        onChange={(event, value) => this.handleHospitalSelect(value)}
        id="city-select"
        options={this.state.hospitals}
        autoHighlight
        getOptionLabel={(option) => { return `${option.name} - ${option.city}`;}}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.npi_number}
          >
            {option.name} - {option.city}, {option.state}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by city or hospital name..."
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }
}

async function getHospitals() {
  const response = await fetch("https://hospitalprice.io/hospitals.php");
  const hospitals = await response.json();
  return hospitals;
}

export default HospitalSelect;
