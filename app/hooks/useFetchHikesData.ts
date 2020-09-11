import { useState, useEffect } from 'react';
import Firebase from 'firebase';

const fetchNewData = (
  hikesData: object,
  setHikesData: Function,
  listPos: string,
  setIsFetching: Function,
  setAllHikesLoaded: Function,
) => {
  const ref = Firebase.database()
    .ref('hikes')
    .orderByKey()
    .startAt('0')
    .endAt(listPos)
    .limitToLast(3);

  ref.on('value', snapshot => {
    const res = snapshot.val();
    if (res === null) {
      setAllHikesLoaded(true);
    } else {
      setHikesData({ ...hikesData, ...res });
    }

    setIsFetching(false);
  });
};

const useFetchKml = () => {
  const [hikesData, setHikesData] = useState({});
  const [listPos, setListPos] = useState('9999999999999');
  const [isFetching, setIsFetching] = useState(false);
  const [allHikesLoaded, setAllHikesLoaded] = useState(false);

  useEffect(() => {
    fetchNewData(hikesData, setHikesData, listPos, setIsFetching, setAllHikesLoaded);
  }, []);

  return {
    hikesData,
    setHikesData,
    fetchNewData,
    isFetching,
    setIsFetching,
    setListPos,
    setAllHikesLoaded,
    allHikesLoaded,
  };
};

export default useFetchKml;
