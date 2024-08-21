// src/components/icons.js

import React from "react";

// Define SVG Icons
export const InputIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-edit"
  >
    <path d="M3 12l2 2 4-4-2-2-4 4z"></path>
    <path d="M14 2l6 6-2 2-6-6 2-2z"></path>
    <path d="M12 8l4-4 2 2-4 4-2-2 2-2z"></path>
    <path d="M5 15l2-2 4 4-2 2-4-4z"></path>
  </svg>
);

export const TextAreaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-textarea"
  >
    <rect x="3" y="4" width="18" height="14" rx="2" ry="2"></rect>
    <line x1="3" y1="10" x2="21" y2="10"></line>
    <line x1="3" y1="14" x2="21" y2="14"></line>
  </svg>
);

export const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-file"
  >
    <path d="M14 2l6 6v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10z"></path>
    <line x1="14" y1="2" x2="14" y2="8"></line>
  </svg>
);
