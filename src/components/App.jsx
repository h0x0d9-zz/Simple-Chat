import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channelsSelector } from '../selectors';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
export default class App extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <div className='row'>
        <div className='col-lg-4 col-xl-3 mb-2'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light flex-lg-column">
            <a className="navbar-brand" href="#">Channels</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#channelsNavbarToggler" aria-controls="channelsNavbarToggler"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="channelsNavbarToggler">
              <ul className='nav flex-column nav-pills'>
                {
                  channels.map(ch => {
                    return (
                      <li className='nav-item' key={ch.id}>
                        <a className="nav-link" href='#'> # {ch.name} </a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-lg-8 col-xl-9">
          <div className="row align-items-end">
            <div className="col-12">
              <form className="input-group input-group-lg">
                <textarea className="form-control" id="newMessageFormControlTextarea" rows="3">
                </textarea>
              </form>
            </div>
          </div>
          <div className="row align-items-start">
            <div className="col-12">
              {'Messages'}
            </div>
          </div>
        </div>
      </div >
    );
  }
};
