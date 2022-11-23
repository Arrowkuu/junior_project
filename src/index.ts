import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import ProductController from './resources/product/product.controller';

const app = new App([new ProductController()], Number(process.env.PORT));

export const returnApp = (): App => {
    return app;
}

app.listen();
