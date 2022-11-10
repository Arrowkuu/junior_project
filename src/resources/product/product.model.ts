import { Model } from 'objection';
import Database from '@/config/database.config';
import knex from 'knex';

// Here define table name.
const tableName = process.env.DB_PREFIX + 'products';

class Product extends Model {
    static tableName = tableName;

    Id!: number;
    Name!: string;
    Price!: number;
    UpdateDate!: Date;

    // Before update, set updateDate value.
    $beforeUpdate() {
        this.UpdateDate = new Date();
    }
}

async function createSchema() {
    if (await Database.schema.hasTable(tableName)) {
        return;
    }

    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await Database.schema.createTable(tableName, (table) => {
        table.increments('Id').primary();
        table.string('Name').notNullable();
        table.decimal('Price', 8, 2).notNullable();
        table.datetime('UpdateDate');
    });
}

createSchema();

export default Product;
