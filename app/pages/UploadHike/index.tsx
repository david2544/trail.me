import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import { resizeMap, onFileUpload, onFileChange, inputFieldsData1, inputFieldsData2 } from './utils';
import styles from './styles.module.scss';

export interface IHikeData {
  name?: string;
  distance?: string;
  time?: string;
  ascent?: string;
  descent?: string;
  date: string;
  start?: string;
  finish?: string;
  country?: string;
  description?: string;
  fileName?: string;
  viewport?: { center: string[]; zoom: string };
}

const UploadHike: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const [kml, setKml] = useState<Document>();
  const [rawKml, setRawKml] = useState<any>();
  const [isSmallMap, toggleSmallMap] = useState(false);
  const [hikeData, setHikeData] = useState<any>({});
  const history = useHistory();
  const mapRef = useRef();

  const switchMapSize = () => {
    toggleSmallMap(!isSmallMap);
    resizeMap(mapRef);
  };

  return (
    <div className={classnames(styles.uploadHike, { [styles.darkModeUploadHike]: isDarkMode })}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>Add another one to your collection</h1>
      </div>
      <Map
        className={classnames(styles.map, { [styles.smallMap]: isSmallMap })}
        center={[52.52, 13.4]}
        zoom={13}
        ref={mapRef}
        onViewportChanged={viewport => setHikeData({ ...hikeData, viewport })}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </Map>

      <div className={`row ${styles.inputSectionWrapper}`}>
        <div className="col-xs-12">
          <div className={styles.inputSection}>
            <div className="col-xs-4">
              {inputFieldsData1.map(inputFieldData => (
                <label
                  key={inputFieldData.inputValue}
                  htmlFor={inputFieldData.inputValue}
                  className={styles.inputLabel}
                >
                  <span className={`col-xs-6 ${styles.label}`}>{inputFieldData.text}</span>
                  <input
                    className={`${styles.input} col-xs-5`}
                    value={hikeData[inputFieldData.inputValue] || ''}
                    type="text"
                    id={inputFieldData.inputValue}
                    onChange={e => {
                      setHikeData({ ...hikeData, [inputFieldData.inputValue]: e.target.value });
                    }}
                  />
                </label>
              ))}
            </div>

            <div className="col-xs-4">
              {inputFieldsData2.map(inputFieldData => (
                <label
                  key={inputFieldData.inputValue}
                  htmlFor={inputFieldData.inputValue}
                  className={styles.inputLabel}
                >
                  <span className={`col-xs-6 ${styles.label}`}>{inputFieldData.text}</span>
                  <input
                    className={`${styles.input} col-xs-5`}
                    value={hikeData[inputFieldData.inputValue] || ''}
                    type={inputFieldData.type}
                    id={inputFieldData.inputValue}
                    onChange={e => {
                      setHikeData({ ...hikeData, [inputFieldData.inputValue]: e.target.value });
                    }}
                  />
                </label>
              ))}
              <label htmlFor="file" className={styles.inputLabel}>
                <span className={`col-xs-6 ${styles.label}`}>Upload path data (.kml)</span>
                <input
                  className="col-xs-6"
                  type="file"
                  id="file"
                  onChange={
                    e => onFileChange({ event: e, setRawKml, setKml, setHikeData, hikeData })
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                />
              </label>
            </div>
            <div className="col-xs-4">
              <span className="col-xs-6">Description:</span>
              <textarea
                className="col-xs-11"
                onChange={e => {
                  setHikeData({ ...hikeData, description: e.target.value });
                }}
              />
            </div>
            <div className="col-xs-12">
              <div className={styles.note}>
                Please make sure you have centered the Map properly on the hike!
              </div>
              <input id="checkbox" type="checkbox" onClick={switchMapSize} />
              <label htmlFor="checkbox">Show small map?</label>
              <button
                className={styles.button}
                type="button"
                onClick={() => onFileUpload({ rawKml, history, hikeData })}
              >
                Upload!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadHike;
