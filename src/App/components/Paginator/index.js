import React from 'react';
import { Link } from 'react-static';
//-
import './style.css';

const Paginator = ({ pageToken = 'page', model, paginator: { currentPage, totalPages } }) => {
  const { slug, meta: { contentType: { name: modelType } } } = model;
  return (
    <div className="paginator">
      {currentPage > 1 &&
        (currentPage - 1 === 1 ? (
          <Link className="g-button prev" to={`/${modelType}/${slug}`}>
            <span className="g-underline-link">Previous</span>
          </Link>
        ) : (
          <Link
            className="g-button prev"
            to={`/${modelType}/${slug}/${pageToken}/${currentPage - 1}`}
          >
            <span className="g-underline-link">Previous</span>
          </Link>
        ))}
      {currentPage < totalPages && (
        <Link
          className="g-button next"
          to={`/${modelType}/${slug}/${pageToken}/${currentPage + 1}`}
        >
          <span className="g-underline-link">Next</span>
        </Link>
      )}
    </div>
  );
};

export default Paginator;
