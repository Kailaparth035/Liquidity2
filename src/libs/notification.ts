import {showMessage, MessageType} from 'react-native-flash-message';

interface INotify {
  message: string;
  description?: string;
}

const showMsg = (type: MessageType, message: string, description: string) => {
  showMessage({
    message,
    description,
    type,
    animationDuration: 300,
    hideStatusBar: true,
  });
};

export const successNotify = ({message, description}: INotify) => {
  showMsg('success', message, description ?? '');
};

export const errorNotify = ({message, description}: INotify) => {
  showMsg('danger', message, description ?? '');
};

export const infoNotify = ({message, description}: INotify) => {
  showMsg('info', message, description ?? '');
};

export const warningNotify = ({message, description}: INotify) => {
  showMsg('warning', message, description ?? '');
};
