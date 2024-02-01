export interface ITiaNode {
  readonly name: string;
  readonly children: ITiaNode[];
  readonly childrenNames: string[];
  readonly datatype: string;
  readonly dbAccessibleFromOPCUA: boolean;
  readonly isArrayDb: boolean;
  readonly isConsistent: boolean;
  readonly isConstantPlcTag: boolean;
  readonly isDB: boolean;
  readonly isInstanceDb: boolean;
  readonly isMethod: boolean;
  readonly isVariable: boolean;
  readonly mapping: string;
  readonly offset: string;
}
