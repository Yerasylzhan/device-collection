import React from 'react';
import {Collection} from './Collection';
import './index.scss';

const cats = [
  {"name": "Все"},
  {"name": "Смартфоны"},
  {"name": "Ноутбуки"},
  {"name": "Компьютеры и мониторы"},
  {"name": "Аксессуары"}
];

function App() {
  const [dataLoading, setDataLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [postCategory, setPostCategory] = React.useState(0);
  const [postsearch, setPostSearch] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setDataLoading(true);

    const category = postCategory ? `category=${postCategory}`:'';
    const pageNum = `page=${page}`;

  fetch(`https://63beacd1f5cfc0949b5dde93.mockapi.io/photos?${pageNum}&limit=4&${category}`)
   .then((res) => res.json())
   .then((json) => {
     setCollections(json)
  })
    .catch((err) => {
     console.warn(err);
     alert('Ошибка при получении данных');
   })
   .finally(() => setDataLoading(false));
  }, [postCategory, page]);

  return (
    <div className="App">
      <h1>Коллекция товаров</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (
              <li 
              onClick={() => setPostCategory(i)}
              className={postCategory === i ? 'active' : ''} 
              key={obj.name}>{obj.name}</li>
            ))}
        </ul>
        <input 
        value={postsearch} 
        onChange={(e) => setPostSearch(e.target.value)} 
        className="search-input" 
        placeholder="Поиск по названию" />
      </div>
      <div className="content">
        { dataLoading ? (
          <h2>Идет загрузка данных...</h2>
        ) : (
        collections
        .filter((obj) => { return obj.name.toLowerCase().includes(postsearch.toLowerCase()); })
        .map((obj, index) => (
        <Collection key={index} name={obj.name} images={obj.photos} />
        )))}
      </div>
      <ul className="pagination">
       { [...Array(3)].map((_, i) => (
       <li onClick={() => setPage(i+1)} className={page === (i+1) ? 'active' : ''}>{i+1}</li>
       ))}
      </ul>
    </div>
  );
}

export default App;
