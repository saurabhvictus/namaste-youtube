import React from "react";

const commentsData = [
  {
    name: "Saurabh Singh",
    text: "This is a comment data",
    replies: [
      {
        name: "Saurabh Singh",
        text: "This is a comment data",
        replies: [
          {
            name: "Saurabh Singh",
            text: "This is a comment data",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Saurabh Singh",
    text: "This is a comment data",
    replies: [
      {
        name: "Saurabh Singh",
        text: "This is a comment data",
        replies: [],
      },
    ],
  },
  {
    name: "Saurabh Singh",
    text: "This is a comment data",
    replies: [],
  },
  {
    name: "Saurabh Singh",
    text: "This is a comment data",
    replies: [],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-sm bg-gray-200 rounded-lg p-2 my-2">
      <img
        className="w-12 h-12"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p className="font-semibold">{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-4 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentsList comments={commentsData} />;
    </div>
  );
};

export default CommentsContainer;
