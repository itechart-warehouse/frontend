import {rest} from "msw";
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
]