import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import Firebase from 'firebase';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import styles from './styles.module.scss';

export interface IHikeData {
  name?: string;
  distance?: string;
  time?: string;
  ascent?: string;
  descent?: string;
  date?: string;
  start?: string;
  finish?: string;
  country?: string;
  description?: string;
  fileName?: string;
  viewport?: { center: string[]; zoom: string };
}

const extractDataFromKml = (xmlDom, setHikeData, hikeData, fileName) => {
  setHikeData({
    ...hikeData,
    fileName,
    time: xmlDom.getElementsByName('time')[0].getElementsByTagName('value')[0].childNodes[0]
      .nodeValue,
    ascent: xmlDom.getElementsByName('ascent')[0].getElementsByTagName('value')[0].childNodes[0]
      .nodeValue,
    descent: xmlDom.getElementsByName('descent')[0].getElementsByTagName('value')[0].childNodes[0]
      .nodeValue,
  });
};

const UploadHike: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const [kml, setKml] = useState<Document>();
  const [rawKml, setRawKml] = useState();
  const [isSmallMap, toggleSmallMap] = useState(false);
  let history = useHistory();
  const mapRef = useRef();
  const [hikeData, setHikeData] = useState<IHikeData>({});

  const switchMapSize = () => {
    toggleSmallMap(!isSmallMap);

    if (mapRef.current) {
      mapRef.current.leafletElement._onResize();
    }
  };
  const onFileChange = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    setRawKml(event.target.files[0]);
    const fileName = event.target.files[0].name;

    reader.onloadend = e => {
      const text = e.target.result;

      const parser = new DOMParser();
      const xmlDom = parser.parseFromString(text, 'text/xml');
      setKml(xmlDom);
      extractDataFromKml(xmlDom, setHikeData, hikeData, fileName);
    };
    reader.readAsText(file);
  };

  const onFileUpload = () => {
    const ref = Firebase.storage().ref();
    // eslint-disable-next-line prefer-destructuring
    const fileName = rawKml.name;
    const metadata = {
      contentType: rawKml.type,
    };

    ref.child(fileName).put(rawKml, metadata);

    Firebase.database()
      .ref()
      .child('hikeEntries')
      .child(hikeData.date)
      .set({ ...hikeData }, history.push('/home'));
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
              <label htmlFor="name" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Hike name:</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.name || ''}
                  type="text"
                  id="name"
                  onChange={e => {
                    setHikeData({ ...hikeData, name: e.target.value });
                  }}
                />
              </label>
              <label htmlFor="distance" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Distance (km):</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.distance || ''}
                  type="text"
                  id="distance"
                  onChange={e => {
                    setHikeData({ ...hikeData, distance: e.target.value });
                  }}
                />
              </label>
              <label htmlFor="duration" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Duration (h):</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.time || ''}
                  type="text"
                  id="duration"
                  onChange={e => {
                    setHikeData({ ...hikeData, time: e.target.value });
                  }}
                />
              </label>
              <label htmlFor="ascent" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Ascent (m):</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.ascent || ''}
                  type="text"
                  id="ascent"
                  onChange={e => {
                    setHikeData({ ...hikeData, ascent: e.target.value });
                  }}
                />
              </label>
              <label htmlFor="descent" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Descent (m):</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.descent || ''}
                  type="text"
                  id="descent"
                  onChange={e => {
                    setHikeData({ ...hikeData, descent: e.target.value });
                  }}
                />
              </label>
            </div>

            <div className="col-xs-4">
              <label htmlFor="inp" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Date:</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.date || ''}
                  type="date"
                  onChange={e => {
                    setHikeData({ ...hikeData, date: e.target.value });
                  }}
                />
              </label>

              <label htmlFor="start-location" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Start location:</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.start || ''}
                  type="text"
                  id="start-location"
                  onChange={e => {
                    setHikeData({ ...hikeData, start: e.target.value });
                  }}
                />
              </label>

              <label htmlFor="finish-location" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Finish location:</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.finish || ''}
                  type="text"
                  id="finish-location"
                  onChange={e => {
                    setHikeData({ ...hikeData, finish: e.target.value });
                  }}
                />
              </label>

              <label htmlFor="country" className={styles.inp}>
                <span className={`col-xs-6 ${styles.label}`}>Country:</span>
                <input
                  className={`${styles.input} col-xs-5`}
                  value={hikeData.country || ''}
                  type="text"
                  id="country"
                  onChange={e => {
                    setHikeData({ ...hikeData, country: e.target.value });
                  }}
                />
              </label>

              <span className="col-xs-6">Upload path data (.kml)</span>
              <input className="col-xs-6" type="file" onChange={onFileChange} />
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
              <button className={styles.button} type="button" onClick={onFileUpload}>
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
