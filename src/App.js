import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";
import Header from "./Header";
import HospitalSelect from "./HospitalSelect";
import Search from "./Search";
import Button from "@mui/material/Button";
import Results from "./Results";

class App extends React.Component {

  searching = false;

  constructor(props) {
    super(props);
    this.state = { hospital: null, search: [], results: [], error: null };
  }

  handleHospitalSelect = (npi) => {
    this.setState({ hospital: npi });
  };

  handleSearchChange = (value) => {
    this.setState({ search: [value] });
  };

  handleSearch = async () => {
    // User input required
    if (!this.state.hospital) {
      this.setState({ error: "Please select a hospital." });
    }
    if (!this.state.search.length) {
      this.setState({ error: "Please enter a search term." });
    }
    if (!this.state.hospital && !this.state.search.length) {
      this.setState({ error: "Please select a hospital and enter a search term." });
    }
    // Have input, do search
    if (this.state.hospital && this.state.search.length) {
      this.setState({ error: null });
      this.setState({ results: [] });
      this.searching = true;
      const results = await search(this.state);
      this.searching = false;
      // No results
      if (!results.length) {
        this.setState({ error: "No results found." });
      } else {
        // Update results
        this.setState({ error: null });
        this.setState({ results: results });
      }
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    let results;
    if (this.searching) {
      results = <CircularProgress />;
    } else {
      results = <Results data={this.state.results} error={this.state.error} />;
    }
    
    return (
      <>
        <div className="search-wrapper">
          <div className="header">
            <Header />
          </div>
          <div className="hospital">
            <HospitalSelect onSelectHospital={this.handleHospitalSelect} />
          </div>
          <div className="search">
            <Search onSearchChange={this.handleSearchChange} />
          </div>
          <div className="button">
            <Button variant="contained" onClick={this.handleSearch}>
              Search
            </Button>
          </div>
        </div>
        <div className="table">
          {results}
        </div>
      </>
    );
  }
}

async function search(data) {
  const response = await fetch("https://hospitalprice.io/search.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const results = await response.json();
  return results;
}

export default App;
