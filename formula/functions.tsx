import { FunctionOperation } from "./formula";
import * as ADD from "./functions/ADD";
import * as AND from "./functions/AND";
import * as BOOLEAN from "./functions/BOOLEAN";
import * as CEILING from "./functions/CEILING";
import * as CONCAT from "./functions/CONCAT";
import * as COUNT from "./functions/COUNT";
import * as DIVIDE from "./functions/DIVIDE";
import * as EQ from "./functions/EQ";
import * as FILTER from "./functions/FILTER";
import * as FIND from "./functions/FIND";
import * as FLOOR from "./functions/FLOOR";
import * as FROM_ENTRIES from "./functions/FROM_ENTRIES";
import * as ID from "./functions/ID";
import * as IF from "./functions/IF";
import * as INCLUDES from "./functions/INCLUDES";
import * as JOIN from "./functions/JOIN";
import * as LIST from "./functions/LIST";
import * as LOWER from "./functions/LOWER";
import * as MAP from "./functions/MAP";
import * as MINUS from "./functions/MINUS";
import * as MOD from "./functions/MOD";
import * as MULTIPLY from "./functions/MULTIPLY";
import * as NEQ from "./functions/NEQ";
import * as NOT from "./functions/NOT";
import * as NUMBER from "./functions/NUMBER";
import * as OR from "./functions/OR";
import * as RANGE from "./functions/RANGE";
import * as REDUCE from "./functions/REDUCE";
import * as ROUND from "./functions/ROUND";
import * as SPLIT from "./functions/SPLIT";
import * as SQRT from "./functions/SQRT";
import * as STRING from "./functions/STRING";
import * as SUBSTRING from "./functions/SUBSTRING";
import * as SUM from "./functions/SUM";
import * as UPPER from "./functions/UPPER";

export const functions: Record<
  string,
  {
    template: FunctionOperation;
    resolver: (f: FunctionOperation, input: any) => any;
    getArgumentInputData?: (
      f: FunctionOperation,
      argIndex: number,
      input: any
    ) => any;
  }
> = {
  ADD,
  AND,
  BOOLEAN,
  CEILING,
  CONCAT,
  COUNT,
  DIVIDE,
  EQ,
  FILTER,
  FIND,
  FLOOR,
  FROM_ENTRIES,
  ID,
  IF,
  INCLUDES,
  JOIN,
  LIST,
  LOWER,
  MAP,
  MINUS,
  MOD,
  MULTIPLY,
  NEQ,
  NOT,
  NUMBER,
  OR,
  RANGE,
  REDUCE,
  ROUND,
  SPLIT,
  SQRT,
  STRING,
  SUBSTRING,
  SUM,
  UPPER,
};
