import * as React from 'react';
import TextField from '@mui/material/TextField';

class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSearchChange = (event) => {
        this.props.onSearchChange(event.target.value);
    }

    render() {
        return (
            <TextField
                style={{width: "500px"}}
                onChange={this.handleSearchChange}
                id="outlined-basic"
                label="Search ..."
                variant="outlined"
            />
        )
    }
}

export default Search;