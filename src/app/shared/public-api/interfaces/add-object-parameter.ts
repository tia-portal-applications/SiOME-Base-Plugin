import { IAddNodeParameter } from './add-node-parameter.interface';

export interface IAddObjectParameter extends IAddNodeParameter {
  typeDefinition: string;
}
