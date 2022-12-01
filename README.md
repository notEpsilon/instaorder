<p align="center">
<img width="600" src="apps/client/src/assets/gh-logo.svg" alt="instaorder_logo" />
</p>

<p style="font-size: 1.2rem;" align="center">
Instaorder is a platform as a service that you can integrate into your business for blazingly fast internal food ordering.
</p>

## Running Locally

- firstly, you need `Node.js` installed, [download node](https://nodejs.org).

- we use `pnpm` as our package manager, install via `npm install -g pnpm` if not already installed.

- clone this monorepo by running `git clone https://github.com/notEpsilon/instaorder.git`

- `cd` into the cloned folder and run `pnpm install` to install dependencies.

- run `pnpm --filter=client dev` to start the client. (doesn't start the server)

- client should start now, navigate to `http://localhost:5173`
