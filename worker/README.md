# Random Email Generator - CF Worker

A Cloudflare Email worker that routes incoming emails to the correct recipient based on the original encoded recipient.

**Required environment variables**:

| name | description | example |
| - | - | - |
| `RECIPIENT_LIST` | Comma separated list of recipients  | `foo@gmail.com,bar@outlook.com` |
| `DOMAIN` | The expected recipient domain for incoming emails | `example.com` |

In this case, `foo@gmail.com` has a recipient ID of 0, and `bar@outlook.com` has a recipient ID of 1.

All emails in the recipient list must be valid recipient emails in your Cloudflare account.
