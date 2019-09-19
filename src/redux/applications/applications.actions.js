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
