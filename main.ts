import Stubr, { Method } from "stubr";
import { v4 as uuidv4 } from "uuid";
import { events, iEvent } from "./utils";

// instantiate Stubr
const stubr = new Stubr({
  stubsPort: 4080,
  uiPort: 5001,
});

/**
 * ========== register route fruits =========
 */
stubr.register({
  name: "GET",
  route: "/events",
  method: Method.GET,
  validate: (
    requestHeaders: object,
    requestBody: object,
    requestParams: object
  ) => {
    return true;
  },
  responseCode: 200,
  responseBody: {
    events,
  },
});

type EventType = {
  eventId: string | number;
};

stubr.register({
  name: "GET",
  route: "/events/{eventId}",
  method: Method.GET,
  validate: (
    requestHeaders: object,
    requestBody: object,
    requestParams: object
  ) => {
    return true;
  },
  responseCode: 200,
  responseBody: (requestHeaders, requestBody, requestParams: EventType) => {
    return {
      event: events.find(
        (e) => e.id.toString() === requestParams.eventId.toString()
      ),
    };
  },
});

stubr.register({
  name: "POST",
  route: "/events",
  method: Method.POST,
  validate: (
    requestHeaders: object,
    requestBody: object,
    requestParams: object
  ) => {
    return true;
  },
  responseCode: 200,
  responseBody: (
    requestHeaders,
    requestBody: { event: Omit<iEvent, "id"> },
    requestParams
  ) => {
    const newEvent = { ...requestBody.event, id: uuidv4() } as iEvent;
    events.push(newEvent);
    return {
      event: newEvent,
    };
  },
});

// /**
//  * ========== register route test =========
//  */

// stubr.register({
//   name: "get selected",
//   route: "/test",
//   method: Method.POST,
//   validate: (
//     requestHeaders: object,
//     requestBody: object,
//     requestParams: object
//   ) => {
//     return true;
//   },
//   responseCode: 200,
//   responseBody: (
//     requestHeaders,
//     requestBody: { selected: string },
//     requestParams
//   ) => {
//     console.log({ requestBody, requestHeaders, requestParams });
//     return {
//       data: `You've choosen ${requestBody.selected}!`,
//     };
//   },
// });

// start Stubr
stubr.run();
