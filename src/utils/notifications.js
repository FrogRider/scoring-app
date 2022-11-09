import { notify } from '@kyvg/vue3-notification';

export const showNotificationMessage = (text="", type="success") => {
  notify({ type, text });
};

export const preventEditingForNotAdmins = (isAdmin = false) => {
  if(!isAdmin) {
    showNotificationMessage('Нет прав для изменения данных', 'error');
    return true;
  }
};