import arduinoGenerator from "./arduinoGenerator";

arduinoGenerator.forBlock["math_number"] = function (block) {
    const num = block.getFieldValue("NUM");
    return [num, arduinoGenerator.ORDER_ATOMIC];
  };
  


  arduinoGenerator.forBlock["field_angle"] = function (block) {
    const angle = block.getFieldValue("ANGLE") || 0;
    return [angle.toString(), arduinoGenerator.ORDER_ATOMIC];
  };
  
  arduinoGenerator.forBlock["pin_number"] = function (block) {
    const pin = block.getFieldValue("NUM");
    return [pin, arduinoGenerator.ORDER_ATOMIC];
  };
  
  arduinoGenerator.forBlock["math_operator"] = function (block) {
    const valueA = arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_ADDITIVE) || "0";
    const valueB = arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_ADDITIVE) || "0";
    const operator = block.getFieldValue("OP");
  
    let code;
    if (operator === "^") {
      code = `pow(${valueA}, ${valueB})`;
      return [code, arduinoGenerator.ORDER_ATOMIC]; // highest precedence
    } else {
      code = `${valueA} ${operator} ${valueB}`;
      const precedence = (operator === "*" || operator === "/")
        ? arduinoGenerator.ORDER_MULTIPLICATIVE
        : arduinoGenerator.ORDER_ADDITIVE;
  
      return [code, precedence];
    }
  };
  
  arduinoGenerator.forBlock["comparison_operator"] = function (block) {
    const valueA = arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_NONE) || "0";
    const valueB = arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_NONE) || "0";
    const operator = block.getFieldValue("OP");
  
    const code = `${valueA} ${operator} ${valueB}`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  
  arduinoGenerator.forBlock["nested_comparison_operator"] = function (block) {
    const A = arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_NONE) || "0";
    const B = arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_NONE) || "0";
    const C = arduinoGenerator.valueToCode(block, "C", arduinoGenerator.ORDER_NONE) || "0";
  
    const op1 = block.getFieldValue("OP1");
    const op2 = block.getFieldValue("OP2");
  
    const code = `( ${A} ${op1} ${B} ) && ( ${B} ${op2} ${C} )`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };

  arduinoGenerator.forBlock["map_function"] = function (block) {
    const value = arduinoGenerator.valueToCode(block, "VALUE", arduinoGenerator.ORDER_NONE) || "0";
    const fromLow = arduinoGenerator.valueToCode(block, "FROM_LOW", arduinoGenerator.ORDER_NONE) || "0";
    const fromHigh = arduinoGenerator.valueToCode(block, "FROM_HIGH", arduinoGenerator.ORDER_NONE) || "1023";
    const toLow = arduinoGenerator.valueToCode(block, "TO_LOW", arduinoGenerator.ORDER_NONE) || "0";
    const toHigh = arduinoGenerator.valueToCode(block, "TO_HIGH", arduinoGenerator.ORDER_NONE) || "10";
  
    const code = `map(${value}, ${fromLow}, ${fromHigh}, ${toLow}, ${toHigh})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  
  
  arduinoGenerator.forBlock["math_remainder"] = function (block) {
    const value_a = arduinoGenerator.valueToCode(block, "A", arduinoGenerator.ORDER_ATOMIC) || "";
    const value_b = arduinoGenerator.valueToCode(block, "B", arduinoGenerator.ORDER_ATOMIC) || "";
    const code = `(${value_a}) % (${value_b});\n`;
    return code;
  };
  
  arduinoGenerator.forBlock["random_int_block"] = function (block) {
    const from = arduinoGenerator.valueToCode(block, "FROM", arduinoGenerator.ORDER_ATOMIC) || "0";
    const to = arduinoGenerator.valueToCode(block, "TO", arduinoGenerator.ORDER_ATOMIC) || "0";
  
    // Add the random_int helper function once
    arduinoGenerator.addDeclaration(
      "random_int_function",
      `double random_int(int a,int b) {
    if (a > b) {
      int c = a;
      a = b;
      b = c;
    }
    return (double)random(a,b+1);
  }`
    );
  
    const code = `random_int(${from}, ${to})`;
    return [code, arduinoGenerator.ORDER_NONE];
  };
  
  arduinoGenerator.forBlock["constrain_block"] = function (block) {
    const value = arduinoGenerator.valueToCode(block, "VALUE", arduinoGenerator.ORDER_NONE) || "0";
    const low = arduinoGenerator.valueToCode(block, "LOW", arduinoGenerator.ORDER_NONE) || "0";
    const high = arduinoGenerator.valueToCode(block, "HIGH", arduinoGenerator.ORDER_NONE) || "0";
  
    const code = `constrain(${value}, ${low}, ${high})`;
    return [code, arduinoGenerator.ORDER_NONE];
  };
  
  arduinoGenerator.forBlock["math_sqrt_or_abs"] = function (block) {
    const operator = block.getFieldValue("OP");
    const value = arduinoGenerator.valueToCode(block, "NUM", arduinoGenerator.ORDER_NONE) || "0";
  
    let code = "";
    if (operator === "SQRT") {
      code = `sqrt(${value})`;
    } else if (operator === "ABS") {
      code = `abs(${value})`;
    }
  
    return [code, arduinoGenerator.ORDER_NONE];
  };

  arduinoGenerator.forBlock["math_rounding"] = function (block) {
    const operator = block.getFieldValue("OP");
    const value = arduinoGenerator.valueToCode(block, "NUM", arduinoGenerator.ORDER_NONE) || "0";
  
    let code = "";
    switch (operator) {
      case "ROUND":
        code = `round(${value})`;
        break;
      case "CEIL":
        code = `ceil(${value})`;
        break;
      case "FLOOR":
        code = `floor(${value})`;
        break;
    }
  
    return [code, arduinoGenerator.ORDER_NONE];
  };
  
  arduinoGenerator.forBlock["math_tri"] = function(block) {
    const op = block.getFieldValue("OP");
    const num = arduinoGenerator.valueToCode(block, "NUM", arduinoGenerator.ORDER_NONE) || "0";
    let func = "";
  
    switch (op) {
      case "SIN":
        func = "sin";
        break;
      case "COS":
        func = "cos";
        break;
      case "TAN":
        func = "tan";
        break;
    }
  
    return [`${func}(${num})`, arduinoGenerator.ORDER_FUNCTION_CALL];
  };
  
  arduinoGenerator.forBlock["math_constants"] = function(block) {
    const constant = block.getFieldValue("CONST");
    let code;
  
    switch (constant) {
      case "PI":
        code = "PI"; // Arduino has PI defined
        break;
      case "E":
        code = "E"; // Arduino doesn't have E predefined
        break;
      case "PHI":
        code = "1.  (1 + sqrt(5)) / 2"; // Golden ratio
        break;
      case "SQRT2":
        code = "1.41421356237";
        break;
      case "SQRT1_2":
        code = "0.70710678118"; // √(1/2)
        break;
      case "INFINITY":
        code = "INFINITY"; // Arduino defines INFINITY in some contexts
        break;
    }
  
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  

  arduinoGenerator.forBlock["math_number_property"] = function (block) {
    const num = arduinoGenerator.valueToCode(block, "NUM", arduinoGenerator.ORDER_NONE);
    const property = block.getFieldValue("PROPERTY");
  
    let code = "false";
    switch (property) {
      case "EVEN":
        code = `(${num} % 2 == 0)`;
        break;
      case "ODD":
        code = `(${num} % 2 != 0)`;
        break;
      case "POSITIVE":
        code = `(${num} > 0)`;
        break;
      case "NEGATIVE":
        code = `(${num} < 0)`;
        break;
      case "INTEGER":
        code = `(${num} == (int)${num})`;
        break;
      case "DIVISIBLE_BY":
        const divisor = arduinoGenerator.valueToCode(block, "DIVISOR", arduinoGenerator.ORDER_NONE);
        code = `(${num} % ${divisor} == 0)`;
        break;
        case "PRIME":
          arduinoGenerator.addFunction("math_isPrime", `
            bool math_isPrime(int n) {
              if (n == 2 || n == 3) {
                return true;
              }
              if (n <= 1 || n % 2 == 0 || n % 3 == 0) {
                return false;
              }
              for (int x = 6; x <= sqrt(n) + 1; x += 6) {
                if (n % (x - 1) == 0 || n % (x + 1) == 0) {
                  return false;
                }
              }
              return true;
            }
            `);
            
          code = `math_isPrime(${num})`;
          break;
    }        
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  
  arduinoGenerator.forBlock["math_byte"] = function (block) {
    const constant = block.getFieldValue("CONST");
    const codeMap = {
      "PI": "3.141592653589793",
      "E": "2.718281828459045",
      "PHI": "1.618033988749895",
      "SQRT2": "1.4142135623730951",
      "SQRT1_2": "0.7071067811865476",
      "INFINITY": "INFINITY"
    };
    const code = `byte(${codeMap[constant] || "0"})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["unsigned_int"] = function (block) {
    const constant = block.getFieldValue("CONST");
    const codeMap = {
      "PI": "3.141592653589793",
      "E": "2.718281828459045",
      "PHI": "1.618033988749895",
      "SQRT2": "1.4142135623730951",
      "SQRT1_2": "0.7071067811865476",
      "INFINITY": "INFINITY"
    };
    const code = `unsigned int(${codeMap[constant] || "0"})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["int_block"] = function (block) {
    const constant = block.getFieldValue("CONST");
    const codeMap = {
      "PI": "3.141592653589793",
      "E": "2.718281828459045",
      "PHI": "1.618033988749895",
      "SQRT2": "1.4142135623730951",
      "SQRT1_2": "0.7071067811865476",
      "INFINITY": "INFINITY"
    };
    const code = `int(${codeMap[constant] || "0"})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
  arduinoGenerator.forBlock["float_block"] = function (block) {
    const constant = block.getFieldValue("CONST");
    const codeMap = {
      "PI": "3.141592653589793",
      "E": "2.718281828459045",
      "PHI": "1.618033988749895",
      "SQRT2": "1.4142135623730951",
      "SQRT1_2": "0.7071067811865476",
      "INFINITY": "INFINITY"
    };
    const code = `float(${codeMap[constant] || "0"})`;
    return [code, arduinoGenerator.ORDER_ATOMIC];
  };
        
  