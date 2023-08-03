import React, { useEffect, useState, useRef } from "react";
import "../styles/Home.css";
import FormPopup from "./FormPopup.jsx";
import ToolTip from "../common/ToolTip.jsx";
import FormPopupStep2 from "./FormPopupStep2.jsx";
import fetchData from "../common/helper";
import { useDispatch } from "react-redux";
import { setJobDetailInfo } from "../redux/reducers/jobDetailInfoSlice";
import ConfirmationBox from "../common/ConfirmationBox.jsx";
import DayNightTheme from "../common/DayNightTheme.jsx";
import { useTheme } from "../contextApi/ThemeContext";

const Home = () => {
  const [isPopupStep1Open, setIsPopupStep1Open] = useState(false);
  const [isPopupStep2Open, setIsPopupStep2Open] = useState(false);
  const [isCardEdit, setIsCardEdit] = useState(false);
  const [editJobDetailId, setEditJobDetailId] = useState("");
  const [isCardDelete, setIsCardDelete] = useState(false);
  const [deleteJobDetailId, setDeleteJobDetailId] = useState("");
  const [receivedData, setReceivedData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [apiError, setApiError] = useState(null);
  const editEleRef = useRef();
  const deleteEleRef = useRef();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  /**
   * Method to filter data of selected card & setting redux state variable.
   */
  const getCardDataById = () => {
    const filteredData = receivedData.filter(
      (obj) => parseInt(obj.id) === parseInt(editJobDetailId)
    );
    const jobDetailDataObj = {
      applyType: filteredData[0].apply_type,
      companyName: filteredData[0].company_name,
      experienceMax: filteredData[0].experience_max,
      experienceMin: filteredData[0].experience_min,
      id: filteredData[0].id,
      industry: filteredData[0].industry,
      jobTitle: filteredData[0].job_title,
      location: filteredData[0].location,
      remoteType: filteredData[0].remote_type,
      salaryMax: filteredData[0].salary_max,
      salaryMin: filteredData[0].salary_min,
      totalEmployee: filteredData[0].total_employee,
    };
    dispatch(setJobDetailInfo(jobDetailDataObj));
  };

  /**
   * Method to make delete card API request
   */
  const deleteCardRequest = async () => {
    if (isCardDelete && deleteJobDetailId !== "") {
      const requestDataObj = {
        url: `https://64c3e52967cfdca3b6606d3b.mockapi.io/api/v1/jobDetail/jobDetail/${deleteJobDetailId}`,
        method: "delete",
      };
      try {
        await fetchData(requestDataObj);
        await fetchDataAndSetData();
        setDeleteJobDetailId("");
        setIsCardDelete(false);
      } catch (error) {
        console.error("Error:", error.message);
        setApiError(error);
        setTimeout(() => setApiError(""), 5000);
        setDeleteJobDetailId("");
        setIsCardDelete(false);
      }
    }
  };

  /**
   * Method to handle Create Form Popup
   * @param {object} event
   */
  const handleOpenPopup = (event) => {
    event.preventDefault();
    const buttonElement = event.currentTarget;
    if (buttonElement.id.split("#")[0] === "edit_card") {
      setIsCardEdit(true);
      setEditJobDetailId(buttonElement.id.split("#")[1]);
    } else {
      setIsCardEdit(false);
      setEditJobDetailId("");
    }
    setIsPopupStep1Open(true);
  };

  /**
   * Method to handle pop up close event
   */
  const handleClosePopup = () => {
    if (isPopupStep1Open) setIsPopupStep1Open(false);
    if (isPopupStep2Open) setIsPopupStep2Open(false);
    setIsCardEdit(false);
    setEditJobDetailId("");
  };

  /**
   * Method to handle Step 2 Form Popup
   */
  const handleOpenPopupStep2 = () => {
    setIsPopupStep1Open(false);
    setIsPopupStep2Open(true);
  };

  /**
   * Method to handle delete Job card event
   * @param {Object} event
   */
  const handleDeleteJobCard = (event) => {
    event.preventDefault();
    const buttonElement = event.currentTarget;
    if (buttonElement.id.split("#")[0] === "delete_card") {
      setIsCardDelete(true);
      setDeleteJobDetailId(buttonElement.id.split("#")[1]);
      setShowConfirmation(true);
    }
  };

  /**
   * Method to handle Cancel the confirm box
   */
  const handleCancel = () => {
    setIsCardDelete(false);
    setDeleteJobDetailId("");
    setShowConfirmation(false);
  };

  /**
   * Method to handle Confirm Button of the confirm box
   */
  const handleConfirm = () => {
    setShowConfirmation(false);
    deleteCardRequest();
  };

  /**
   * Clearing up the error box here after 4secs of projection
   */
  useEffect(() => {
    if (apiError) {
      const timerId = setTimeout(() => {
        setApiError("");
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [apiError]);

  /**
   * Calling the `getCardDataById` on change of `editJobDetailId` value
   */
  useEffect(() => {
    if (editJobDetailId && editJobDetailId !== "") {
      getCardDataById();
    }
  }, [editJobDetailId]);

  /**
   * Function to get Job List from API
   */
  const fetchDataAndSetData = async () => {
    try {
      const response = await fetchData({
        url: "https://64c3e52967cfdca3b6606d3b.mockapi.io/api/v1/jobDetail/jobDetail",
        method: "get",
      });
      console.log(response.data);
      setReceivedData(response.data);
    } catch (error) {
      console.error(error);
      setApiError(error);
      setTimeout(() => setApiError(""), 5000);
    }
  };

  /**
   * Callling Up 'fetchDataAndSetData' method on 'isPopupStep2Open' & 'isPopupStep1Open' update
   */
  useEffect(() => {
    if (!isPopupStep2Open && !isPopupStep1Open) {
      fetchDataAndSetData();
    }
    return () => {
      console.log("Component unmounted");
    };
  }, [isPopupStep2Open, isPopupStep1Open]);

  return (
    <div className={`${isDarkMode ? "main-container-dark" : "main-container"}`}>
      {apiError && (
        <div className="bg-red-500 text-white py-2 px-4 rounded-md transition-opacity duration-2000">
          {apiError}
        </div>
      )}
      <div className="float-right transform translate-y-10 p-2 ">
        <DayNightTheme />
      </div>
      <div className="nav-container">
        <div class="flex items-center justify-center">
          <ToolTip
            message={"Create a New Job"}
            addClass="whitespace-nowrap h-8 pointer-events-none top-10 left-1 relative"
          >
            <img
              src="https://th.bing.com/th/id/OIP.Ulr5F4UVwysrB7jB1-tD2wHaHl?w=201&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="logo"
              class="object-cover"
              width="60px"
              height="30px"
              onClick={handleOpenPopup}
            />
          </ToolTip>
        </div>
      </div>
      <div className="job-list-container">
        {receivedData &&
          receivedData.length > 0 &&
          receivedData.map((obj) => (
            <div className={`${isDarkMode ? "job-card-dark" : "job-card"}`}>
              <div className="job-header">
                <div className="org-logo">
                  <img
                    src="https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2016/06/13502130_10153696123838870_522765110773053650_n.png"
                    alt="logo"
                    width="50px"
                    height="70px"
                  />
                </div>
                <div className="job-loc">
                  <h1 className="job-title">{obj.job_title}</h1>
                  <p className="job-org">
                    {obj.company_name} - {obj.industry}
                  </p>
                  <p className="job-addr">
                    {obj.location}({obj.remote_type})
                  </p>
                </div>
                <div className="job-card-edit-delete-icon-div">
                  <button ref={editEleRef} id={`edit_card#${obj.id}`} onClick={handleOpenPopup}>
                    <ToolTip
                      message={"Edit job card"}
                      addClass="pointer-events-none absolute bottom-[-40px] left-[-55px] h-auto w-max"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`${
                          isDarkMode ? "job-card-edit-dark-icon" : "job-card-edit-icon"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </ToolTip>
                  </button>
                  <button
                    ref={deleteEleRef}
                    id={`delete_card#${obj.id}`}
                    onClick={handleDeleteJobCard}
                  >
                    <ToolTip
                      message={"Delete job card"}
                      addClass="pointer-events-none absolute bottom-[-40px] left-[-58px] h-auto w-max"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`${
                          isDarkMode ? "job-card-delete-dark-icon" : "job-card-delete-icon"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </ToolTip>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 space-x-20">
                <p className="pl-20">Part Time (9 am - 5 pm IST)</p>
                <p>
                  Experience ({obj.experience_min} - {obj.experience_max} years)
                </p>
                <p>
                  INR (&#8377;) {obj.salary_min ? obj.salary_min.toLocaleString("en-GB") : " N/A"} -{" "}
                  {obj.salary_max ? obj.salary_max.toLocaleString("en-GB") : "N/A"} / month
                </p>
                <p>{obj.total_employee} employees</p>
              </div>
              {obj.apply_type === "Quick Apply" ? (
                <div className="w-40 text-white transform translate-x-16 translate-y-2 p-2 float-left">
                  <input
                    type="button"
                    value="Apply Now"
                    className={`bg-blue-400 border border-grey-500 font-semibold rounded-md shadow-md p-2 ${
                      isDarkMode ? "border-none" : ""
                    }`}
                  />
                </div>
              ) : obj.apply_type === "External Apply" ? (
                <div className="w-auto transform translate-x-16 translate-y-2 text-white p-2 float-left">
                  <input
                    type="button"
                    value={obj.apply_type}
                    className={`text-blue-500 border border-blue-500 font-semibold rounded-md shadow-md p-2 ${
                      isDarkMode ? "border-2 bg-slate-400" : ""
                    }`}
                  />
                </div>
              ) : (
                <div className="w-40 text-white transform translate-x-16 translate-y-2 p-2 float-left">
                  <input
                    type="button"
                    value="Apply Now"
                    className={`bg-blue-400 border border-grey-500 font-semibold rounded-md shadow-md p-2 ${
                      isDarkMode ? "border-none" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      {(isPopupStep1Open || isPopupStep2Open) && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"></div>
      )}
      {isPopupStep1Open && (
        <FormPopup
          isEdit={isCardEdit}
          isOpen={isPopupStep1Open}
          onNext={handleOpenPopupStep2}
          onClose={handleClosePopup}
        />
      )}
      {isPopupStep2Open && (
        <FormPopupStep2
          isEdit={isCardEdit}
          cardId={editJobDetailId}
          isOpen={isPopupStep2Open}
          onClose={handleClosePopup}
        />
      )}
      {showConfirmation && (
        <ConfirmationBox
          message="Are you sure to delete this Job Card?"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Home;
