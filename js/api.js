export const getData = (onSuccess, onError) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')

    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })

    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};
export const postData = (onSuccess, onError, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
        return;
      }

      throw new Error();
    })
    .catch(() =>{
      onError();
    });
};
