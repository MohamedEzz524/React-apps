import React from "react";

export const Bullet = React.memo(({ index, status, onClick }) => {
  return (
    <div
      key={index}
      className={`bullet ${status} `}
      onClick={() => onClick(index)}
    >
      {index + 1}
    </div>
  );
});
