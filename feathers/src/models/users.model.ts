// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'users';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema(
    {
      name: { type: String, require: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },
      pic: {
        type: String,
        default: 'https://avatars.githubusercontent.com/u/86820380?s=400&u=b41c1ce0824526093b57ef4afcd6a3a7193cfd64&v=4'
      },
    },
    { timestamps: true }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
