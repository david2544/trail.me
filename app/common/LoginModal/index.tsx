import React, { useState } from 'react';
import classnames from 'classnames';
import { Modal, TextField, Button, Snackbar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import styles from './styles.module.scss';

interface ILoginModalProps {
  setLoggedIn: Function;
  loggedIn: boolean;
}

type Inputs = {
  email: string;
  password: string;
};

const onSubmit = (
  data,
  setDisplayAlert: Function,
  setDisplayAlertMessage: Function,
  setLoggedIn: Function,
) => {
  Firebase.auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      setLoggedIn(true);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode || errorMessage) {
        setDisplayAlert(true);
        setDisplayAlertMessage(errorMessage);
      }
    });
};

const LoginModal: React.FC<ILoginModalProps> = ({ setLoggedIn, loggedIn }) => {
  const { isDarkMode } = useToggleDarkMode();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [displayAlertMessage, setDisplayAlertMessage] = useState();
  const { register, handleSubmit, errors } = useForm<Inputs>();

  return (
    <Modal
      open={!loggedIn}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classnames(styles.loginModal, { [styles.darkModeLoginModal]: isDarkMode })}>
        <Snackbar
          className={styles.snackBar}
          open={displayAlert}
          autoHideDuration={50000}
          onClose={() => setDisplayAlert(false)}
        >
          <span>{displayAlertMessage}</span>
        </Snackbar>
        <div className="row">
          <form
            onSubmit={handleSubmit(data =>
              onSubmit(data, setDisplayAlert, setDisplayAlertMessage, setLoggedIn),
            )}
          >
            <div className={`col-xs-12 ${styles.centerAlign}`}>Log In to continue</div>
            <div className={`col-xs-12 ${styles.loginInputWrapper}`}>
              <TextField
                error={!!errors.email}
                className={styles.loginInput}
                autoFocus
                type="email"
                name="email"
                inputRef={register({ required: true })}
                label="Email"
                variant="outlined"
              />
              <TextField
                error={!!errors.password}
                className={styles.loginInput}
                type="password"
                name="password"
                inputRef={register({ required: true })}
                label="Password"
                variant="outlined"
              />
            </div>
            <div className={`col-xs-12 ${styles.centerAlign}`}>
              <Button type="submit" variant="outlined" className={styles.backButton}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default LoginModal;
