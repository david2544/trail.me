import React, { useState } from 'react';
import classnames from 'classnames';
import { Modal, TextField, Button, Snackbar } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Firebase from 'firebase';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import styles from './styles.module.scss';

interface ILoginModalProps {
  open: boolean;
  handleClose: Function;
  onSubmitSuccess: Function;
}

type Inputs = {
  password: string;
};

const onSubmit = (data, onSubmitSuccess, setDisplayAlert) => {
  const ref = Firebase.database().ref();

  ref.on('value', snapshot => {
    if (snapshot.val().submitSecret === data.password) {
      onSubmitSuccess();
    } else {
      setDisplayAlert(true);
    }
  });
};

const LoginModal: React.FC<ILoginModalProps> = ({ open, handleClose, onSubmitSuccess }) => {
  const { isDarkMode } = useToggleDarkMode();
  const [displayAlert, setDisplayAlert] = useState(false);
  const { register, handleSubmit, errors } = useForm<Inputs>();

  return (
    <Modal
      open={open}
      onClose={e => handleClose(e)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classnames(styles.loginModal, { [styles.darkModeLoginModal]: isDarkMode })}>
        <Snackbar
          className={styles.snackBar}
          open={displayAlert}
          autoHideDuration={2000}
          message="Wrong passphrase"
          onClose={() => setDisplayAlert(false)}
        >
          <span>Incorrect passphrase</span>
        </Snackbar>
        <div className="row">
          <form onSubmit={handleSubmit(data => onSubmit(data, onSubmitSuccess, setDisplayAlert))}>
            <div className={`col-xs-12 ${styles.centerAlign}`}>Security check</div>
            <div className={`col-xs-12 ${styles.loginInputWrapper}`}>
              <TextField
                error={!!errors.password}
                className={styles.loginInput}
                autoFocus
                type="password"
                name="password"
                inputRef={register({ required: true })}
                label="Passphrase"
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
