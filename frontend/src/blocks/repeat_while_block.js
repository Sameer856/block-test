import * as Blockly from "blockly";


Blockly.Blocks["repeat_while"] = {
    init: function () {
        this.appendDummyInput()
          .appendField("repeat")
          .appendField(
            new Blockly.FieldDropdown([
              ["as long as", "AS_LONG_AS"],
              ["up", "UP"],
             
            ]),"DIRECTION"
          ) // This is a FIELD (use getFieldValue)
    
        this.appendValueInput("MICROS") // This is a VALUE INPUT (use valueToCode)
          .setCheck("Number");

          this.appendStatementInput("DO") // ALLOWS NESTING BLOCKS INSIDE
          .setCheck(null)
          .appendField("");
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Control servo with microsecond pulses (500-2500μs)");
      },
    };
  

  
