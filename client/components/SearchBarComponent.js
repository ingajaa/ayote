import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm, selectSearchTermResults, setSearchTermResults, selectSkip, setSkip } from '../slices/searchSlice';
import { useSearchAllFoodQuery } from '../services/spoonacular';

const SearchBarComponent = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchTermResults = useSelector(selectSearchTermResults);
  const skip = useSelector(selectSkip);
  const dispatch = useDispatch();

  const onChange = (query) => dispatch(setSearchTerm(query));

  const { data, error, isLoading } = useSearchAllFoodQuery(searchTerm, { skip });
  if (data) {
    dispatch(setSearchTermResults(data))
    dispatch(setSkip(true))
  };

  const onSearchIconPress = () => {
    dispatch(setSkip(false));
  };


  return <Searchbar placeholder="Search" onIconPress={onSearchIconPress} onChangeText={onChange} value={searchTerm} />;
};

export default SearchBarComponent;
