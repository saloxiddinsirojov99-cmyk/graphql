declare module 'graphql-upload/GraphQLUpload.mjs' {
  import { GraphQLScalarType } from 'graphql';
  const GraphQLUpload: GraphQLScalarType;
  export default GraphQLUpload;
}

declare module 'graphql-upload/graphqlUploadExpress.mjs' {
  import { RequestHandler } from 'express';
  type UploadOptions = {
    maxFieldSize?: number;
    maxFileSize?: number;
    maxFiles?: number;
  };
  export default function graphqlUploadExpress(options?: UploadOptions): RequestHandler;
}

declare module 'graphql-upload/processRequest.mjs' {
  import { ReadStream } from 'fs';
  export type FileUpload = {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => ReadStream;
  };
}
