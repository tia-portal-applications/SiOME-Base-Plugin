import { AttributeId } from "../enums/attribute-ids";

export interface IBaseAttributeData {
  attributeId: AttributeId;
  name: string;
  value: any;
}
