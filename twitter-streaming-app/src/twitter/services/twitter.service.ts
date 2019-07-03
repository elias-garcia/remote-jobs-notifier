import { TwitterConfig } from "../interfaces/twitter-config.interface";
import { HttpService } from "../../utils";

export class TwitterService {

  private httpService: HttpService;

  constructor(private config: TwitterConfig) {
    this.httpService = new HttpService();
  }

}