import React, { useState } from 'react';
import classnames from 'classnames';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import Firebase from 'firebase';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
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
  const [hikeData, setHikeData] = useState<IHikeData>({});

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

    console.log('hikeData :>> ', hikeData);
    ref.child(fileName).put(rawKml, metadata);

    Firebase.database()
      .ref()
      .child('hikeEntries')
      .child(hikeData.date)
      .set({ ...hikeData });
  };

  return (
    <div className={classnames(styles.uploadHike, { [styles.darkModeUploadHike]: isDarkMode })}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>Add another one to your collection</h1>
      </div>
      <Map
        className={styles.map}
        center={[52.705, 13.34]}
        zoom={13}
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
              <span className="col-xs-6">Hike name:</span>
              <input
                className="col-xs-5"
                value={hikeData.name || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, name: e.target.value });
                }}
              />

              <span className="col-xs-6">Distance (km):</span>
              <input
                className="col-xs-5"
                value={hikeData.distance || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, distance: e.target.value });
                }}
              />

              <span className="col-xs-6">Duration (h):</span>
              <input
                className="col-xs-5"
                value={hikeData.time || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, time: e.target.value });
                }}
              />

              <span className="col-xs-6">Ascent (m):</span>
              <input
                className="col-xs-5"
                value={hikeData.ascent || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, ascent: e.target.value });
                }}
              />

              <span className="col-xs-6">Descent (m):</span>
              <input
                className="col-xs-5"
                value={hikeData.descent || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, descent: e.target.value });
                }}
              />
            </div>

            <div className="col-xs-4">
              <span className="col-xs-6">Date:</span>
              <input
                className="col-xs-5"
                value={hikeData.date || ''}
                type="date"
                onChange={e => {
                  setHikeData({ ...hikeData, date: e.target.value });
                }}
              />

              <span className="col-xs-6">Start location:</span>
              <input
                className="col-xs-5"
                value={hikeData.start || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, start: e.target.value });
                }}
              />

              <span className="col-xs-6">Finish location:</span>
              <input
                className="col-xs-5"
                value={hikeData.finish || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, finish: e.target.value });
                }}
              />

              <span className="col-xs-6">Country:</span>
              <input
                className="col-xs-5"
                value={hikeData.country || ''}
                type="text"
                onChange={e => {
                  setHikeData({ ...hikeData, country: e.target.value });
                }}
              />

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
