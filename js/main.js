import { renderGallery } from './gallery.js';
import { closeImg, setUloadFromSubmit } from './upload-form.js';
import { getData} from './api.js';
import { showAlert } from './util.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUloadFromSubmit(closeImg);

