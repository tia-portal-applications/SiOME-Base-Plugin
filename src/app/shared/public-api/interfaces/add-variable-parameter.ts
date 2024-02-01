import { IAddNodeParameter } from './add-node-parameter.interface';

export interface IAddVariableParameter extends IAddNodeParameter {
  typeDefinition: string;
  dataType: string;
}
