import React, { useState } from 'react';
import classnames from 'classnames';
import ReactLeafletKml from 'react-leaflet-kml';
import { Adjust, SettingsEthernet, Timer, TrendingUp, TrendingDown } from '@material-ui/icons';
import { Map, TileLayer } from 'react-leaflet';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import useFetchKml from '@hooks/useFetchKml';
import useWindowSize from '@hooks/useWindowSize';
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
  const [originalViewport, setViewport] = useState<object | null>(null);
  const { width } = useWindowSize();
  const isTabletOrMobile = width < 992;
  const isMobile = width < 768;
  const { kml } = useFetchKml(fileName);

  return (
    <div className={classnames(styles.hikeCard, { [styles.darkModeHikeCard]: isDarkMode })}>
      <div className="row">
        <div className="col-xs-12">
          <div className="col-xs-12 col-sm-11">
            <h3 className={styles.heading}>{name && name}</h3>
          </div>
          <div className="col-sm-1">
            <Adjust onClick={() => setViewport({})} className={styles.crosshairIcon} />
          </div>
        </div>
        <div className="col-xs-12">
          <Map
            className={styles.map}
            center={viewport.center}
            zoom={isMobile ? parseInt(viewport.zoom, 10) - 1 : viewport.zoom}
            viewport={originalViewport}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {kml && <ReactLeafletKml kml={kml} />}
          </Map>
        </div>
        <div className={`col-xs-12 ${styles.statsWrapper}`}>
          <div className={`${styles.statWrapper} col-sm-3 col-xs-6`}>
            <SettingsEthernet className={styles.icon} />
            {isTabletOrMobile ? `${distance} km` : <span>Distance: {distance} km</span>}
          </div>
          <div className={`${styles.statWrapper} col-sm-3 col-xs-6`}>
            <Timer className={styles.icon} />
            {isTabletOrMobile ? `${time} h` : <span>Duration: {time} h</span>}
          </div>
          <div className={`${styles.statWrapper} col-sm-3 col-xs-6`}>
            <TrendingUp className={styles.icon} />
            {isTabletOrMobile ? `${ascent} m` : <span>Elevation gain: {ascent} m</span>}
          </div>
          <div className={`${styles.statWrapper} col-sm-3 col-xs-6`}>
            <TrendingDown className={styles.icon} />
            {isTabletOrMobile ? `${descent} m` : <span>Elevation loss: {descent} m</span>}
          </div>
        </div>
        <div className={`${styles.detailsWrapper} col-xs-12`}>
          <div className="col-sm-6">{description && description}</div>
          <div className="col-md-offset-1 col-sm-4">
            <div>
              <strong>Date:</strong> {date}
            </div>
            <div>
              <strong>Start location:</strong> {start}
            </div>
            <div>
              <strong>Finish location:</strong> {finish}
            </div>
            <div>
              <strong>Country:</strong> {country}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HikeCard;
