// import * as Blockly from "blockly";

// export default class FieldLedMatrix extends Blockly.Field {
//     constructor(value, validator) {
//         super(value || '000000000000000000000000000000', validator);
//         this.SERIALIZABLE = true;
//     }

//     // Required method - returns the size of the field
//     getSize() {
//         return new Blockly.utils.Size(140, 110);
//     }

//     // Create the DOM elements for the field
//     initView() {
//         this.createView_();
//     }

//     createView_() {
//         // Create SVG group for the matrix
//         this.fieldGroup_ = Blockly.utils.dom.createSvgElement('g', {}, null);
//         this.rects_ = [];

//         const cellSize = 16;
//         const gap = 2;
//         const rows = 5;
//         const cols = 6;

//         // Create the LED matrix grid
//         for (let row = 0; row < rows; row++) {
//             for (let col = 0; col < cols; col++) {
//                 const index = row * cols + col;
//                 const x = col * (cellSize + gap) + gap;
//                 const y = row * (cellSize + gap) + gap;

//                 const rect = Blockly.utils.dom.createSvgElement('rect', {
//                     'x': x,
//                     'y': y,
//                     'width': cellSize,
//                     'height': cellSize,
//                     'rx': 2,
//                     'fill': this.isLedOn_(index) ? '#FF4444' : '#DDDDDD',
//                     'stroke': '#999999',
//                     'stroke-width': 1,
//                     'style': 'cursor: pointer;'
//                 }, this.fieldGroup_);

//                 // Add click handler to each rectangle
//                 rect.addEventListener('mousedown', (e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     this.toggleLed_(index);
//                 });

//                 this.rects_[index] = rect;
//             }
//         }

//         this.updateAppearance_();
//     }

//     // Check if a specific LED should be on
//     isLedOn_(index) {
//         const value = this.getValue();
//         return value && value[index] === '1';
//     }

//     // Toggle a specific LED
//     toggleLed_(index) {
//         const currentValue = this.getValue() || '000000000000000000000000000000';
//         const bits = currentValue.split('');
//         bits[index] = bits[index] === '1' ? '0' : '1';
//         this.setValue(bits.join(''));
//     }

//     // Update the visual appearance
//     updateAppearance_() {
//         if (!this.rects_) return;

//         this.rects_.forEach((rect, index) => {
//             const isOn = this.isLedOn_(index);
//             rect.setAttribute('fill', isOn ? '#FF4444' : '#DDDDDD');
//         });
//     }

//     // Override setValue to update appearance
//     setValue(newValue) {
//         const oldValue = this.getValue();
//         if (oldValue === newValue) return;

//         super.setValue(newValue);
//         this.updateAppearance_();

//         // Fire change event
//         if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
//             Blockly.Events.fire(new Blockly.Events.BlockChange(
//                 this.sourceBlock_, 'field', this.name_, oldValue, newValue
//             ));
//         }
//     }

//     // Get the SVG root element
//     getSvgRoot() {
//         return this.fieldGroup_;
//     }

//     // Clean up
//     dispose() {
//         if (this.fieldGroup_) {
//             Blockly.utils.dom.removeNode(this.fieldGroup_);
//         }
//         super.dispose();
//     }

//     // For serialization
//     saveState() {
//         return this.getValue();
//     }

//     loadState(state) {
//         this.setValue(state);
//     }
// }

// // Register the field
// Blockly.fieldRegistry.register('field_led_matrix', FieldLedMatrix);
