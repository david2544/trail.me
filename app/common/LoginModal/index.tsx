import React from 'react';
import classnames from 'classnames';
import { Modal, TextField, Button } from '@material-ui/core';
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

const onSubmit = (data, onSubmitSuccess) => {
  const ref = Firebase.database().ref();

  ref.on('value', snapshot => {
    if (snapshot.val().submitSecret === data.password) {
      onSubmitSuccess();
    }
  });
};

const LoginModal: React.FC<ILoginModalProps> = ({ open, handleClose, onSubmitSuccess }) => {
  const { isDarkMode } = useToggleDarkMode();
  const { register, handleSubmit, errors } = useForm<Inputs>();

  return (
    <Modal
      open={open}
      onClose={e => handleClose(e)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classnames(styles.loginModal, { [styles.darkModeLoginModal]: isDarkMode })}>
        <div className="row">
          <form onSubmit={handleSubmit(data => onSubmit(data, onSubmitSuccess))}>
            <div className={`col-xs-12 ${styles.centerAlign}`}>Password</div>
            <div className={`col-xs-12 ${styles.loginInputWrapper}`}>
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
