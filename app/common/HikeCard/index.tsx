import React from 'react';
import classnames from 'classnames';
import Container from '@common/Container';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
// eslint-disable-next-line object-curly-newline
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './styles.module.scss';

interface HikeCardProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HikeCard: React.FC<HikeCardProps> = props => {
  const { isDarkMode } = useToggleDarkMode();
  const position = [51.505, -0.09];

  return (
    <Container>
      <div className={classnames(styles.hikeCard, { [styles.darkModeHikeCard]: isDarkMode })}>
        <div className="row">
          <div id="hikemap" className={styles.map}>
            <Map className={styles.map} center={position} zoom={13}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>A pretty CSS3 popup. Easily customizable.</Popup>
              </Marker>
            </Map>
          </div>
          <div className={styles.contentWrapper}>
            <div className="row">
              <div className="col-xs-12">
                <h3>Hike name</h3>
              </div>
              <div className="col-xs-7">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum
              </div>
              <div className="col-xs-offset-1 col-xs-4">
                <ul>
                  <li>Distance: 34km</li>
                  <li>Duration: 8.5h</li>
                  <li>Elevation gain: 1100m</li>
                  <li>Elevation loss: 773m</li>
                  <hr className={styles.hr} />
                  <li>Date: 11th Sept 2020</li>
                  <li>Start: Chamonix</li>
                  <li>Finish: Courmayeour</li>
                  <li>Country: France</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HikeCard;
