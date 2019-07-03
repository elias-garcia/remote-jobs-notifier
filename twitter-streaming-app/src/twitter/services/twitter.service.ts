import Axios from "axios";
import { SearchResponse } from "..";
import { AuthResponse } from "../interfaces/auth-response.interface";
import { TwitterConfig } from "../interfaces/twitter-config.interface";

export class TwitterService {

  private readonly TWITTER_API_BASE_URL = "https://api.twitter.com";
  private readonly TWITTER_API_VERSION = "1.1";
  private readonly TWITTER_API_TOKEN_RESOURCE = "oauth2/token";
  private readonly TWITTER_API_TWEETS_RESOURCE = "search/tweets.json";
  private readonly TWITTER_API_GRANT_TYPE = "client_credentials";
  private readonly TWITTER_API_CREDENTIALS_ENCODING = "base64";
  private readonly TWITTER_API_TWEET_MODE = "extended";

  constructor(private config: TwitterConfig) { }

  public async getTweets(usersData: string[]): Promise<SearchResponse> {
    try {
      const bearerToken = await this.getAuthenticationToken();
      const res = await Axios.request<SearchResponse>({
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        method: "GET",
        params: {
          q: this.buildSearchQuery(usersData),
          tweet_mode: this.TWITTER_API_TWEET_MODE,
        },
        url: `${this.getTwitterTweetsApiUrl(this.TWITTER_API_TWEETS_RESOURCE)}`,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  private async getAuthenticationToken(): Promise<string> {
    try {
      const encodedCredentials = Buffer
        .from(`${this.config.apiKey}:${this.config.apiSecretKey}`)
        .toString(this.TWITTER_API_CREDENTIALS_ENCODING);
      const res = await Axios.request<AuthResponse>({
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
        method: "POST",
        params: {
          grant_type: this.TWITTER_API_GRANT_TYPE,
        },
        url: `${this.getTwitterAuthApiUrl(this.TWITTER_API_TOKEN_RESOURCE)}`,
      });

      return res.data.access_token;
    } catch (e) {
      throw e;
    }
  }

  private buildSearchQuery(usersData: string[]) {
    let query = "";

    usersData.forEach((user: string, i: number) => {
      query += (i > 0) ? ` OR from:${user}` : `from:${user}`;
    });
    console.log(query);
    return query;
  }

  private getTwitterAuthApiUrl(resourcePath: string) {
    return `${this.TWITTER_API_BASE_URL}/${resourcePath}`;
  }

  private getTwitterTweetsApiUrl(resourcePath: string) {
    return `${this.TWITTER_API_BASE_URL}/${this.TWITTER_API_VERSION}/${resourcePath}`;
  }

}
