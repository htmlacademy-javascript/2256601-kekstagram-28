import { renderGallery } from './gallery.js';
import { closeImg, setUloadFromSubmit, showMessage } from './upload-form.js';
import { getData, sendData} from './api.js';
import { debounce, showAlert } from './util.js';
import { getFilteredPictures, initFilter } from './filter.js';

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
  const debouncedRender = debounce(renderGallery);
  initFilter(data, debouncedRender);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}

