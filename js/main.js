import { renderGallery } from './gallery.js';
import { closeImg, setUloadFromSubmit } from './upload-form.js';
import { getData, sendData} from './api.js';
import { showAlert, showMessage } from './util.js';

setUloadFromSubmit(async (data) => {
  try {
    await sendData(data);
    closeImg();
    showMessage('success');
  } catch {
    showMessage('error');
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}

