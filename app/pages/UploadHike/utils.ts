import Firebase from 'firebase';

export const extractDataFromKml = (xmlDom, setHikeData, hikeData, fileName) => {
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

export const onFileUpload = ({ rawKml, history, hikeData }) => {
  const ref = Firebase.storage().ref();

  const fileName = rawKml.name;
  const metadata = {
    contentType: rawKml.type,
  };

  ref.child(fileName).put(rawKml, metadata);

  Firebase.database()
    .ref()
    .child('hikeEntries')
    .child(hikeData.date)
    .set({ ...hikeData }, () => history.push('/home'));
};

export const resizeMap = mapRef => {
  // eslint-disable-next-line no-underscore-dangle
  mapRef.current.leafletElement._onResize();
};

export const parseFile = e => {
  const text = e.target.result;

  const parser = new DOMParser();
  return parser.parseFromString(text, 'text/xml');
};

export const onFileChange = ({ event, setRawKml, setKml, setHikeData, hikeData }) => {
  const reader = new FileReader();
  const file = event.target.files[0];

  setRawKml(event.target.files[0]);
  const fileName = event.target.files[0].name;

  reader.onloadend = e => {
    const xmlDom = parseFile(e);

    setKml(xmlDom);
    extractDataFromKml(xmlDom, setHikeData, hikeData, fileName);
  };
  reader.readAsText(file);
};

export const inputFieldsData1 = [
  {
    text: 'Hike name:',
    inputValue: 'name',
  },
  {
    text: 'Distance (km):',
    inputValue: 'distance',
  },
  {
    text: 'Duration (h):',
    inputValue: 'time',
  },
  {
    text: 'Ascent (m):',
    inputValue: 'ascent',
  },
  {
    text: 'Descent (m):',
    inputValue: 'descent',
  },
];

export const inputFieldsData2 = [
  {
    text: 'Date:',
    inputValue: 'date',
    type: 'date',
  },
  {
    text: 'Start location:',
    inputValue: 'start-location',
    type: 'text',
  },
  {
    text: 'Finish location:',
    inputValue: 'finish-location',
    type: 'text',
  },
  {
    text: 'Country',
    inputValue: 'country',
    type: 'text',
  },
];
