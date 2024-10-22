
import { SqlDatabase } from "langchain/sql_db";
import { configDotenv } from "dotenv";
configDotenv();
import { DataSource } from "typeorm";

const datasource = new DataSource({
    type: "postgres",
    url: process.env.POSTGRESS_URL,

});
export const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});

export const getAllTables = () =>{
    return db.allTables.map((t) => t.tableName);
}

/**
[
  'Album',       'Artist',
  'Customer',    'Employee',
  'Genre',       'Invoice',
  'InvoiceLine', 'MediaType',
  'Playlist',    'PlaylistTrack',
  'Track'
]
 */