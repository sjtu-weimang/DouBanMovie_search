import * as React from 'react';
import { useState } from 'react'
import { Input, Button } from 'antd';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Input.Search
      value={keyword}
      style={{ width: "360px", display: "flex", margin: "auto" }}
      onChange={e => setKeyword(e.target.value)}
      onSearch={handleSearch} // 添加搜索按钮点击事件
      enterButton={<Button type="primary">搜索</Button>} // 设置搜索按钮样式
      onPressEnter={handleKeyPress}
    />
  );
};

export default SearchBar;