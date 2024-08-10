# Random Email Generator

Cloudflare Email worker and browser extension for generating stateless random emails on a domain you control.

This allows tracking where spam comes from -- if you generate an email specifically for use with `foobar.com`, and you get spam addressed to that email, you know foobar sold your information to spammers.

## How it Works

Deploy the worker with environment variables specified (see the README under `worker/`).

Next, install the browser extension (under `ext/`), and configure it with your recipient index (the 0-based index in the `RECIPIENT_LIST`). Now, you'll be able to generate different emails for every account you create.

## Email Format

These generated emails are "stateless" -- there is no central database storing a list/mapping of emails you generate. Instead, all information about the actual recipient is stored within the email address itself.

To generate an email address randomly, concatenate the 0-based recipient index with an ID of your choosing, and base64 encode it. This forms the `local-part` of the email. Padding is not required.

**Example**: Recipient index `2` with an ID of `foobar` on `example.com` would be `MmZvb2Jhcg@example.com`.

Optionally, you prefix this with a dot (`.`) and arbitrary content: `me.MmZvb2Jhcg@example.com`
