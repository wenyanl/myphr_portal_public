import config from "config";
import { authHeader } from "./backend";

const api_url = "https://myphr-api.firebaseapp.com";

export const userService = {
  login, //fake
  newLogin, //real
  getBasicInfo, //real
  getContactInfo, //real
  logout,
  getCaregiver, //real

  getEpisodes,
  getHealthProfile, //real
  getPhysician, //real
  getCaregiverContactInfo,

  //fetch POST methods
  updateLanguage,
  addDiet,
  addAdvanceDirective,
  editContactInfo,
  editCaregivers,
  editCaregiverContacts,
  getAlerts
};

//for fake api, responsing to backend.js
function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };
  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

/**
 * fetch from real api
 */

function newLogin(username, password) {
  //each time fresh local storage
  localStorage.removeItem("oneUser");

  return fetch(`${api_url}/login?username=${username}&password=${password}`)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("oneUser", JSON.stringify(user));
        console.log(localStorage.getItem("oneUser"));
        //store client_id and token locally
      }
      return user;
    });
}

//response to real api
function getHealthProfile(client_id, token) {
  localStorage.removeItem("healthProfile");

  return fetch(
    `${api_url}/health_profile?client_id=${client_id}&token=${token}`
  )
    .then(handleResponse)
    .then(healthProfile => {
      // login successful if there's a user in the response
      if (healthProfile) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("healthProfile", JSON.stringify(healthProfile));
        console.log(
          "health profile information:" + localStorage.getItem("healthProfile")
        );
      }
      return healthProfile;
    });
}

function getBasicInfo(client_id, user_id, token) {
  localStorage.removeItem("basicInfo");
  return fetch(
    `${api_url}/basic_info?client_id=${client_id}&user_id=${user_id}&token=${token}`,
    {
      method: "GET"
    }
  )
    .then(handleResponse)
    .then(basicInfo => {
      // login successful if there's a user in the response
      if (basicInfo) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("basicInfo", JSON.stringify(basicInfo));
        console.log("basicInfo:" + localStorage.getItem("basicInfo"));
      }
      return basicInfo;
    });
}

function getContactInfo(client_id, is_active, token) {
  localStorage.removeItem("contactInfo");
  return fetch(
    `${api_url}/contact_info?client_id=${client_id}&is_active=${is_active}&token=${token}`
  )
    .then(handleResponse)
    .then(contactInfo => {
      // login successful if there's a user in the response
      if (contactInfo) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
        console.log("contactInfo:" + localStorage.getItem("contactInfo"));
      }
      return contactInfo;
    });
}
function getCaregiver(client_id, token, is_active) {
  localStorage.removeItem("caregiver");
  return fetch(
    `${api_url}/caregiver?client_id=${client_id}&token=${token}&is_active=${is_active}`
  )
    .then(handleResponse)
    .then(caregiver => {
      // login successful if there's a user in the response
      if (caregiver) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("caregiver", JSON.stringify(caregiver));
        console.log("caregiver:" + localStorage.getItem("caregiver"));
      }
      return caregiver;
    });
}
function getPhysician(client_id, token) {
  localStorage.removeItem("physician");
  return fetch(`${api_url}/physician?client_id=${client_id}&token=${token}`)
    .then(handleResponse)
    .then(physician => {
      // login successful if there's a user in the response
      if (physician) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("physician", JSON.stringify(physician));
        console.log("physician:" + localStorage.getItem("physician"));
      }
      return physician;
    });
}
function getEpisodes(client_id, token, is_active) {
  localStorage.removeItem("episodes");
  return fetch(
    `${api_url}/episodes?client_id=${client_id}&token=${token}&is_active=${is_active}`
  )
    .then(handleResponse)
    .then(episodes => {
      // login successful if there's a user in the response
      if (episodes) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("episodes", JSON.stringify(episodes));
        console.log("episodes:" + localStorage.getItem("episodes"));
      }
      return episodes;
    });
}
function getCaregiverContactInfo(
  client_id,
  token,
  is_active,
  caregiver_client_id
) {
  localStorage.removeItem("caregiverContactInfo");
  return fetch(
    `${api_url}/caregiver_contact_info?client_id=${client_id}&token=${token}&is_active=${is_active}&caregiver_client_id=${caregiver_client_id}`
  )
    .then(handleResponse)
    .then(caregiverContactInfo => {
      // login successful if there's a user in the response
      if (caregiverContactInfo) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem(
          "caregiverContactInfo" + client_id,
          JSON.stringify(caregiverContactInfo)
        );
        console.log(
          "caregiverContactInfo:" +
            localStorage.getItem("caregiverContactInfo" + client_id)
        );
      }
      return caregiverContactInfo;
    });
}
function getAlerts() {
  localStorage.removeItem("alerts");
  return (
    fetch(`http://www.mocky.io/v2/5d1a60c62f00000e00fd7624`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we locally store data
      .then(alerts => {
        localStorage.setItem("alerts", JSON.stringify(alerts));

        const ale = localStorage.getItem("alerts");
        console.log("print alerts:" + alerts);
        return ale;
      })
  );
}

function logout() {
  localStorage.removeItem("oneUser");
  //localStorage.removeItem("address");
}

function updateLanguage(client_id, token, service_language) {
  return fetch(
    `${api_url}/client/${client_id}/service_language?token=${token}&service_language=${service_language}`,
    {
      method: "POST",
      //mode: "CORS",

      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}
function addDiet(client_id, token, diet) {
  return fetch(
    `${api_url}/client/${client_id}/add_diet?token=${token}&diet=${diet}`,
    {
      method: "POST",
      //mode: "CORS",

      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}
function addAdvanceDirective(client_id, token, advance_directive) {
  return fetch(
    `${api_url}/client/${client_id}/add_advance_directive?token=${token}&advance_directive=${advance_directive}`,
    {
      method: "POST",
      //mode: "CORS",

      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}
function editContactInfo(client_id, token, category, text, type) {
  return fetch(
    `${api_url}/client/${client_id}/edit_contact_info?token=${token}&category=${category}&text=${text}&type=${type}`,
    {
      method: "POST",
      //mode: "CORS",

      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}
function editCaregivers(client_id, token, name, relationship, is_primary) {
  return fetch(
    `${api_url}/client/${client_id}/edit_caregivers?token=${token}&name=${name}&relationship=${relationship}&is_primary=${is_primary}`,
    {
      method: "POST",
      //mode: "CORS",

      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}
function editCaregiverContacts(
  client_id,
  token,
  category,
  text,
  type,
  is_primary
) {
  return fetch(
    `${api_url}/client/${client_id}/edit_caregiver_contacts?token=${token}&category=${category}&text=${text}&type=${type}&is_primary=${is_primary}`,
    {
      method: "POST",
      //mode: "CORS",

      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res;
    })
    .catch(err => err);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}