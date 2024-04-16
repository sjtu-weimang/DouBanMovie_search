import * as React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import SortBar from './Sortbar';
import { Row, Col, Radio, message, Empty } from 'antd';



interface Movie {
    cover_url: string;
    id: string;
    types: string[];
    regions: string[];
    title: string;
    url: string;
    release_date: string;
    score: string;
    actors: string[];
    isFavorite: boolean;
}

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [sortBy, setSortBy] = useState<string>('');
    const [isFavoriteList, setIsFavoriteList] = useState(false);
    const [defaultMovies, setDefaultMovies] = useState<Movie[]>([]);
    const [defaultFavoriteMovies, setDefaultFavoriteMovies] = useState<Movie[]>([]);
    const [isSearchEmpty, setIsSearchEmpty] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(''); // 新增状态变量

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("./data.json");
                console.log(response)
                setMovies(response.data);
                setFilteredMovies(response.data);
                setDefaultMovies(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);




    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword); // 更新搜索关键字

        if (isFavoriteList === true) {
            const filtered = defaultFavoriteMovies.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredMovies(filtered);
            setIsSearchEmpty(filtered.length === 0);  // 更新搜索结果为空的状态

        } else {
            const filtered = movies.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredMovies(filtered);
            setIsSearchEmpty(filtered.length === 0);  // 更新搜索结果为空的状态

        }
    };


    const handleSort = (sortType: string) => {
        let sortedMovies = [...filteredMovies];
        if (sortType === 'release_date') {
            sortedMovies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
        } else if (sortType === 'score') {
            sortedMovies.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        } else {
            sortedMovies = isFavoriteList ? defaultFavoriteMovies : defaultMovies;

        }

        setFilteredMovies(sortedMovies);
        setSortBy(sortType === sortBy ? '' : sortType);
    };


    const handleToggleList = () => {
        setIsFavoriteList(false);
        setFilteredMovies(movies);
        setDefaultMovies(movies); // 添加更新defaultMovies的逻辑

    };

    const handleToggleList2 = () => {
        setIsFavoriteList(true);
        const favorites = movies.filter(movie => movie.isFavorite);
        setFilteredMovies(favorites);
        setDefaultFavoriteMovies(favorites);

    };

    const handleFavorite = (movieId: string) => {
        const updatedMovies = movies.map(movie => {
            if (movie.id === movieId) {
                const isNowFavorite = !movie.isFavorite;
                message.success(isNowFavorite ? `已收藏电影 ${movie.title}` : `已取消收藏的电影 ${movie.title}`);
                return { ...movie, isFavorite: !movie.isFavorite };
            }
            return movie;
        });
        if (isFavoriteList) {
            const updatedFavorites = updatedMovies.filter(movie => movie.isFavorite);
            setFilteredMovies(updatedFavorites);
            setDefaultFavoriteMovies(updatedFavorites);
        } else {
            if (sortBy === 'release_date') {
                updatedMovies.sort((a, b) =>
                    new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
                );
            } else if (sortBy === 'score') {
                updatedMovies.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
            }
            setFilteredMovies(updatedMovies);
            setDefaultMovies(updatedMovies); 

        }
        
        setMovies(updatedMovies);

    }

    return (
        <div>
            <h1>在线电影</h1>
            <Radio.Group defaultValue="a" buttonStyle="solid" style={{ margin: "auto", display: "flex" }}>
                <Radio.Button value="a" onClick={handleToggleList}>全部列表</Radio.Button>
                <Radio.Button value="b" onClick={handleToggleList2}>收藏列表</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <br />
            <br />
            <SortBar sortBy={sortBy} onSort={handleSort} />
            <br />
            <br />
            <Row gutter={[16, 16]}>

                {isSearchEmpty ? (
                    <Empty description="暂时没有找到最匹配的电影" style={{ margin: "auto", padding: "100px", display: "flex", alignItems: "center", justifyContent: "center" }} />
                ) : (
                    filteredMovies.map(movie => (
                        <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
                            <MovieCard movie={movie} onFavorite={handleFavorite} />
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default MovieList;

