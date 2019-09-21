import React, { useState, useEffect } from "react";
import FormInput from "../../components/input-field/input-field";
import axios from "axios";
import { connect } from "react-redux";
const today = new Date().toISOString().substring(0, 10);

const NewApplicationPage = ({ history, menuExpanded }) => {
  const [formState, updateForm] = useState({
    company: "",
    position: "",
    datePosted: today,
    dateApplied: today,
    linkToPosting: "",
    city: "",
    state: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    note: ""
  });

  const handleInput = e => {
    updateForm({ ...formState, [e.target.name]: e.target.value });
  };
  const [autoSuggestList, setAutoSuggestList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const suggestionList = await axios.get(`/companies`);
      setAutoSuggestList(suggestionList.data);
    }

    fetchData();
  }, []);

  const [applicationDocs, setDocs] = useState({ resume: {}, coverLetter: {} });

  const onFileInputChange = e => {
    console.log("doc:", e.target.name);
    setDocs({ ...applicationDocs, [e.target.name]: e.target.files[0] });
  };
  const validateFormState = () => {
    let isValid = true;
    for (let property in formState) {
      if (formState[property] === "") {
        isValid = false;
        return isValid;
      }
    }

    return isValid;
  };

  const [error, setError] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    let isValid = validateFormState();

    if (isValid === false) {
      setError("Must supply all fields.");
      return;
    }
    setError("");

    const data = new FormData();
    let filesArr = [applicationDocs.resume, applicationDocs.coverLetter];

    // ADD THE ATTACHMENT RESUME/CL FILES
    for (let i = 0; i < filesArr.length; i++) {
      data.append("files", filesArr[i]);
    }
    // ADD THE OTHER INFORMATION
    data.append("applicationData", JSON.stringify(formState));

    let response = await axios.post("/applications", data);
    console.log(response.data);

    history.push("/");
  };

  return (
    <div
      className={`NewApplicationPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      <h1>Add New Application</h1>
      <form className="ApplicationForm" onSubmit={onSubmit}>
        <div className="ApplicationForm__Section ApplicationForm__Section--Company">
          <h2 className="ApplicationForm__SectionTitle">Company Information</h2>
          <FormInput
            type="text"
            name="company"
            value={formState.company}
            onChange={handleInput}
            label="Company"
          />
          <FormInput
            type="text"
            name="city"
            value={formState.city}
            onChange={handleInput}
            label="City"
          />
          <FormInput
            type="text"
            name="state"
            value={formState.state}
            onChange={handleInput}
            label="State"
          />
        </div>

        <div className="ApplicationForm__Section ApplicationForm__Section--Job">
          <h2 className="ApplicationForm__SectionTitle">
            Job and Posting Information
          </h2>
          <FormInput
            type="text"
            name="position"
            value={formState.position}
            onChange={handleInput}
            label="Position"
          />
          <FormInput
            type="url"
            type="text"
            name="linkToPosting"
            value={formState.linkToPosting}
            onChange={handleInput}
            label="Link To Posting"
          />
          <FormInput
            label="Date Posted"
            type="date"
            name="datePosted"
            value={formState.datePosted}
            onChange={handleInput}
          />
          <FormInput
            label="Date Applied"
            type="date"
            name="dateApplied"
            value={formState.dateApplied}
            onChange={handleInput}
          />
        </div>

        <div className="ApplicationForm__Section ApplicationForm__Section--Contact">
          <h2 className="ApplicationForm__SectionTitle">Contact Information</h2>
          <FormInput
            type="text"
            label="Contact Name"
            name="contactName"
            value={formState.contactName}
            onChange={handleInput}
          />
          <FormInput
            type="text"
            label="Contact Position"
            name="contactPosition"
            value={formState.contactPosition}
            onChange={handleInput}
          />
          <FormInput
            type="email"
            label="Contact Email"
            name="contactEmail"
            value={formState.contactEmail}
            onChange={handleInput}
          />
          <FormInput
            type="phone"
            label="Contact Phone"
            name="contactPhone"
            value={formState.contactPhone}
            onChange={handleInput}
          />
        </div>

        <div className="ApplicationForm__Section ApplicationForm__Section--Attachments">
          <h2 className="ApplicationForm__SectionTitle">
            Application Attachments
          </h2>
          <div className="UploadButton UploadButton--Resume">
            <input
              onChange={onFileInputChange}
              type="file"
              name="resume"
              id="upload-resume"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,"
            />
            <label htmlFor="upload-resume">
              <h2>Attach Resume</h2>
            </label>
            <h3 className="DocumentName">
              {applicationDocs.resume.name || "No Resume Attached"}
            </h3>
          </div>

          <div className="UploadButton UploadButton--CoverLetter">
            <input
              onChange={onFileInputChange}
              type="file"
              id="upload-coverLetter"
              name="coverLetter"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,"
            />
            <label htmlFor="upload-coverLetter">
              <h2>Attach Cover Letter</h2>
            </label>
            <h3 className="DocumentName">
              {applicationDocs.coverLetter.name || "No Cover Letter Attached"}
            </h3>
          </div>
        </div>
        <div className="ApplicationForm__Section ApplicationForm__Section--Notes">
          <h2 className="ApplicationForm__SectionTitle">Notes</h2>
          <textarea
            rows="4"
            className="FormInput"
            name="note"
            value={formState.note}
            onChange={handleInput}
          />
        </div>
        <h2 className="error">{error}</h2>
        <button type="submit" className="SubmitButton">
          <i className="fas fa-save" />
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded
  };
};
export default connect(
  mapStateToProps,
  {}
)(NewApplicationPage);
