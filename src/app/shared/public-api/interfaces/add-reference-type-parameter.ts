import { IAddNodeParameter } from './add-node-parameter.interface';

export interface IAddReferenceTypeParameter extends IAddNodeParameter {
  isAbstract: boolean;
  inverseName: string;
  symmetric: boolean;
}
