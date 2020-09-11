import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import useFetchHikesData from './useFetchHikesData';
import useScroll from './useScroll';

const loadMoreData = ({
  hikesData,
  setHikesData,
  fetchNewData,
  setListPos,
  setIsFetching,
  setAllHikesLoaded,
}) => {
  setTimeout(() => {
    const listPosition = (Number(Object.keys(hikesData).sort()[0]) - 1).toString();
    fetchNewData(hikesData, setHikesData, listPosition, setIsFetching, setAllHikesLoaded);
    setListPos(listPosition);
  }, 1000);
};

const useInfiniteScroll = () => {
  const {
    hikesData,
    setHikesData,
    fetchNewData,
    isFetching,
    setIsFetching,
    setListPos,
    setAllHikesLoaded,
    allHikesLoaded,
  } = useFetchHikesData();
  const { scrollPosition } = useScroll();

  if (
    window.innerHeight + scrollPosition >= document.body.scrollHeight &&
    !isEmpty(hikesData) &&
    scrollPosition !== 0 &&
    !isFetching
  ) {
    setIsFetching(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    loadMoreData({
      hikesData,
      setHikesData,
      fetchNewData,
      setListPos,
      setIsFetching,
      setAllHikesLoaded,
    });
  }, [isFetching]);

  return { hikesData, allHikesLoaded };
};

export default useInfiniteScroll;
