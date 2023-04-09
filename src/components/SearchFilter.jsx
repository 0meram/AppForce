import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const SearchFilter = ({ handleSearch }) => {
    const handleInputChange = (e) => {
        const searchText = e.target.value;
        handleSearch(searchText);
    };

    return (
        <TextField
            label="Search by Email, Name, ID or Location"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
        />
    );
};

SearchFilter.propTypes = {
    handleSearch: PropTypes.func.isRequired
};

export default SearchFilter;