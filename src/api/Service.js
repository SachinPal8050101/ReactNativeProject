export const uploadImageToServer = (
  fileRes,
  callBackSuccess,
  callBackfailure,
) => {
  const formData = new FormData();
  const data = JSON.stringify({
    auth: {
      api_key: '6cd1b8e5b2849269b2e27d0e13cd391d',
      api_secret: '5636d8944dc398db23a6ef220134c575504cb6d8',
    },
    wait: true,
  });
  formData.append('data', data);
  formData.append('upload', {
    uri: fileRes.assets[0].uri,
    type: fileRes.assets[0].type,
    name: fileRes.assets[0].fileName,
  });
  console.log('sdasdasda', formData);
  fetch('https://api.kraken.io/v1/upload', {
    method: 'POST',
    body: formData,
  })
    .then(async response => {
      console.log('=====>>><<<<111', response);
      if (!response.ok) {
        console.log('=====>>><<<<', JSON.stringify(response));
        callBackfailure({msg: 'Something Whet wrong', error: true});
        return false;
      }
      const data = await response.json();
      callBackSuccess(data);
    })
    .catch(async error => {
      const errorData = await error.response.json();
      console.log('sdsd', errorData);

      callBackfailure(error);
      console.error('Error fetching data:', error);
      return false;
    });
};
