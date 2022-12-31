<p align="center">
<img width="600" src="apps/client/src/assets/gh-logo.svg" alt="instaorder_logo" />
</p>

<p style="font-size: 1.2rem;" align="center">
Instaorder is a software as a service that you can integrate into your business for blazingly fast internal food ordering.
</p>

## Running Locally

- firstly, you need `Node.js` installed, [download node](https://nodejs.org).

- we use `pnpm` as our package manager, install via `npm install -g pnpm` if not already installed.

- clone this monorepo by running `git clone https://github.com/notEpsilon/instaorder.git`

- `cd` into the cloned folder and run `pnpm install` to install dependencies.

- run `pnpm --filter=server compile:watch` && `pnpm --filter=server dev:watch` in seperate terminals to start the server.

- run `pnpm --filter=client dev` to run the client.

- note: you need a `MSSQL Server` running on `localhost:1433` and `Redis` running on `localhost:6379` (use docker with `docker-compose.yml`file in the repository).

- client should start now, navigate to `http://localhost:5173`

<object data="https://drive.google.com/drive/u/0/folders/1Y5Tr92OzVqlGSJe9SOMcA0oEHK27lhSx" type="application/pdf" width="700px" height="700px">
    <embed src="https://drive.google.com/drive/u/0/folders/1Y5Tr92OzVqlGSJe9SOMcA0oEHK27lhSx">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="https://drive.google.com/drive/u/0/folders/1Y5Tr92OzVqlGSJe9SOMcA0oEHK27lhSx">Download PDF</a>.</p>
    </embed>
</object>
