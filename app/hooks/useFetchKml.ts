import { useState, useEffect } from 'react';
import Firebase from 'firebase/app';
import 'firebase/storage';

const useFetchKml = (fileName: string) => {
  const [kml, setKml] = useState<Document>();

  useEffect(() => {
    const ref = Firebase.storage().ref();
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

  return { kml };
};

export default useFetchKml;
