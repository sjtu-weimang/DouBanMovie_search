import * as React from 'react';
import { Button } from 'antd';

interface SortBarProps {
    sortBy: string;
    onSort: (sortType: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({ sortBy, onSort }) => {

    const handleSort = (sortType: string) => {
        const newSortBy = sortBy === sortType ? '' : sortType;
        onSort(newSortBy);

    };

    return (
        <div className="sort-bar">
            排序方式：
            <Button
                type={sortBy === 'release_date' ? 'primary' : 'default'}
                onClick={() => handleSort('release_date')}
            >
                上映时间
            </Button>
            <span> </span>
            <Button
                type={sortBy === 'score' ? 'primary' : 'default'}
                onClick={() => handleSort('score')}
            >
                评分
            </Button>
        </div>
    );
};

export default SortBar;