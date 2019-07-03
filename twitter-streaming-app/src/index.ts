import { appConfig } from "./config";
import { usersData } from "./data";
import { TwitterService } from "./twitter";

(async () => {
  try {
    console.log("starting");
    const twitterService = new TwitterService(appConfig.twitter);
    const res = await twitterService.getTweets(usersData);

    console.log(res);
  } catch (e) {
    console.log(e);
  }
})();
