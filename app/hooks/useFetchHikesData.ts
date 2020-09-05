import { useState, useEffect } from 'react';
import Firebase from 'firebase';

const useFetchKml = () => {
  const [hikesData, setHikesData] = useState({});

  useEffect(() => {
    const ref = Firebase.database().ref();

    ref.on('value', snapshot => {
      setHikesData(snapshot.val().hikeEntries);
    });
  }, []);

  const orderedHikesChronologically = {};

  Object.keys(hikesData)
    .sort((a, b) => {
      a = a.split('-').join('');
      b = b.split('-').join('');
      return b.localeCompare(a);
    })
    .forEach(entry => {
      orderedHikesChronologically[entry] = hikesData[entry];
    });

  return { hikesData: orderedHikesChronologically };
};

export default useFetchKml;
