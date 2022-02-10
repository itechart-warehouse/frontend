import {rest} from "msw";

export const handlers = [
    rest.get("http://localhost:3000/companies", (req, res, ctx) => {
        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json(
                [
                    {
                        name: "Apple",
                        address: "Minsk",
                        phone: "8735635735",
                        email: "test@test.com"
                    },
                    {
                        name: "Google",
                        address: "Minsk",
                        phone: "8735635735",
                        email: "test@test.com"
                    },
                    {
                        name: "Amazon",
                        address: "Minsk",
                        phone: "8735635735",
                        email: "test@test.com"
                    }
                ]
            )
        )
    })
]