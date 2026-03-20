export const filterData = (data, searchText) => {
  if (!searchText) return data;

  const lowercasedFilter = searchText.toLowerCase();
  
  return data.filter(item => {
    return Object.keys(item).some(key => {
      if (key === 'id' || key === 'key') return false;
      
      const value = item[key];
      if (value === null || value === undefined) return false;
      
      return value.toString().toLowerCase().includes(lowercasedFilter);
    });
  });
};