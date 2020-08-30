import React, { useEffect } from 'react';
import classnames from 'classnames';
import Container from '@common/Container';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import Firebase from 'firebase';
import styles from './styles.module.scss';

export interface IHikeData {
  name: string;
  distance: string;
  time: string;
  ascent: string;
  descent: string;
  date: Date;
  start: string;
  finish: string;
  country: string;
  description: string;
  fileName: string;
  viewport: { center: string[]; zoom: string };
}
interface IHikeCard {
  hikeData: IHikeData;
}

const HikeCard: React.FC<IHikeCard> = ({
  hikeData: {
    name,
    distance,
    time,
    ascent,
    descent,
    date,
    start,
    finish,
    country,
    fileName,
    description,
    viewport,
  },
}) => {
  const { isDarkMode } = useToggleDarkMode();
  const [kml, setKml] = React.useState<Document>();

  useEffect(() => {
    const ref = Firebase.storage().ref();
    console.log(fileName);
    ref
      .child(fileName)
      .getDownloadURL()
      .then(url =>
        fetch(url)
          .then(res => res.text())
          .then(kmlText => {
            const parser = new DOMParser();
            const kmlData = parser.parseFromString(kmlText, 'text/xml');
            setKml(kmlData);
          }),
      );
  }, []);

  return (
    <Container>
      <div className={classnames(styles.hikeCard, { [styles.darkModeHikeCard]: isDarkMode })}>
        <div className="row">
          <Map className={styles.map} center={viewport.center} zoom={viewport.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {kml && <ReactLeafletKml kml={kml} />}
          </Map>
          <div className={styles.contentWrapper}>
            <div className="row">
              <div className="col-xs-12">
                <h3>{name && name}</h3>
              </div>
              <div className="col-xs-7">{description && description}</div>
              <div className="col-xs-offset-1 col-xs-4">
                <ul>
                  <li>Distance: {distance} km</li>
                  <li>Duration: {time} h</li>
                  <li>Elevation gain: {ascent} m</li>
                  <li>Elevation loss: {descent} m</li>
                  <hr className={styles.hr} />
                  <li>Date: {date}</li>
                  <li>Start location: {start}</li>
                  <li>Finish location: {finish}</li>
                  <li>Country: {country}</li>
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
