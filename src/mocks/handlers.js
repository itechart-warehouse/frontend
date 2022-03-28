import { rest } from "msw";
//TODO Uncomment or add requests if you have BE with data (I do not know how to enable mocks before start)
export const handlers = [
  // rest.get("http://localhost:3000/companies", (req, res, ctx) => {
  //     return res(
  //         ctx.delay(2000),
  //         ctx.status(200),
  //         ctx.json(
  //             {
  //                 companies: [
  //                     {
  //                         id: 1,
  //                         name: "Wildberries",
  //                         address: "NY",
  //                         phone: "67567572",
  //                         email: "test@test.com"
  //                     },
  //                     {
  //                         id: 2,
  //                         name: "Ozon",
  //                         address: "NY",
  //                         phone: "675fff67572",
  //                         email: "ozon@test.com"
  //                     },
  //
  //                 ]
  //             }
  //         )
  //     )
  // })
  rest.get("/transports", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        transports: [
          {
            id: 1,
            truck_number: "MERCEDES 1234 ME-5",
          },
          {
            id: 2,
            truck_number: "SCANIA 4590-CT-2",
          },
        ],
      })
    );
  }),
  rest.get("/transport/:trId", (req, res, ctx) => {
    const { trId } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        transport: {
          id: 1,
          truck_number: "TEST",
        },
      })
    );
  }),
];
