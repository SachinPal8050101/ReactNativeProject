const BASE_URL = 'https://chimpu.xyz/';

export const getPhoneNumberInfo = (
  number,
  callBackSuccess,
  callBackfailure,
) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    phonenumber: '9761710753',
  });
  console.log('sdsd');
  fetch(`${BASE_URL}api/post.php`, {
    method: 'POST',
    headers: headers,
    body: body,
  })
    .then(async response => {
      if (!response.ok) {
        callBackfailure({msg: 'Something Whet wrong', error: true});
        return false;
      }
      const data = await response.json();
      const phoneOrigen = response.headers.get('phoneorigen');
      callBackSuccess(data, phoneOrigen);
    })
    .catch(async error => {
      const errorData = await error.response.json();
      console.log('sdsd', errorData);

      callBackfailure(error);
      console.error('Error fetching data:', error);
      return false;
    });
};
