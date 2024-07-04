
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = ({ loading }) => (
  <div className="loading-spinner">
    <ClipLoader color="#000" loading={loading} size={150} />
  </div>
);

export default Loading;
