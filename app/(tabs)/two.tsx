import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};

type Item = {
  id: string;
  name: string;
};

const SearchPage: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<Item>>([]);

  const handleSearchPress = async () => {
    try {
      // Perform search logic here, and set searchResults state
      // to an array of search results.
      // This can be an API call or a local search.
      const results: Array<Item> = [
        { id: '1', name: 'Result 1' },
        { id: '2', name: 'Result 2' },
        { id: '3', name: 'Result 3' },
      ];
      setSearchResults(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemPress = (item: Item) => {
    // Handle item press logic here
  };

  const renderSearchItem = ({ item }: { item: Item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Text style={styles.itemDetails}>More Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchPress}
          value={searchText}
        />
      </View>
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No Results</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#EFEFF4',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 5,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  itemName: {
    color: '#000',
  },
  itemDetails: {
    color: '#007AFF',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: '#999',
  },
});

export default SearchPage;
