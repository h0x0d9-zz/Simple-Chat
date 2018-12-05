import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { channelsSelector, getCurrentChannelId } from '../selectors';
import * as actionCreators from '../actions';
import debug from '../../lib/logger';

const log = debug('ChannelsList');


const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: getCurrentChannelId(state),
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
export default class ChannelsList extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ul className='nav flex-column nav-pills'>
        {
          channels.map(ch => {
            const className = cn({
              'nav-link': true,
              'active': ch.id === currentChannelId,
            });

            return (
              <li className='nav-item' key={ch.id}>
                <a className={className} href='#'> # {ch.name} </a>
              </li>
            );
          })
        }
      </ul>
    )
  }
}