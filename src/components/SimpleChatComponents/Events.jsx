import React from "react";

export function Events({ events }) {
  return (
    <ul>
      {!events ? (
        events?.map((event, index) => <li key={index}>{event}</li>)
      ) : (
        <li>No data</li>
      )}
    </ul>
  );
}
