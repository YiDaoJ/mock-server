import Stubr from "stubr";
import { Method } from "stubr";
import { events } from "./utils";

// instantiate Stubr
const stubr = new Stubr({
  stubsPort: 4000,
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

// stubr.register({
//   name: "POST",
//   route: "/jsframeworks",
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
