import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, message } from "antd";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  //handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else message.error(res.data.message);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  //delete notifications
  const handleDeleteAllRead = async (e) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong In Notifications");
    }
  };
  return (
    <Layout>
      <div
        style={{
          marginTop: "0px",
          marginBottom: "0.5em",
          fontWeight: "500",
          textShadow: "2px 2px brown",
          fontSize: "3rem",
          marginLeft: "10px",
        }}
      >
        Notification Page
      </div>
      <div
        style={{
          margin: "0 20px",
          background: "white",
          opacity: "0.75",
          borderRadius: "5px",
        }}
      >
        <Tabs
          style={{
            fontWeight: "700",
            fontFamily: ` 'PT Serif', serif`,
          }}
        >
          <Tabs.TabPane tab="unRead" key={0} style={{ fontWeight: "600" }}>
            <div
              className="d-flex justify-content-end "
              style={{
                marginTop: "-26px",
                marginBottom: "-17px",
              }}
            >
              <div
                className="p-2 "
                style={{
                  color: "#06068d",
                  cursor: "pointer",
                  fontSize: "1.7rem",
                  marginBottom: "0.5rem",
                  fontWeight: "900",
                }}
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </div>
            </div>
            {user?.notification.map((notifMsg) => (
              <div
                className="card"
                style={{
                  cursor: "pointer",
                  margin: "10px 0px",
                  padding: "0px 5px",
                  border: "2px dashed gray",
                  fontSize: "large",
                }}
              >
                <div
                  className="card-text"
                  onClick={() => navigate(notifMsg.onClickPath)}
                >
                  {notifMsg.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <div
                className="p-2 "
                style={{
                  color: "#06068d",
                  cursor: "pointer",
                  fontSize: "1.7rem",
                  marginBottom: "0.5rem",
                  fontWeight: "900",
                }}
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </div>
            </div>
            {user?.seennotification.map((notifMsg) => (
              <div
                className="card"
                style={{
                  cursor: "pointer",
                  margin: "10px 0px",
                  padding: "0px 5px",
                  border: "2px dashed gray",
                  fontSize: "large",
                }}
              >
                <div
                  className="card-text"
                  onClick={() => navigate(notifMsg.onClickPath)}
                >
                  {notifMsg.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
