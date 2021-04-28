export function configureBackend() {
  let users = [
    {
      id: 1,
      username: "111",
      password: "pwd1",
      dob: "1994-02-09",
      name: "John Beker",
      gender: "male",
      language: "English",
      photo:
        "https://s3.amazonaws.com/uifaces/faces/twitter/amanruzaini/128.jpg"
    },
    {
      id: 2,
      username: "112",
      password: "pwd2",
      dob: "1998-09-19",
      name: "Gsawf Journeal",
      gender: "female",
      language: "English",
      photo: "https://s3.amazonaws.com/uifaces/faces/twitter/kerem/128.jpg"
    },
    {
      id: 3,
      username: "113",
      password: "pwd3",
      dob: "1987-07-23",
      name: "Bon Kent",
      gender: "male",
      language: "French",
      photo: "https://s3.amazonaws.com/uifaces/faces/twitter/koridhandy/128.jpg"
    },
    {}
  ];
  let realFetch = window.fetch;
  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // authenticate
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            // if login details are valid return user details
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              dob: user.dob,
              gender: user.gender,
              name: user.name,
              language: user.language,
              photo: user.photo
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson))
            });
          } else {
            // else return error
            reject("Username or password is incorrect");
          }

          return;
        }

        // get users
        if (url.endsWith("/users") && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security
          // is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === `Basic ${window.btoa("test:test")}`
          ) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users))
            });
          } else {
            // return 401 not authorised if token is null or invalid
            resolve({ status: 401, text: () => Promise.resolve() });
          }

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
export function authHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem("oneUser"));

  if (user && user.authdata) {
    return { Authorization: "Basic " + user.authdata };
  } else {
    return {};
  }
}