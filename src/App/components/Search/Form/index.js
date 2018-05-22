import React from 'react';
import { Link } from 'react-static';
import DatoCmsSearch from 'datocms-search/dist/datocms-search.base';
import parse from 'url-parse';
import { debounce } from 'lodash';
import striptags from 'striptags';
import './style.css';
import SearchIcon from '../../../assets/img/icons/search-icon.svg';

export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.client = new DatoCmsSearch(SITE_SEARCH_TOKEN, 'production'); // eslint-disable-line no-undef
    this.state = {
      results: []
    };
    this.getResults = debounce(this.getResults, 500);
  }

  handleInputChange = e => {
    const query = e.target.value;
    this.getResults(query);
  };

  getResults = query =>
    this.client
      .search(query)
      .then(({ results }) => {
        const transformed = results.map(res => {
          res.title = striptags(res.title);
          res.path = parse(res.url).pathname;
          return res;
        });
        this.setState({ results: transformed });
      })
      .catch(err => {
        console.error(`Failed to get results for ${query}. Try again!`, err);
      });

  render() {
    return (
      <div className="search-form">
        <div className="input-wrap">
          <input
            type="text"
            placeholder={this.props.placeholderText || 'Search'}
            onInput={this.handleInputChange}
          />
          <img className="search-icon" src={SearchIcon} alt="Search Icon" />
        </div>
        <div className="results-wrap">
          {this.state.results.map((result, idx) => (
            <div className="result" key={`result-${result.path}-${idx}`}>
              <h2 className="title">
                <Link to={result.path} onClick={this.props.onResultClick}>
                  {result.title}
                </Link>
              </h2>
              <div className="body" dangerouslySetInnerHTML={{ __html: result.body }} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
