import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import ReactLeafletKml from 'react-leaflet-kml';
import { Map, TileLayer } from 'react-leaflet';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import { ArrowBack } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import Container from '@common/Container';
import LoginModal from '@common/LoginModal';
import { Button, TextField, TextareaAutosize } from '@material-ui/core';
import {
  resizeMap,
  onFileUpload,
  onFileChange,
  validateAndHandleSubmit,
  inputFieldsData1,
  inputFieldsData2,
} from './utils';
import styles from './styles.module.scss';

export interface IHikeData {
  name?: string;
  distance?: string;
  time?: string;
  ascent?: string;
  descent?: string;
  date: string;
  start?: string;
  finish?: string;
  country?: string;
  description?: string;
  fileName?: string;
  viewport?: { center: string[]; zoom: string };
}

type Inputs = {
  name: string;
  distance: string;
  time: string;
  ascent: string;
  descent: string;
  date: string;
  country: string;
  start: string;
  finish: string;
};

const UploadHike: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const [kml, setKml] = useState<Document>();
  const [rawKml, setRawKml] = useState<any>();
  const [isSmallMap, toggleSmallMap] = useState(false);
  const [open, setLoginModalState] = useState(false);
  const [missingFile, setMissingFile] = useState(false);
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [hikeData, setHikeData] = useState<any>({});
  const history = useHistory();
  const mapRef = useRef();
  const switchMapSize = () => {
    toggleSmallMap(!isSmallMap);
    resizeMap(mapRef);
  };

  return (
    <div className={classnames(styles.uploadHike, { [styles.darkModeUploadHike]: isDarkMode })}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>Add another one to your collection</h1>
      </div>
      <Map
        className={classnames(styles.map, { [styles.smallMap]: isSmallMap })}
        center={[52.52, 13.4]}
        zoom={13}
        ref={mapRef}
        onViewportChanged={viewport => setHikeData({ ...hikeData, viewport })}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </Map>

      {!isSmallMap ? (
        <div className={`row ${styles.inputSectionWrapper}`}>
          <div className="col-xs-12">
            <div className={styles.inputSection}>
              <form
                onSubmit={handleSubmit(data =>
                  validateAndHandleSubmit({
                    setHikeData,
                    hikeData,
                    data,
                    setMissingFile,
                    switchMapSize,
                  }),
                )}
              >
                <div className="col-md-4 col-sm-6">
                  {inputFieldsData1.map(inputFieldData => (
                    <div key={inputFieldData.inputValue} className={inputFieldData.className}>
                      <TextField
                        required
                        inputRef={register({ required: true })}
                        name={inputFieldData.inputValue}
                        className={`${styles.input}`}
                        label={inputFieldData.text}
                      />
                    </div>
                  ))}
                </div>

                <div className="col-md-4 col-sm-6">
                  {inputFieldsData2.map(inputFieldData => (
                    <div key={inputFieldData.inputValue} className={inputFieldData.className}>
                      <TextField
                        required
                        error={!!errors[inputFieldData.inputValue]}
                        className={`${styles.input}`}
                        name={inputFieldData.inputValue}
                        id="outlined-basic"
                        inputRef={register(inputFieldData.validationRule || { required: true })}
                        InputLabelProps={inputFieldData.inputLabelProps}
                        type={inputFieldData.type}
                        label={inputFieldData.text}
                      />
                    </div>
                  ))}
                  <input
                    className={styles.fileUploadInput}
                    type="file"
                    id="file-upload"
                    onChange={
                      e =>
                        onFileChange({
                          event: e,
                          setRawKml,
                          setKml,
                          setHikeData,
                          hikeData,
                          setMissingFile,
                        })
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="contained"
                      color={missingFile ? 'secondary' : undefined}
                      component="span"
                    >
                      Upload
                    </Button>
                    <small className={styles.fileUploadNote}>only .kml file type supported</small>
                  </label>
                  {missingFile && (
                    <div className={styles.missingFileNote}>Please upload a file!</div>
                  )}
                </div>
                <div className={`col-md-4 col-sm-12 ${styles.bottomMarginMobile}`}>
                  <TextareaAutosize
                    aria-label="hike-description"
                    rowsMin={5}
                    placeholder="Describe how was the hike"
                    className="col-md-12 col-sm-7 col-xs-12"
                    onChange={e => {
                      setHikeData({ ...hikeData, description: e.target.value });
                    }}
                  />
                  <div className="col-md-12 col-sm-4 col-xs-12">
                    <Button className={styles.button} variant="outlined" type="submit">
                      Continue
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Container className={styles.preSubmitWrapper}>
          <span>Please center the map on the hike for the thumbnail</span>
          <div>
            <Button
              variant="outlined"
              className={styles.backButton}
              type="button"
              onClick={switchMapSize}
            >
              <ArrowBack />
            </Button>
            <Button
              className={styles.uploadButton}
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => {
                setLoginModalState(true);
              }}
            >
              Upload
            </Button>
          </div>
        </Container>
      )}
      <LoginModal
        handleClose={() => setLoginModalState(false)}
        open={open}
        onSubmitSuccess={() => onFileUpload({ rawKml, history, hikeData })}
      />
    </div>
  );
};

export default UploadHike;
