import React, { useEffect, useState } from 'react';
import Firebase from 'firebase/app';
import 'firebase/database';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import styles from './styles.module.scss';

const fetchDocument = (url: string, setDocuments: Function, index: number) => {
  const fetchDoc = async () =>
    fetch(url)
      .then(res => res.text())
      .then(kmlText => {
        const parser = new DOMParser();
        return parser.parseFromString(kmlText, 'text/xml');
      });

  fetchDoc().then(doc => {
    setDocuments(prevState => ({ ...prevState, [index]: doc }));
  });
};

const GlobalMap: React.FC = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const realtimeDbRef = Firebase.database().ref('hikes');
    realtimeDbRef.on('value', snapshot => {
      const hikes = snapshot.val();
      Object.keys(hikes).map((hike, index) =>
        fetchDocument(hikes[hike].kmlDownloadUrl, setDocuments, index),
      );
    });
  }, []);

  return (
    <div>
      <Map center={[48.37084770238366, 15.688476562500002]} zoom={6} className={styles.map}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {documents.length &&
          Object.keys(documents).map(index => (
            <div key={index}>
              <ReactLeafletKml kml={documents[index]} />
            </div>
          ))}
      </Map>
    </div>
  );
};

export default GlobalMap;
