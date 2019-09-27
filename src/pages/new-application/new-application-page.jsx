import React, { useState, useEffect } from "react";
import FormInput from "../../components/input-field/input-field";
import axios from "axios";
import { connect } from "react-redux";
import { isEmpty } from "../../utils";
import { submitNewApplication } from "../../redux/applications/applications.actions";
import FormStepper from "../../components/form-stepper/form-stepper";
const today = new Date().toISOString().substring(0, 10);

const NewApplicationPage = ({
  history,
  menuExpanded,
  submitNewApplication
}) => {
  const [formState, updateForm] = useState({
    company: "",
    address: "",
    position: "",
    industry: "",
    datePosted: today,
    dateApplied: today,
    linkToPosting: "",
    city: "",
    state: "",
    noContact: false,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    note: ""
  });

  const handleInput = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    updateForm({ ...formState, [e.target.name]: value });
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

  const onSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    let filesArr = [applicationDocs.resume, applicationDocs.coverLetter];

    // ADD THE ATTACHMENT RESUME/CL FILES
    for (let i = 0; i < filesArr.length; i++) {
      data.append("files", filesArr[i]);
    }
    // ADD THE OTHER INFORMATION
    console.log(formState);
    data.append("applicationData", JSON.stringify(formState));

    console.log(data);

    let response = await axios.post("/applications/new", data);
    console.log(response.data);

    // history.push("/");
  };

  const [currentStep, setCurrentStep] = useState(1);
  const onNextStepClick = () => {
    if (!validateFields(currentStep)) return;
    if (currentStep > 3) return;
    setCurrentStep(currentStep + 1);
  };
  const onBackStepClick = () => {
    if (currentStep === 1) return;
    setCurrentStep(currentStep - 1);
  };

  const [error, setError] = useState("");
  const validateFields = step => {
    let isValid = true;
    console.log(formState);
    switch (step) {
      case 1:
        isEmpty(formState.company) && (isValid = false);
        isEmpty(formState.city) && (isValid = false);
        isEmpty(formState.state) && (isValid = false);
        isEmpty(formState.industry) && (isValid = false);
        break;
      case 2:
        isEmpty(formState.position) && (isValid = false);
        isEmpty(formState.linkToPosting) && (isValid = false);
        isEmpty(formState.dateApplied) && (isValid = false);
        break;
      case 3:
        if (formState.noContact === true) {
          break;
        } else {
          isEmpty(formState.contactName) && (isValid = false);
          isEmpty(formState.contactPosition) && (isValid = false);
          isEmpty(formState.contactPhone) && (isValid = false);
          isEmpty(formState.contactEmail) && (isValid = false);
          break;
        }
    }

    if (isValid === false) {
      setError("All fields must be provided");
    } else setError("");
    return isValid;
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
      <FormStepper
        onStepClick={setCurrentStep}
        steps={[
          { title: "Step 1", desc: "Company Information" },
          { title: "Step 2", desc: "Job Information" },
          { title: "Step 3", desc: "Contact Information" },
          { title: "Step 4", desc: "Document Attachments" }
        ]}
        currentStep={currentStep}
      >
        <div className="Form">
          {currentStep === 1 && (
            <div className="Form__Section">
              <h2 className="Form__SectionTitle">Company Information</h2>
              <FormInput
                type="text"
                name="company"
                value={formState.company}
                onChange={handleInput}
                label="Company"
              />
              <FormInput
                type="text"
                name="address"
                value={formState.address}
                onChange={handleInput}
                label="Address"
              />
              <FormInput
                type="text"
                name="industry"
                value={formState.industry}
                onChange={handleInput}
                label="Industry"
              />
              <div className="CityStateDiv">
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
              <h2 className="Form__SectionTitle">Notes</h2>
              <textarea
                rows="4"
                className="FormInput"
                name="note"
                value={formState.note}
                onChange={handleInput}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="Form__Section Form__Section--Job">
              <h2 className="Form__SectionTitle">
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
          )}
          {currentStep === 3 && (
            <div className="Form__Section Form__Section--Contact">
              <h2 className="Form__SectionTitle">Contact Information</h2>

              <FormInput
                type="text"
                label="Contact Name"
                name="contactName"
                value={formState.contactName}
                onChange={handleInput}
                disabled={formState.noContact}
              />
              <FormInput
                type="text"
                label="Contact Position"
                name="contactPosition"
                value={formState.contactPosition}
                onChange={handleInput}
                disabled={formState.noContact}
              />
              <FormInput
                type="email"
                label="Contact Email"
                name="contactEmail"
                value={formState.contactEmail}
                onChange={handleInput}
                disabled={formState.noContact}
              />
              <FormInput
                type="phone"
                label="Contact Phone"
                name="contactPhone"
                value={formState.contactPhone}
                onChange={handleInput}
                disabled={formState.noContact}
              />
              <div className="CheckboxContainer">
                <label>Applied without Internal Contact</label>
                <input
                  type="checkbox"
                  checked={formState.noContact}
                  onChange={handleInput}
                  name="noContact"
                />
                <span class="checkmark"></span>
              </div>
            </div>
          )}
          {currentStep === 4 && (
            <div className="Form__Section Form__Section--Attachments">
              <h2 className="Form__SectionTitle">Application Attachments</h2>
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
                  {applicationDocs.coverLetter.name ||
                    "No Cover Letter Attached"}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="Form__ButtonContainer">
          <div>
            {currentStep > 1 && (
              <button
                className="Form__Button Form__Button--Back"
                onClick={onBackStepClick}
              >
                Back
              </button>
            )}
          </div>
          <h2 className="error">{error}</h2>
          {currentStep < 4 && (
            <button
              className="Form__Button Form__Button--Next"
              onClick={onNextStepClick}
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              className="Form__Button Form__Button--Submit"
              onClick={onSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </FormStepper>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitNewApplication: data => dispatch(submitNewApplication({ data }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewApplicationPage);
