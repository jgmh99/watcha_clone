import React from 'react';
import { useParams } from 'react-router-dom';

const Genre = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Genre Page for ID: {id}</h1>
      {/* 해당 장르에 맞는 영화 출력해야함 */}
    </div>
  );
};

export default Genre;
