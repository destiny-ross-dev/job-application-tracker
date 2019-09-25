import ApplicationsActionTypes from "./applications.types";
import axios from "axios";

export const getMostRecentApplications = () => ({
  type: ApplicationsActionTypes.GET_MOST_RECENT_APPLICATIONS,
  payload: axios
    .get(`/applications/recent`)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
});

export const getStatsForDashboard = () => ({
  type: ApplicationsActionTypes.GET_STATS_FOR_DASH,
  payload: axios
    .get("/applications/stats")
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err))
});

export const getApplicationsForTable = (limit = 5, offset = 0) => ({
  type: ApplicationsActionTypes.LOAD_TABLE,
  payload: axios
    .get(`/applications/table?limit=${limit}&offset=${offset}`)
    .then(res => {
      return res.data;
    })
});

export const submitNewApplication = data => ({
  type: ApplicationsActionTypes.SUBMIT_APPLICATION,
  payload: axios.get("/applications/new", data).then(res => {
    return res.data;
  })
});
