import { HttpService } from "../../utils";
import { TwitterConfig } from "../interfaces/twitter-config.interface";

export class TwitterService {

  private httpService: HttpService;

  constructor(private config: TwitterConfig) {
    this.httpService = new HttpService();
  }

}
