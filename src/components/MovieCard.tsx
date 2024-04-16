import * as React from "react";
import { useState, useRef } from "react";
import { Card, Button, Tooltip } from "antd";

// 定义电影对象的接口
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

// 定义 MovieCard 组件的属性接口
interface MovieCardProps {
  movie: Movie;
  onFavorite: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onFavorite }) => {
  // 使用 useState 定义状态变量
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
  const buttonRef = useRef(null); // 创建一个ref来引用按钮元素
  // 处理收藏按钮点击事件 
  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // 切换收藏状态
    onFavorite(movie.id);

  };


  const year = movie.release_date.split('-')[0];

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(
        event.target instanceof Element &&
        event.target.classList.contains("favorite-button")
      )
    ) {
      window.open(movie.url, "_blank"); // 在新窗口打开电影链接
    }
  };

  const Favoritebutton = () => {
    return (
      <div onClick={(event) => event.stopPropagation()} style={{ position: "absolute", top: 0, left: 0, padding: "8px" }}>
        <Tooltip title={isFavorite ? "从收藏中移除" : "添加到收藏"}>
          <Button
            ref={buttonRef} // 将ref添加到按钮元素上
            className="favorite-button"
            type="primary"
            shape="default"
            icon={isFavorite ? "-" : "+"}
            style={{ color: "#ffffff", display: "block", fontSize: "16px", alignContent: "center", justifyContent: "center", backgroundColor: "#788399" }}
            onClick={handleFavorite}
          />
        </Tooltip>
      </div>
    )
  }

  return (
    <Card
      hoverable
      cover={<img src={movie.cover_url.replace(/img[1|9]/, 'img2')} alt="{movie.title}" style={{ width: "238px", height: "238px" }} />}
      onClick={handleCardClick} // 绑定点击事件
    >
      <Tooltip title={movie.title}>
        <Favoritebutton />
      </Tooltip>


      <Card.Meta
        description={
          <Tooltip title={`${year} / ${movie.regions.join(" ")} / ${movie.types.join(" ")}`}>
            <div style={{ textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {year} / {movie.regions.join(" ")} / {movie.types.join(" ")}
            </div>
          </Tooltip>
        }
      />
      <br />
      <div style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold", color: "#222" }}>{movie.title}（{movie.score}）</div>
    </Card>
  );
};

export default MovieCard;
