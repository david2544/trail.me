import { useState, useEffect } from 'react';
import Firebase from 'firebase';

const fetchNewData = (hikesData: object, setHikesData: Function, listPos: string) => {
  const ref = Firebase.database()
    .ref('hikes')
    .orderByKey()
    .startAt('0')
    .endAt(listPos)
    .limitToLast(3);

  ref.on('value', snapshot => {
    setHikesData({ ...hikesData, ...snapshot.val() });
  });
};

const useFetchKml = () => {
  const [hikesData, setHikesData] = useState({});

  useEffect(() => {
    fetchNewData(hikesData, setHikesData, '9999999999999');
  }, []);

  return { hikesData, setHikesData, fetchNewData };
};

export default useFetchKml;
