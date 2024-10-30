# Building a Nested Comments System

A nested comment system is a feature, which allows users to share their opinions on a comment made by the author of the post or by another user. In this way, a multi-level structure of the conversation is created. Each of the comments can have child comments (or replies) that are forming a thread of organization. It visually represents the conversation in levels or layers. Thus, the users are able to follow the discussions far more easily, as every reply is linked to the original comment, keeping related responses together.
Typically a nested comment system includes:
Parent Comment: The original comment which is on the top layer of the macroparticle, and it can have multiple responses to it as well.
Child Comments (Replies): Comments in response to a parent or another reply, displayed in an indented manner.
Upvote/Downvote: Each comment can be either liked or disliked.
Timestamp: The timestamp of the comment can be shown.
Threaded Display: Every reply is shown indented to indicate the relation within the thread.

.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Upload Guidelines](#file-upload-guidelines)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Briefly describe the project’s purpose, the technology stack used, and any context to help users understand its purpose.

## Features

- **CSV Upload and Parsing**: Supports CSV file uploads and parses the content using PapaParse.
- **Validation and Alerts**: Ensures uploaded files include specific headers, alerting users if any required headers are missing.
- **Error Handling**: Provides appropriate feedback for invalid files or operations.
- **Cancel Upload Functionality**: Includes a button to remove the uploaded file, providing users with control over the upload process.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
