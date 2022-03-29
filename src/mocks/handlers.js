import { rest } from "msw";
//TODO Uncomment or add requests if you have BE with data (I do not know how to enable mocks before start)
export const handlers = [
  // rest.get("http://localhost:3000/drivers", (req, res, ctx) => {
  //   return res(
  //     ctx.delay(2000),
  //     ctx.status(200),
  //     ctx.json({
  //       drivers: [
  //         {
  //           id: 3,
  //           first_name: "Wildberries",
  //           last_name: "NYdsfddddddddddddd",
  //           passport_number: "67567572",
  //           passport_info: "eeeeeeeest.com",
  //         },
  //         {
  //           id: 4,
  //           first_name: "Wild",
  //           last_name: "NYsssssssss",
  //           passport_number: "67567572",
  //           passport_info: "testeeeeeeetest.com",
  //         },
  //       ],
  //     })
  //   );
  // }),
];
