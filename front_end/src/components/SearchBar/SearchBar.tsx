import React, { FC } from 'react';
import { IconButton, TextField } from '@mui/material';
import SeachIcon from '@mui/icons-material/Search'
import { SearchBarProps } from './types';

const SearchBar: FC<SearchBarProps> = ({
  searchValue,
  onSearchChange,
  onClickSearch,
}) => {
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    onSearchChange(newValue);
  };
  
  return(
    <div>
      <IconButton onClick={onClickSearch} aria-label="search">
        <SeachIcon />
      </IconButton>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default SearchBar;
