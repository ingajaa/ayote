import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm, selectSearchTermResults, setSearchTermResults, selectSkip, setSkip } from '../slices/searchSlice';
import { useSearchProductQuery } from '../services/spoonacular';

const SearchBarComponent = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchTermResults = useSelector(selectSearchTermResults);
  const skip = useSelector(selectSkip);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSkip(true));
  }, [searchTermResults]);

  const onChange = (query) => dispatch(setSearchTerm(query));

  const { data, error, isLoading } = useSearchProductQuery(searchTerm, { skip });
  if (data) dispatch(setSearchTermResults(data));

  const onSearchIconPress = () => {
    dispatch(setSkip(false));
  };

  console.log(searchTermResults);
  console.log(skip);

  return <Searchbar placeholder="Search" onIconPress={onSearchIconPress} onChangeText={onChange} value={searchTerm} />;
};

export default SearchBarComponent;
