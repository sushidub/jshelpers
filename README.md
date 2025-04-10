# jshelprs

A set of ESM formatted vanilla Javascript functions (WIP) intended to work with most modern browser api's.

---
*Usage as an ES module:*

```javascript
import { function_name } from '<path to>/jshelprs.js'
import { constant_name } from '<path to>/jshelprs.js'
import { * } from '<path to>/jshelprs.js'
```
---

## Functions
`Array_Difference`<br>
`Array_Intersection`<br>
`Array_Unique`<br>
`Class_Change`<br>
`Convert_Hex_To_HSL`<br>
`Convert_Hex_To_RGB`<br>
`Convert_Odd_To_Even`<br>
`Convert_RGB_To_HSL`<br>
`Convert_Transform_To_Matrix`<br>
`Convert_Unix_Time`<br>
`Copy_Array_Values`<br>
`Copy_To_Clipboard`<br>
`Create_Aspect_Ratio`<br>
`Create_New_Element`<br>
`CSS_To_Matrix`<br>
`DB`<br>
`Debounce`<br>
`DOM_Parser`<br>
`Fetch_Resource`<br>
`Find_Templates`<br>
`Get_All_Tabbable`<br>
`Get_Last_String_Part`<br>
`Get_Media_Query_Size`<br>
`Get_Rando_Num`<br>
`Get_Window_Size`<br>
`Is_Divisible`<br>
`Is_Empty_Object`<br>
`Iterate`<br>
`JSON_Prettify`<br>
`KebabClass`<br>
`Make_Querable_Promise`<br>
`Matrix_To_CSS`<br>
`NodeDevMode`<br>
`Parse`<br>
`Parse_String_As_Props`<br>
`Print_Object_State`<br>
`Random_Int_Between`<br>
`Replacer`<br>
`Report_Error`<br>
`Reviver`<br>
`Round_Precision`<br>
`Set_Styles`<br>
`Size_To_Text`<br>
`Sort_By`<br>
`Storage_Test`<br>
`Strip`<br>
`To_CamelCase`<br>
`To_DropCap`<br>
`To_InitialCaps`<br>
`Toggle_Fullscreen`<br>
`Trigger_Event`<br>
`Type_Exception`<br>
`TypeOf_Object`<br>
`Validate_String_As`<br>
`Wait_For_AnimationEnd`<br>
`Wait_For_Display`<br>
`Wait_For_TransitionEnd`<br>
`Wrangle_Number`

## Constants
`debug`<br>
*style your `console.log` statements for distinguishing 'at-a-glance' the various arguments passed in*

```js
console.log('%c my event properties', debug.event);
// where %c initiates the start of the context style passed in with the debug argument i.e. debug.event
```
<details>
  <summary>debug property types</summary>
  #### context properties
  `alert: 'font-size:1rem;color:#D35400;'`<br>
  `args: 'font-size:0.65rem;color:#E67E22;'`<br>
  `standout: 'font-size:1.5rem;color:yellow;'`<br>
  `light: 'font-size:0.65rem;color:#94A5A6;'`<br>
  `small: 'font-size: 0.65rem;'`<br>
  `large: 'font-size: 1rem;'`<br>
  `modal: 'color:green;font-size:0.5rem;'`<br>
  `event: 'font-size: 0.65rem;color:#16A085;'`<br>
  `ui: 'font-size: 0.65rem;color:#F1C40F;'`<br>
  `fn: 'font-size:0.65rem;color:#94A5A6;'`<br>
  `message: 'font-size: 0.65rem;color:#9B59B6;'`<br>
  `xhr: 'font-size: 0.65rem;color:#F1C40F'`<br>
  `log: 'font-size: 0.65rem;color: #E67E22;'`<br>
  #### color properties
  `orange: 'color: #E67E22;'`<br>
  `green: 'color: #2ECC71;'`<br>
  `yellow: 'color: #F1C40F;'`<br>
  `red: 'color: #C0392C;'`<br>
  `purple: 'color: #9B59B6;'`<br>
  #### object methods
  `format: (...props) // where props can be any combination of the context and/or color properties e.g. format('small','orange')`

</details>

`CODES_US_STATES`

