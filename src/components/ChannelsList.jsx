import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import { channelsSelector, getCurrentChannelId } from '../selectors';


const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: getCurrentChannelId(state),
  };
  return props;
};

export default @connect(mapStateToProps)
class ChannelsList extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;

    return (
      <ul className="nav flex-column nav-pills">
        {
          channels.map((ch) => {
            const className = cn({
              'nav-link': true,
              active: ch.id === currentChannelId,
            });

            const name = `#${ch.name}`;

            return (
              <li className="nav-item" key={ch.id}>
                <a href={name} className={className}>{name}</a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
