import validationMiddleware from '@/middleware/validation.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import ResultException from '@/utils/exceptions/result.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { CreateQueryRequest, UpdateQueryRequest } from './product.interface';
import Product from './product.model';
import validation from './product.validation';

class ProductController implements Controller {
    public path = '/products';
    public router = Router();

    constructor() {
        // Initialize product routes.
        this.initRoutes();
    }

    private initRoutes = (): void => {
        // Create product route.
        this.router.put(
            `${this.path}/create`,
            validationMiddleware(validation.create),
            this.createProduct
        );

        // Update product route.
        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validation.update),
            this.updateProduct
        );

        // Get list product route.
        this.router.get(`${this.path}`, this.getProductList);

        // Get product details route.
        this.router.get(`${this.path}/:id`, this.getProduct);

        // Delete product route.
        this.router.delete(`${this.path}/delete/:id`, this.deleteProduct);
    };

    private createProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const query: CreateQueryRequest = req.body;

            // Create product.
            const created: Product = await Product.query().insert(query);

            // Return success response.
            res.status(200).json(
                new ResultException(
                    200,
                    'Successfully created new product.',
                    created
                )
            );
        } catch (err) {
            next(
                new HttpException(
                    400,
                    'There was a problem with create a new product.'
                )
            );
        }
    };

    private updateProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const query: UpdateQueryRequest = req.body;

            // Update product.
            const updated: Product = await Product.query().updateAndFetchById(
                query.Id,
                {
                    Name: query.Name,
                    Price: query.Price,
                }
            );

            if (updated)
                res.status(200).json(
                    new ResultException(
                        200,
                        'Successfully updated product data.',
                        updated
                    )
                );
            else
                next(
                    new HttpException(
                        404,
                        'The product with the given ID does not exist.'
                    )
                );
        } catch (err) {
            next(
                new HttpException(
                    400,
                    'There was a problem with update a product.'
                )
            );
        }
    };

    private deleteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            // Get product from database.
            const deleted: number = await Product.query().deleteById(id);

            if (deleted)
                res.status(200).json(
                    new ResultException(
                        200,
                        `Successfully deleted product with Id: ${id}`,
                        null
                    )
                );
            else
                next(
                    new HttpException(
                        404,
                        'The product with the given ID does not exist.'
                    )
                );
        } catch (err) {
            next(
                new HttpException(400, 'There was a problem with get products.')
            );
        }
    };

    private getProductList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // Get all products from database.
            const productList: Product[] = await Product.query();

            res.status(200).json(new ResultException(200, null, productList));
        } catch (err) {
            next(
                new HttpException(400, 'There was a problem with get products.')
            );
        }
    };

    private getProduct = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;

            // Get product from database.
            const product: Product | undefined = await Product.query().findById(
                id
            );

            res.status(200).json(
                new ResultException(200, null, product || null)
            );
        } catch (err) {
            next(
                new HttpException(400, 'There was a problem with get products.')
            );
        }
    };
}

export default ProductController;
