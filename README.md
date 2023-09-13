# React PWA Demo

This [demo](https://react-pwa-demo-gnn35s5qxq-nn.a.run.app/) was inspired by the implementation in this [SQLite Wasm in the brwoser backed by OPFS](https://developer.chrome.com/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/) blog post.

## Overview

This repository contains a minimal demo of an entirely client-side web application, including a SQLite database that is persisted using [Origin Private File System](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) (OPFS). The use-case for this application is to enable a federated application architecture where data entry, data validation, data redaction/censoring, and data storage can be handled entirely on the web client. Moreover, since OPFS storage is scoped to an origin, the entire sqlite database file can be written to OPFS storage, and used to retrieve the application state when the user next visits the site.

## Architecture

![Architecture Overview](docs/architecture.svg)

The entire PWA is bundled into html, css, javascript, and web assembly modules that can be served on any static file server. When all of the static assets are loaded in the browser, a few things happen:

- The main thread of the application begins rendering the user interface and responding to user events.
- A web worker is started in the background, which loads and initializes the sqlite-wasm module.
- A `.sqlite3` file and any associated tables are created (if they don't already exist).
- The `.sqlite3` file is saved to the root of the OPFS for the website origin (if it doesn't already exist).

Since the database lives in OPFS storage (on-device), the application can function without requiring a connection to a server-side application.

Data validation can be built into the client side application to fix errors at the point where data are collected. When the user is ready to send a restricted subset of data to PHAC, they can redact whichever information they deem appropriate, and business logic for privacy can be built into the client-side application (e.g. censoring certain fields). When the user is ready to send a redacted/censored record to PHAC, they can send the data as a kafka event, for example, which could get picked up in an event queue and used for downstream tasks. 

![Federated Architecture](docs/federated.svg)

This architecture is federated in the sense that each device maintains its own private local storage. The only time network connectivity is required is when the user chooses to publish an event with some censored/redacted data. The precise way in which data are censored/redacted could be agreed upon ahead of time and built into the application so that only necessary agreed-upon fields are sent to downstream use cases.



## Communication Between Main Thread and Web Workers

The diagram below shows an example of how the main thread of the application communicates with the worker thread to perform a read from the sqlite database stored in OPFS storage.

![Read from SQLite DB](docs/read-sqlite-db.svg)