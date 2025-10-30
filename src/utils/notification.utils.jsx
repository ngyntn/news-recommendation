import React from "react";

export const generateNotificationMessage = (notification) => {
  const actorName = notification.actor?.fullName || "Ai đó";
  const articleTitle = notification.article.title || "";
  switch (notification.type) {
    case "like":
      return (
        <span>
          <strong className="font-medium">{actorName}</strong> đã thích bài viết{" "}
          <strong className="font-medium">{articleTitle}</strong> của bạn.
        </span>
      );
    case "comment":
      return (
        <span>
          <strong className="font-medium">{actorName}</strong> đã bình luận về
          bài viết <strong className="font-medium">{articleTitle}</strong> của
          bạn.
        </span>
      );
    case "reply":
      return (
        <>
          <strong className="font-medium">{actorName}</strong> đã phản hồi bình
          luận của bạn về bài viết{" "}
          <strong className="font-medium">{articleTitle}</strong>.
        </>
      );
    case "follow":
      return (
        <span>
          <strong className="font-medium">{actorName}</strong> đã bắt đầu theo
          dõi bạn.
        </span>
      );
    default:
      return <span>{notification.message || "Bạn có thông báo mới."}</span>;
  }
};

export const getNotificationLink = (notification) => {
  if (notification.type === "like" || notification.type === "comment" || notification.type === "reply") {
    return `/news/${notification.article?.slug}`;
  }
  if (notification.type === "follow") {
    return `/profile/${notification.actor?.id}`;
  }
  return "#";
};
