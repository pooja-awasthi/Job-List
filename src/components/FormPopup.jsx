import React, { useState } from "react";
import Mandatory from "../common/Mandatory.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setJobLocation } from "../redux/reducers/JobLocationSlice";
import { useEffect } from "react";
import { useTheme } from "../contextApi/ThemeContext";
import "../styles/FormPopup.css";

const FormPopup = ({ isOpen, onClose, onNext, ...props }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const storeJobDetailData = useSelector((state) => {
    return state.jobDetailInfo;
  });
  const [state, setState] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
    location: "",
    remoteType: "",
  });
  const [errors, setErrors] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
  });

  /**
   * function to check validity of input values before Next button clicked.
   * @returns Boolean
   */
  const validateInputs = () => {
    const newErrors = {};
    if (!state.jobTitle || state.jobTitle === "") {
      newErrors.jobTitle = "Job title can not be empty";
    }
    if (!state.companyName || state.companyName === "") {
      newErrors.companyName = "company name can not be empty";
    }
    if (!state.industry || state.industry === "") {
      newErrors.industry = "Industry value can not be empty";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
    return Object.keys(newErrors).length > 0;
  };

  /**
   * Method to handle Next click and updating the JobLocation Redux state.
   * @param {Object} e
   */
  const handleOnNext = (e) => {
    e.preventDefault();
    const infoInBool = validateInputs();
    const { jobTitle, companyName, industry, location, remoteType } = state;
    if (!infoInBool) {
      const jobLocationDataObj = {
        jobTitle,
        companyName,
        industry,
        location,
        remoteType,
      };
      dispatch(setJobLocation(jobLocationDataObj));
      onNext();
    }
  };

  /**
   * Method to handle OnClick event inside container.
   * @param {Object} e
   */
  const handlePopupContainerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Method to handle onChange event of inputs.
   * @param {Object} event
   */
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  /**
   * Method to empty error values on input focus event
   */
  const handleInputFocus = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      jobTitle: "",
      companyName: "",
      industry: "",
    }));
  };

  /**
   * Method to initialize form state with previous values of card on edit mode.
   * @param {Object} data
   */
  const initialiseStateWithCardData = (data) => {
    setState({
      jobTitle: storeJobDetailData.jobTitle,
      companyName: storeJobDetailData.companyName,
      industry: storeJobDetailData.industry,
      location: storeJobDetailData.location,
      remoteType: storeJobDetailData.remoteType,
    });
  };

  useEffect(() => {
    if (props.isEdit && Object.keys(storeJobDetailData).length > 0) {
      initialiseStateWithCardData();
    }
  }, [storeJobDetailData]);

  /**
   * Method to handle Popup onClose Click.
   */
  const handleOnClose = () => {
    onClose();
  };

  return (
    <div
      className={`${isOpen ? "pop-up-container-open" : "pop-up-container-close"}`}
      onClick={handleOnClose}
    >
      <button
        className={`${isDarkMode ? "pop-up-close-btn-dark" : "pop-up-close-btn"}`}
        onClick={onClose}
      >
        Close
      </button>
      <div
        onClick={handlePopupContainerClick}
        className={`${isDarkMode ? "header-parent-container-dark" : "header-parent-container"}`}
      >
        <div className={`${isDarkMode ? "header-container-dark" : "header-container"}`}>
          <h2>Create a Job</h2>
          <p>Step 1</p>
        </div>
        <div className={`${isDarkMode ? "form-parent-container-dark" : "form-parent-container"}`}>
          <form>
            <div className="form-inputs-parent-container">
              <div className="job-title-parent-container">
                <label htmlFor="jobTitle" className="job-title-label">
                  Job Title
                  <Mandatory />
                </label>
                <input
                  type="text"
                  placeholder="ex. UX UI Designer"
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  value={state.jobTitle}
                  id="jobTitle"
                  className={`job-input ${errors.jobTitle ? "job-input-error" : ""}
                ${isDarkMode ? "job-input-dark" : ""}`}
                />
                {errors.jobTitle && <span className="error-span">{errors.jobTitle}</span>}
              </div>
              <div className="job-label-input-container">
                <label htmlFor="companyName" className="job-company-label">
                  Company Name
                  <Mandatory />
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="ex. Google"
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  value={state.companyName}
                  className={`job-input ${errors.companyName ? "job-input-error" : ""}
                ${isDarkMode ? "job-input-dark" : ""}`}
                />
                {errors.companyName && <span className="error-span">{errors.companyName}</span>}
              </div>
              <div className="job-label-input-container">
                <label htmlFor="industry" className="job-industry-label">
                  Industry
                  <Mandatory />
                </label>
                <input
                  type="text"
                  id="industry"
                  placeholder="ex. Information Technology"
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  value={state.industry}
                  className={`job-input ${errors.industry ? "job-input-error" : ""}
                ${isDarkMode ? "job-input-dark" : `focus:outline-none focus:border-transparent`}`}
                />
                {errors.industry && <span className="error-span">{errors.industry}</span>}
              </div>
              <div className="flex space-x-2">
                <div className="job-label-input-container">
                  <label htmlFor="location" className="job-location-label">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="ex. Chennai"
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    value={state.location}
                    className={`job-input ${isDarkMode ? "job-input-dark" : ""}`}
                  />
                </div>
                <div className="job-label-input-container">
                  <label htmlFor="remoteType" className="job-remote-type-label">
                    Remote Type
                  </label>
                  <input
                    type="text"
                    id="remoteType"
                    placeholder="ex. in-office"
                    value={state.remoteType}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    className={`job-input ${isDarkMode ? "job-input-dark" : ""}`}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="form-step-first-btn-container" onClick={handleOnNext}>
            <button className="form-step-first-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPopup;
