import React, { useState, useEffect, useRef } from "react";
import fetchData from "../common/helper";
import { useSelector, useDispatch } from "react-redux";
import { setJobRequisite } from "../redux/reducers/JobRequisiteSlice";
import { resetJobDetailInfo } from "../redux/reducers/resetJobDetailSlice";
import "../styles/FormPopupStep2.css";
import { useTheme } from "../contextApi/ThemeContext";

const FormPopupStep2 = ({ isOpen, onClose, ...props }) => {
  const jobLocationSelector = useSelector((state) => state.jobLocation);
  const JobDetailDataSelector = useSelector((state) => state.jobDetailInfo);
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(null);
  const { isDarkMode } = useTheme();
  const externalApplyEle = useRef();
  const quickApplyEle = useRef();

  const [state, setState] = useState({
    experienceMin: "",
    experienceMax: "",
    salaryMin: "",
    salaryMax: "",
    totalEmployee: "",
    applyType: "",
  });

  const [errors, setErrors] = useState({
    experienceMin: "",
    experienceMax: "",
    salaryMin: "",
    salaryMax: "",
  });

  /**
   * Method is to validate Values (Minimum Experience, Maximum Experience, Minimum Salary, Maximum Salary)
   * @param {Array} stateVarArr
   * @returns {Boolean}
   */
  const validateInputs = (stateVarArr) => {
    const newErrors = {};
    stateVarArr.forEach((key) => {
      const truthyBool =
        parseInt(state[key]) === NaN ||
        (key !== "experienceMin" && parseInt(state[key]) === 0) ||
        parseInt(state[key]) < 0;

      if (truthyBool) {
        newErrors[key] = "Please enter valid value";
      }

      // Condition to check if Maximum Salary is lesser than Minimum Salary.
      if (
        !newErrors.salaryMin &&
        !newErrors.salaryMax &&
        parseInt(state.salaryMax) < parseInt(state.salaryMin)
      ) {
        newErrors.salaryMax = "Maximum salary must not be less than minimum salary";
      }

      // Condition to check if Maximum Experience is lesser than Minimum Experience.
      if (
        !newErrors.experienceMin &&
        !newErrors.experienceMax &&
        parseInt(state.experienceMax) < parseInt(state.experienceMin)
      ) {
        newErrors.experienceMax = "Maximum experience must not be less than minimum experience";
      }
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    //Returning Bool value saying if error exists or not.
    return Object.keys(newErrors).length > 0;
  };

  /**
   * Methos to Post data to API by calling helper method fetchData.
   * @param {Object} dataObj
   */
  const postandUpdateData = async (dataObj) => {
    let requestDataObj = {
      url: "https://64c3e52967cfdca3b6606d3b.mockapi.io/api/v1/jobDetail/jobDetail",
      method: "post",
      data: dataObj,
    };

    /** Condition to check if Form opened in edit mode.
     * if Save event occured to update the existing data.
     */
    if (props.isEdit) {
      requestDataObj = {
        url: `https://64c3e52967cfdca3b6606d3b.mockapi.io/api/v1/jobDetail/jobDetail/${props.cardId}`,
        method: "put",
        data: dataObj,
      };
    }
    try {
      await fetchData(requestDataObj);
      if (props.isEdit) {
        dispatch(resetJobDetailInfo());
      }
      onClose();
    } catch (error) {
      console.error("Error:", error.message);

      // Api error variable is set to project error bar and it automatically removed after 5secs.
      setApiError(error);
      setTimeout(() => setApiError(""), 4000);
    }
  };

  //To clean out timer and removing error bar after 4secs
  useEffect(() => {
    if (apiError) {
      const timerId = setTimeout(() => {
        setApiError("");
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [apiError]);

  /**
   * Method called onSave event to make post API request.
   * @param {object} e
   */
  const handleOnSave = (e) => {
    e.preventDefault();
    const validateValue = validateInputs([
      "experienceMin",
      "experienceMax",
      "salaryMin",
      "salaryMax",
    ]);
    const { experienceMin, experienceMax, salaryMin, salaryMax, totalEmployee, applyType } = state;
    if (!validateValue) {
      const jobRequisiteDataObj = {
        experience_min: parseInt(experienceMin),
        experience_max: parseInt(experienceMax),
        salary_min: parseInt(salaryMin),
        salary_max: parseInt(salaryMax),
        total_employee: totalEmployee,
        apply_type: applyType,
      };
      const jobLocationDataObj = {
        job_title: jobLocationSelector.jobTitle,
        company_name: jobLocationSelector.companyName,
        industry: jobLocationSelector.industry,
        location: jobLocationSelector.location,
        remote_type: jobLocationSelector.remoteType,
      };
      dispatch(setJobRequisite({ ...jobLocationSelector, ...jobRequisiteDataObj }));
      postandUpdateData({ ...jobLocationDataObj, ...jobRequisiteDataObj });
    }
  };

  const handlePopupContainerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  /**
   * Function to handle change event in input values.
   * @param {object} event
   */

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  /**
   * Function to handle Focus event to empty values.
   */
  const handleInputFocus = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      experienceMin: "",
      experienceMax: "",
      salaryMin: "",
      salaryMax: "",
    }));
    setApiError("");
  };

  /**
   * Function to handle Radio input box change.
   * @param {object} event
   */
  const handleChangeRadioInput = (event) => {
    if (event.target.id === "quickApply") {
      quickApplyEle.current.defaultChecked = true;
    }
    if (event.target.id === "externalApply") {
      externalApplyEle.current.defaultChecked = true;
    }
    setState((prevState) => ({ ...prevState, applyType: event.target.value }));
  };

  /**
   * Method to handle initialize the state values of card on edit mode.
   */
  const initialiseStateWithCardData = () => {
    setState({
      experienceMin: JobDetailDataSelector.experienceMin,
      experienceMax: JobDetailDataSelector.experienceMax,
      salaryMin: JobDetailDataSelector.salaryMin,
      salaryMax: JobDetailDataSelector.salaryMax,
      totalEmployee: JobDetailDataSelector.totalEmployee,
      applyType: JobDetailDataSelector.applyType,
    });
  };

  /**
   * On change of 'JobDetailDataSelector' variable to call `initialiseStateWithCardData` method
   */

  useEffect(() => {
    if (props.isEdit && props.cardId && Object.keys(JobDetailDataSelector).length > 0) {
      initialiseStateWithCardData();
    }
  }, [JobDetailDataSelector]);

  return (
    <div
      className={`${isOpen ? "pop-up-container-open" : "pop-up-container-hidden"}`}
      onClick={onClose}
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
          <h2 className="text-xl">Create a Job</h2>
          <p className="text-lg">Step 2</p>
        </div>
        {apiError && <div className="api-error-div">{apiError}</div>}
        <div className="form-parent">
          <form>
            <div className="space-y-6">
              <div className="experience-parent-container">
                <div className="experience-inp-label-container">
                  <label
                    htmlFor="experience"
                    className={isDarkMode ? "experience-label-dark" : "experience-label"}
                  >
                    Experience
                  </label>
                  <div className="inps-min-max-container">
                    <input
                      type="text"
                      id="experienceMin"
                      value={state.experienceMin}
                      placeholder="Minimum"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      className={`inps-min-max ${errors.experienceMin ? "inps-min-max-err" : ""}
                    ${isDarkMode ? "inps-min-max-dark" : ""}`}
                    />
                    <input
                      type="text"
                      id="experienceMax"
                      value={state.experienceMax}
                      placeholder="Maximum"
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      className={`inps-min-max ${errors.experienceMax ? "inps-min-max-err" : ""}
                    ${isDarkMode ? "inps-min-max-dark" : ""}`}
                    />
                  </div>
                  {(errors.experienceMin || errors.experienceMax) && (
                    <div className="inps-error-parent-container">
                      <div className="flex flex-grow">
                        {errors.experienceMin && (
                          <span className="inp-error-text">{errors.experienceMin}</span>
                        )}
                      </div>
                      <div className="flex justify-end">
                        {errors.experienceMax && (
                          <span className="inp-error-text">{errors.experienceMax}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="salary-parent-container">
                <div className="salary-inp-label-container">
                  <label
                    htmlFor="salary"
                    className={isDarkMode ? "salary-label-dark" : "salary-label"}
                  >
                    Salary
                  </label>
                  <div className="inps-min-max-container">
                    <input
                      type="text"
                      id="salaryMin"
                      value={state.salaryMin}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      placeholder="Minimum"
                      className={`inps-min-max ${errors.salaryMin ? "inps-min-max-err" : ""}
                    ${isDarkMode ? "inps-min-max-dark" : ""}`}
                    />
                    <input
                      type="text"
                      id="salaryMax"
                      value={state.salaryMax}
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      placeholder="Maximum"
                      className={`inps-min-max ${errors.salaryMax ? "inps-min-max-err" : ""}
                    ${isDarkMode ? "inps-min-max-dark" : ""}`}
                    />
                  </div>
                  {(errors.salaryMin || errors.salaryMax) && (
                    <div className="inps-error-parent-container">
                      <div className="flex flex-grow">
                        {errors.salaryMin && (
                          <span className="inp-error-text">{errors.salaryMin}</span>
                        )}
                      </div>
                      <div className="flex justify-end">
                        {errors.salaryMax && (
                          <span className="inp-error-text">{errors.salaryMax}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="total-emp-parent-container">
                <label
                  htmlFor="totalEmployee"
                  className={isDarkMode ? "total-emp-label-dark" : "total-emp-label"}
                >
                  Total Employee
                </label>
                <input
                  type="text"
                  id="totalEmployee"
                  value={state.totalEmployee}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  placeholder="200"
                  className={`total-emp-input ${isDarkMode ? "total-emp-input-dark" : ""}`}
                />
                {errors.totalEmployee && (
                  <span className="inp-error-text">{errors.totalEmployee}</span>
                )}
              </div>
              <div className="apply-parent-container">
                <div className="apply-container">
                  <fieldset>
                    <legend className={isDarkMode ? "apply-label-dark" : "apply-label"}>
                      Apply Type
                    </legend>
                    <div role="radiogroup" class="apply-radio-btns-container">
                      <div class="apply-label-inp-parent-container">
                        <div class="apply-inps-parent-cont">
                          <input
                            aria-labelledby="quickApply"
                            onChange={handleChangeRadioInput}
                            value="Quick Apply"
                            defaultChecked={state.applyType === "Quick Apply"}
                            type="radio"
                            name="apply"
                            class={`apply-inps ${
                              state.applyType === "Quick Apply" ? "default-checked" : ""
                            }`}
                          />
                        </div>
                        <label id="quickApply" class="apply-radio-labels">
                          Quick Apply
                        </label>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="apply-inps-parent-cont">
                          <input
                            aria-labelledby="externalApply"
                            onChange={handleChangeRadioInput}
                            value="External Apply"
                            defaultChecked={state.applyType === "Quick Apply"}
                            type="radio"
                            name="apply"
                            class={`apply-inps ${
                              state.applyType === "External Apply" ? "default-checked" : ""
                            }`}
                          />
                        </div>
                        <label id="externalApply" class="apply-radio-labels">
                          External Apply
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
          <div className="pop-up-btn-container">
            <button className="pop-up-btn-text" onClick={handleOnSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPopupStep2;
