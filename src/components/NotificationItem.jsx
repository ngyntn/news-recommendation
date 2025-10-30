import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, MessageSquare, Heart, Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { markNotificationsAsRead } from "../api/notificationApi";
import { formatTimeAgo } from "../utils/convert.js";
import NotificationAvatar from "./NotificationAvatar";
import { generateNotificationMessage, getNotificationLink } from '../utils/notification.utils.jsx';

const NotificationItem = ({ notification, isDropdown = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = generateNotificationMessage(notification);
  const timeAgo = formatTimeAgo(notification.createdAt);
 
  const handleClick = (e) => {
    e.preventDefault();
    if (!notification.isRead) {
      dispatch(markNotificationsAsRead([notification.id]));
    }
    navigate(getNotificationLink(notification));
  };

  const itemClass = isDropdown
    ? "block p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
    : `flex items-start gap-4 p-4 border-b dark:border-gray-700 ${
        !notification.read
          ? "bg-indigo-50 dark:bg-indigo-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`;

  return (
    <a href={getNotificationLink(notification)} onClick={handleClick} className={itemClass}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <NotificationAvatar notification={notification} />
        </div>

        <div className="ml-4 w-0 flex-1">
          {" "}
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {timeAgo}
          </p>
        </div>
        {!notification.isRead && (
          <div className="ml-2 flex-shrink-0 self-center">
            <span className="block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          </div>
        )}
      </div>
    </a>
  );
};

export default NotificationItem;
