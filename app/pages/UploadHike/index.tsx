import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import Container from '@app/common/Container';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import Firebase from 'firebase';
import useToggleDarkMode from '@app/hooks/useToggleDarkMode';
import styles from './styles.module.scss';

export interface IHikeData {
  name?: string;
  distance?: string;
  duration?: string;
  ascent?: string;
  descent?: string;
  date?: string;
  start?: string;
  finish?: string;
  country?: string;
  description?: string;
  fileName?: string;
}

const UploadHike: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const [kml, setKml] = useState<Document>();
  const [rawKml, setRawKml] = useState();
  const hikeData = useRef<IHikeData>({});

  const onFileChange = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    setRawKml(event.target.files[0]);
    hikeData.current = { ...hikeData.current, fileName: event.target.files[0].name };

    reader.onloadend = e => {
      const text = e.target ? e.target.result : '';

      const parser = new DOMParser();
      const xmlDom = parser.parseFromString(text, 'text/xml');
      setKml(xmlDom);
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
      .child(hikeData.current.date)
      .set({ ...hikeData.current });
  };

  return (
    <div className={classnames(styles.uploadHike, { [styles.darkModeUploadHike]: isDarkMode })}>
      <h1 className={styles.heading}>Add another one to your collection</h1>
      <Container>
        <div className="row">
          <div className="col-xs-12">
            <ul>
              <li>
                <span className="col-xs-3">Hike name:</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, name: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Distance (km):</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, distance: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Duration (h):</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, duration: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Ascent (m):</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, ascent: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Descent (m):</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, descent: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Date:</span>
                <input
                  className="col-xs-2"
                  type="date"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, date: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Start location:</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, start: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Finish location:</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, finish: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Country:</span>
                <input
                  className="col-xs-2"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, country: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Description:</span>
                <input
                  className="col-xs-9"
                  type="text"
                  onChange={e => {
                    hikeData.current = { ...hikeData.current, description: e.target.value };
                  }}
                />
              </li>
              <li>
                <span className="col-xs-3">Upload path data (.kml)</span>
                <input className="col-xs-9" type="file" onChange={onFileChange} />
              </li>
            </ul>
            <button type="button" onClick={onFileUpload}>
              Upload!
            </button>
          </div>
        </div>
      </Container>
      <Map className={styles.map} center={[52.705, 13.34]} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </Map>
    </div>
  );
};

export default UploadHike;
