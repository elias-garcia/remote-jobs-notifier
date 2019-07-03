import { RequestOptions, IncomingMessage, request } from "http";
import { IncomingMessageEvent } from "../enums/incoming-message-event.enum";

const FIRST_HTTP_ERROR_CODE = 400;

export class HttpService {

  constructor() { }

  public request(options: RequestOptions, data?): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const socket = request(options, (res: IncomingMessage) => {
        const rawData = [];

        res.on(IncomingMessageEvent.DATA, (chunk) => {
          rawData.push(chunk);
        });
        res.on(IncomingMessageEvent.END, () => {
          const jsonData = this.convertRawDataToJson(rawData);

          if (this.isHttpError) {
            reject(jsonData);
          } else {
            resolve(jsonData);
          }
        });
      });

      socket.on(IncomingMessageEvent.ERROR, (err) => {
        reject(err);
      });
      if (data) {
        socket.write(data);
      }
      socket.end();
    });
  }

  private isHttpError(statusCode: number) {
    return statusCode >= FIRST_HTTP_ERROR_CODE;
  }

  private convertRawDataToJson(rawData: any[]) {
    return JSON.parse(Buffer.from(rawData).toString());
  }

}