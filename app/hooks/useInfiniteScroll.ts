import { useEffect, useState } from 'react';
import Firebase from 'firebase/app';
import 'firebase/database';
import useScroll from './useScroll';

const fetchData = (
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
    .limitToLast(10);

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

const loadDataTrigger = ({ hikesData, setHikesData, setIsFetching, setAllHikesLoaded }) => {
  setTimeout(() => {
    const listPosition = (Number(Object.keys(hikesData).sort()[0]) - 1).toString();
    fetchData(hikesData, setHikesData, listPosition, setIsFetching, setAllHikesLoaded);
  }, 1000);
};

const useInfiniteScroll = () => {
  const [hikesData, setHikesData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [allHikesLoaded, setAllHikesLoaded] = useState(false);
  const { scrollPosition } = useScroll();

  if (window.innerHeight + scrollPosition >= document.body.scrollHeight && !isFetching) {
    setIsFetching(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    loadDataTrigger({
      hikesData,
      setHikesData,
      setIsFetching,
      setAllHikesLoaded,
    });
  }, [isFetching]);

  return { hikesData, allHikesLoaded };
};

export default useInfiniteScroll;
