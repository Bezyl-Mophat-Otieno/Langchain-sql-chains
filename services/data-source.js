import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";

const datasource = new DataSource({
    type: "postgres",
    url: "postgres://default:V7yIDGSh5Enc@ep-billowing-term-a46ae1lv-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"

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