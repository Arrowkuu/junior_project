import request from 'supertest';
import { returnApp } from '../../index';

describe("PUT /products/create", () => {
    describe("given name and price", () => {
        
        test("should respond status 200", async () => {
            const response = await request(returnApp().express).put('/api/products/create').send({
                Name: "Name",
                Price: 5
            });

            expect(response.status).toBe(200);
        });

        test("should respond with a status code 400", async () => {
            const bodyContent = [
                { Name: "Name" },
                { Price: 5 }
            ]
            
            for(const body of bodyContent) {
                const response = await request(returnApp().express).put('/api/products/create').send(body);

                expect(response.status).toBe(400);
            }
        });
    })
});