import type { Env } from "./types.d.ts";

export default {
  async email(message: ForwardableEmailMessage, env: Env, _ctx: ExtendableEvent) {
    const recipients = env.RECIPIENT_LIST.split(",");
    
    const [localPart, domain] = message.to.split("@");
    if (domain !== env.DOMAIN) message.setReject("invalid domain");
    else {
      // decode the alias
      const lastDotIndex = localPart.lastIndexOf('.');
      // everything after last dot
      try {
        const aliasData = atob(localPart.substring(lastDotIndex + 1));
        const recipientId = parseInt(aliasData.charAt(0));
        const aliasId = aliasData.substring(1);
        const recipient = recipients[recipientId];
        if (!recipient) {
          message.setReject("email does not exist");
        } else {
          await message.forward(recipient, new Headers({ "X-Alias-Id": aliasId }));
        }
      } catch(err) {
        console.error(err)
        message.setReject("email does not exist");
      }
    }
  }
}
