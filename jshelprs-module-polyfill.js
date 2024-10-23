/*!
 * module jshelprs <https://github.com/sushidub/jshelprs>
 *
 * Copyright (c) 2020, Jeremy Graston.
 * Licensed under the MIT License.
 */

console.info("jshelprs.js");

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global;

  // Set up jshelprs appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global jshelprs.
      root.jshelprs = factory(root, exports);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    factory(root, exports);

  // Finally, as a browser global.
  } else {
    root.jshelprs = factory(root, {});
  }

})(function(root, jshelprs) {

  const debug = {
    alert: 'font-size:1rem;color:#D35400;',
    args: 'font-size:0.65rem;color:#E67E22;',
    standout: 'font-size:1.5rem;color:yellow;',
    light: 'font-size:0.65rem;color:#94A5A6;',
    small: 'font-size: 0.65rem;',
    large: 'font-size: 1rem;',
    modal: 'color:green;font-size:0.5rem;',
    event: 'font-size: 0.65rem;color:#16A085;',
    ui: 'font-size: 0.65rem;color:#F1C40F;',
    fn: 'font-size:0.65rem;color:#94A5A6;',
    message: 'font-size: 0.65rem;color:#9B59B6;',
    xhr: 'font-size: 0.65rem;color:#F1C40F',
    log: 'font-size: 0.65rem;color: #E67E22;',

    // colors
    orange: 'color: #E67E22;',
    green: 'color: #2ECC71;',
    yellow: 'color: #F1C40F;',
    red: 'color: #C0392C;',
    purple: 'color: #9B59B6;',
    format: function(...props) {
      let formatting = '';
      props.forEach((prop) => {
        formatting = formatting + debug[prop];
      });
      return formatting;
    }
  };

  const CODES_US_STATES = [
    { "code": "AL", "name": "Alabama" },
    { "code": "AK", "name": "Alaska" },
    { "code": "AZ", "name": "Arizona" },
    { "code": "AR", "name": "Arkansas" },
    { "code": "CA", "name": "California" },
    { "code": "CO", "name": "Colorado" },
    { "code": "CT", "name": "Connecticut" },
    { "code": "DE", "name": "Delaware" },
    { "code": "DC", "name": "District Of Columbia" },
    { "code": "FL", "name": "Florida" },
    { "code": "GA", "name": "Georgia" },
    { "code": "HI", "name": "Hawaii" },
    { "code": "ID", "name": "Idaho" },
    { "code": "IL", "name": "Illinois" },
    { "code": "IN", "name": "Indiana" },
    { "code": "IA", "name": "Iowa" },
    { "code": "KS", "name": "Kansas" },
    { "code": "KY", "name": "Kentucky" },
    { "code": "LA", "name": "Louisiana" },
    { "code": "ME", "name": "Maine" },
    { "code": "MD", "name": "Maryland" },
    { "code": "MA", "name": "Massachusetts" },
    { "code": "MI", "name": "Michigan" },
    { "code": "MN", "name": "Minnesota" },
    { "code": "MS", "name": "Mississippi" },
    { "code": "MO", "name": "Missouri" },
    { "code": "MT", "name": "Montana" },
    { "code": "NE", "name": "Nebraska" },
    { "code": "NV", "name": "Nevada" },
    { "code": "NH", "name": "New Hampshire" },
    { "code": "NJ", "name": "New Jersey" },
    { "code": "NM", "name": "New Mexico" },
    { "code": "NY", "name": "New York" },
    { "code": "NC", "name": "North Carolina" },
    { "code": "ND", "name": "North Dakota" },
    { "code": "OH", "name": "Ohio" },
    { "code": "OK", "name": "Oklahoma" },
    { "code": "OR", "name": "Oregon" },
    { "code": "PA", "name": "Pennsylvania" },
    { "code": "RI", "name": "Rhode Island" },
    { "code": "SC", "name": "South Carolina" },
    { "code": "SD", "name": "South Dakota" },
    { "code": "TN", "name": "Tennessee" },
    { "code": "TX", "name": "Texas" },
    { "code": "UT", "name": "Utah" },
    { "code": "VT", "name": "Vermont" },
    { "code": "VA", "name": "Virginia" },
    { "code": "WA", "name": "Washington" },
    { "code": "WV", "name": "West Virginia" },
    { "code": "WI", "name": "Wisconsin" },
    { "code": "WY", "name": "Wyoming" }
  ];

  const Array_Difference = function Array_Difference(arr1, arr2) {
    if (typeof arr1 !== "object" || typeof arr2 !== "object") {
      console.warn("Both arguements need to be arrays", arr1, arr2);
      return false;
    }

    const t = arr1.concat(arr2);
    const diff = [];

    t.forEach(v => {

      let idx = t.indexOf(v) + 1;
      let s = t.slice(idx);

      // if s includes v = commonalities
      // if s does not include v = differences
      if (!diff.includes(v) && !s.includes(v)) {
        diff.push(v);
      }

    });

    return diff;
  }

  const Array_Intersection = function Array_Intersection(arr1, arr2) {

    if (typeof arr1 !== "object" || typeof arr2 !== "object") {
      console.warn("Both arguements need to be arrays", arr1, arr2);
      return false;
    }

    const t = arr1.concat(arr2);
    const intersection = [];

    t.forEach(v => {

      let idx = t.indexOf(v) + 1;
      let s = t.slice(idx);

      // if s includes v = commonalities
      // if s does not include v = differences
      if (!intersection.includes(v) && s.includes(v)) {
        intersection.push(v);
      }

    });

    return intersection;
  }

  const Array_Unique = function Array_Unique(arr1, arr2) {
    if (typeof arr1 !== "object" || typeof arr2 !== "object") {
      console.warn("Both arguements need to be arrays", arr1, arr2);
      return false;
    }

    const uniq = [];

    arr1.forEach(v => {
      if (!uniq.includes(v) && !arr2.includes(v)) {
        uniq.push(v);
      }
    });

    return uniq;
  }

  const Debounce = function Debounce(period, callback) {
    if (typeof period !== "number") return false;
    setTimeout(() => {return callback()}, period);
    // underscores version of debounce (using as reference)
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    // _.debounce = function(func, wait, immediate) {
    //   var timeout, args, context, timestamp, result;

    //   var later = function() {
    //     var last = _.now() - timestamp;

    //     if (last < wait && last >= 0) {
    //       timeout = setTimeout(later, wait - last);
    //     } else {
    //       timeout = null;
    //       if (!immediate) {
    //         result = func.apply(context, args);
    //         if (!timeout) context = args = null;
    //       }
    //     }
    //   };

    //   return function() {
    //     context = this;
    //     args = arguments;
    //     timestamp = _.now();
    //     var callNow = immediate && !timeout;
    //     if (!timeout) timeout = setTimeout(later, wait);
    //     if (callNow) {
    //       result = func.apply(context, args);
    //       context = args = null;
    //     }

    //     return result;
    //   };
    // };
  }

  const Class_Change = function Class_Change(ele, mthd, str) {
    if (ele instanceof HTMLElement) {
      ele.classList[mthd](str);
    } else if (ele instanceof HTMLCollection || ele instanceof Array) {
      ele.forEach(elem => elem.classList[mthd](str));
    }

    return ele;
  }

  const Convert_Hex_To_RGB = function Convert_Hex_To_RGB(h) {
    // ref: https://css-tricks.com/converting-color-spaces-in-javascript/
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];

    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return "rgb("+ +r + "," + +g + "," + +b + ")";
  }

  const Convert_Hex_To_HSL = function Convert_Hex_To_HSL(hex) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];

    // 6 digits
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }

    // Start conversion to HSL
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  const Convert_Odd_To_Even  = function Convert_Odd_To_Even (num) {
    return Number.isInteger(num / 2) ? num : num - 1;
  }

  const Convert_RGB_To_HSL = function Convert_RGB_To_HSL(r, g, b) {
    // ref: https://css-tricks.com/converting-color-spaces-in-javascript/

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";

  }

  const Convert_Transform_To_Matrix  = function Convert_Transform_To_Matrix (css) {

    var matrix_values = css.slice(css.indexOf("(") + 1, css.indexOf(")"));
    matrix_values = matrix_values.split(/,\s/);

    return {
      "scale": parseFloat(matrix_values[0]),
      "translateX": parseInt(matrix_values[4], 10),
      "translateY": parseInt(matrix_values[5], 10)
    };

  }

  const Convert_Unix_Time = function Convert_Unix_Time(timestamp) {
    if ( ! timestamp ) return null;
    return new Date(timestamp * 1000).toLocaleString();
  }

  const Copy_Array_Values = function Copy_Array_Values(srcArray) {
    // via: https://www.dyn-web.com/javascript/arrays/value-vs-reference.php
    // create empty array to hold copy
    const valueArray = [];

    for (let i = 0, len = srcArray.length; i < len; i++) {
      // empty object to hold properties added below
      valueArray[i] = {};
      for (let prop in srcArray[i]) {
        // copy properties from srcArray to valueArray
        valueArray[i][prop] = srcArray[i][prop];
      }
    }

    return valueArray;
  }

  const Copy_To_Clipboard = function Copy_To_Clipboard(copyTarget) {
    if ( ! copyTarget ) {
      console.warn('Copy_To_Clipboard expects one parameter consisting of target DOM node');
      return false;
    }

    this.addEventListener('click', (e) => {
      
      navigator.clipboard.writeText(copyTarget).then(
        () => {
          console.info('Copied to clipboard');
          e.target.textContent = 'copied';
        },
        () => {
          console.info('Copied to clipboard failed');
          e.target.textContent = 'copy fail';
        },
      );

      let timeoutID;
      timeoutID = window.setTimeout(() => {
        window.clearTimeout(timeoutID);
        e.target.textContent = 'clipboard';
        return;
      }, 2000);

    });
  }

  const Create_Aspect_Ratio = function Create_Aspect_Ratio(w, h) {
    // w = w % 2 === 0 ? w : this.Convert_Odd_To_Even(w);
    // h = h % 2 === 0 ? h : this.Convert_Odd_To_Even(h);
    const ratio = {};
    let new_w = Math.round(w);
    let new_h = Math.round(h);
    let multiplier = 2;
    let control = Number(Math.min(new_h, new_w));

    (function iterate() {
      if ( this.Is_Divisible(control, multiplier) ) {
        // console.log('control: %i\tmultiplier: %i\n\n', control, multiplier);
        if ( this.Is_Divisible(this.Array_Unique([new_w, new_h], [control]), multiplier) ) {
          new_w = new_w / multiplier;
          new_h = new_h / multiplier;
          control = Number(Math.min(new_w, new_h));
          multiplier = 2;
          iterate.call(this);
        }
      }

      // optional test multiplier (testing javascript stack limits): (control / 2)
      if (multiplier === 9) {
        return;
      } else {
        multiplier++;
        iterate.call(this);
      }
    }.bind(this))();

    ratio.w = new_w;
    ratio.h = new_h;
    ratio.d = Math.round((control / this.Array_Unique([new_w, new_h], [control])) * 100);  // percentage difference

    return ratio;
  }

  const Create_New_Element = function Create_New_Element(type, attrObj) {
    const el = document.createElement(type);
    if (attrObj) {
      Object.entries(attrObj).forEach((attr) => {
        if (attr[1]) {
          if (typeof attr[1] === "boolean") {
            el.setAttribute([attr[0]], "");
          } else {
            el.setAttribute([attr[0]], attr[1]);
          }
        }
      });
    }
    return el;
  }

  const CSS_To_Matrix  = function CSS_To_Matrix (translateX, translateY, scale) {
    scale = parseFloat(scale) || 1;

    var matrixObj = "matrix(" + scale + ", 0, 0, " + scale + ", " + parseInt(translateX, 10) + ", " + parseInt(translateY, 10) + ")";

    return matrixObj;

  }

  const Find_Templates = function Find_Templates(map) {
    const templates = {};

    (function looper(targetNode) {
      targetNode = targetNode || document;
      targetNode.querySelectorAll('[data-template]').forEach((node) => {
        const placeHolder = node.dataset.template;
        templates[placeHolder] = node;

        if (node.content.querySelector('[data-template]')) {
          looper(node.content);
        }
      });
    })();

    if (map) {
      map._templatesMap.forEach((val, key) => {
        let frag = document.createRange().createContextualFragment('<template>' + val + '</template>').firstElementChild;
        templates[key] = frag;
      });
    }

    return templates;
  }

  const Get_All_Tabbable = function Get_All_Tabbable(startNode) {
    console.info('%cfn:Get_All_Tabbable', debug.fn);
  
    const tabbable = [];
  
    function looper(node) {
      Array.from(node.children).forEach((child) => {
        if (child.children.length > 0) {
          looper(child);
        }
        if (child.tabIndex >= 0) {
          tabbable.push(child);
        }
      })
    };
  
    looper(startNode);
  
    return tabbable;
  }

  const Get_Last_String_Part  = function Get_Last_String_Part ( str, char ) {
    // returns everything after the last occurence of 'char'
    var i = str.lastIndexOf(char) + 1;
    return str.slice(i);
  }

  const Get_Media_Query_Size  = function Get_Media_Query_Size ( w, h ) {
    // console.log(int);

    let site_landscape = 415;
    let site_xs = 414;
    let site_sm = 576;
    let site_md = 768;
    let site_lg = 1024;

    w = w || 0;
    h = h || 0;

    if ( w === 0 || h === 0 ) {
      return false;
    } else if ( w <= site_xs ) {
      return 'xs'; // xs: w-414
    } else if ( w > site_xs && w < site_sm ) {
      return 'sm'; // sm: w414-576
    } else if ( w >= site_sm && w < site_md ) {
      return 'md'; // md: w[576]-768
    } else if (w >= site_md && w < site_lg && h <= site_landscape) {
      return 'md'; // md: w[576]-1024 h[-415]
    } else if ( w >= site_md && w < site_lg && h > site_landscape ) {
      return 'lg'; // lg: w[768]-1024 h415~
    } else if ( w >= site_lg ) {
      return 'xl'; // xl: w[1024~]
    } else {
      return false;
    }
  }

  const Get_Rando_Num = function Get_Rando_Num() {
    const cryptoObj = window.crypto || window.msCrypto; // for IE 11
    const num = new Uint32Array(1);
    cryptoObj.getRandomValues(num);
    return num;
  }

  // REFACTOR
  const Get_Window_Size  = function Get_Window_Size () {
    let w = window.innerWidth;
    let h = window.innerHeight;
    return this.Get_Media_Query_Size( w, h );
  }

  const Is_Divisible = function Is_Divisible(num, multiplyBy) {
    return Number.isInteger(num / multiplyBy) ? true : false;
  }

  const Iterate = function Iterate(iterator) {
    let values = [];
    let val = iterator.next();
    while (!val.done) {
      values.push(val.value);
      val = iterator.next();
    }
    return values;
  }

  const JSON_Prettify = function JSON_Prettify(str, ndnt) {
    if (typeof str !== "string") return false;
    if (ndnt && typeof ndnt !== "number") return false;
    const NEWLINE = '\n';
    const DEFAULT_INDENT = ndnt || 2;
  
    try {
      const object = JSON.parse(str);
      const result = JSON.stringify(object, null, DEFAULT_INDENT);
      return result+NEWLINE;
    } catch(err) {
      return `Not valid JSON input: ${err}\n`;
    }
  }

  const KebabClass = function KebabClass(str) {
    return str.toLowerCase().split(" ").join("-");
  }

  const NodeDevMode = function NodeDevMode() {
    if (typeof process === 'object') {
      return process.env.NODE_ENV === "development" ? true : false;
    } else {
      return false;
    }
  }

  const Matrix_To_CSS = function Matrix_To_CSS(obj) {
    if (obj === "null") {
      return "matrix(1,0,0,1,0,0)";
    }

    return "matrix(" + obj.scale + ",0,0," + obj.scale + "," + obj.translateX + "," + obj.translateY + ")";
  }

  const Parse = function Parse(str) {
    const regStripExp = /(&lt;%=.+\((.+)\)\s(?:\{?)\n?(.+)(\n|\n.+|.+?)\}\s=%&gt;)/g;
    let m = regStripExp.exec(str);
    return m;
  }

  const Parse_String_As_Props = function Parse_String_As_Props(str, obj, splitter = '.') {
    let keys = str.split(splitter);
    let accessor = obj;
  
    keys.map(key => {
      if (accessor.hasOwnProperty(key)) {
        accessor = accessor[key];
      }
    });
  
    return accessor;
  }

  const Print_Object_State = function Print_Object_State(obj) {
    let staticObj = JSON.stringify(obj);
    return JSON.parse(staticObj);
  }

  // min & max both inclusive
  const Random_Int_Between = function Random_Int_Between(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rando = Math.floor(Math.random() * (max - min + 1)) + min;
    return rando;
  }

  const Replacer = function Replacer(key, value) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
      };
    } else {
      return value;
    }
    // USAGE:
    // const originalValue = new Map([["a", 1]]);
    // const str = JSON.stringify(originalValue, replacer);

    // DEEP NESTING:
    // const originalValue = [
    //   new Map([["a", {
    //     b: {
    //       c: new Map([["d", "text"]])
    //     }
    //   }]])
    // ];
  }

  const Reviver = function Reviver(key, value) {
    if (typeof value === "object" && value !== null) {
      if (value.dataType === "Map") {
        return new Map(value.value);
      }
    }
    return value;
    // USAGE:
    // const newValue = JSON.parse(str, reviver);
    // console.log(originalValue, newValue);
  }

  const Report_Error  = function Report_Error ( message ) {
    console.error(message);
  }

  const Round_Precision  = function Round_Precision (num, precision) {
    // ex: RoundPrecision( 20.238, 2 )
    // => 20.24
    var multiplier = Math.pow(10, precision);
    return Math.round(num * multiplier) / multiplier;
  }

  const Set_Styles = function Set_Styles(elem, props) {
    if (typeof props !== "object") {
      console.warn("Props argument needs to be an object, e.g: { <ILE CSS Property>: <value><units> }");
      return false;
    }

    Object.entries(props).forEach((prop) => {
      elem.style[prop[0]] = prop[1];
    });

    return true;
  }

  const Size_To_Text = function Size_To_Text(ele, scale) {
    scale = scale || parseInt(window.getComputedStyle(ele).getPropertyValue("font-size").slice(0, -2));
    const str = ele.value;
    // console.log("string: %s\nchar: %d\nscale: %d\nchar/scale: %d", str, str.length, scale, str.length * (scale/2));

    ele.style.width = (str.length * (scale/2)) + "px";
    return true;
  }

  const Sort_By  = function Sort_By (arr, type, prop, order) {
    // console.log("arr: %O\ntype: %s\nprop: %s\norder: %s", arr, type, prop, order);

    if (typeof arr !== "object") {
      console.error("Paramter one should either be an array or an object list that can be converted to one.");
      return false;
    }

    type = type || "";      // string, ('num','str') defines what data type to wrangle from the 'a' and 'b' params, defaults to string
    prop = prop || null;    // string, refers to the object property each item in the arr list should be compared against
    order = order || "asc";  // string, ('asc','desc') defines the desired order to return results

    const wrangleType = function wrangleType(thing) {
      if (type === String || type === "string" || type === "str" || type === "") {
        return thing.toUpperCase(); // ignores upper and lowercase
      } else if (type === "int" || type === "integer") {
        return parseInt(thing, 10); // ignores upper and lowercase
      } else if (type === Number || type === "float" || type === "number" || type === "num") {
        return parseFloat(thing);
      } else if (type === Boolean || type === "boolean") {
        return parseInt(thing);
      } else if (type === Date || type === "date") {
        return thing;
      } else {
        console.warn('Paramter "type" needs to be a string that refers to expected data type being sorted.\nTry passing in something readable like: "string", or "number"');
        return false;
      }
    }

    switch (order) {

      case "asc":

        arr.sort(function (a, b) {
          let thing_a, thing_b;

          if (a instanceof Array) {
            // a and b are most likely Object.entries arrays
            // which means the key is a[0], and value is a[1]
            thing_a = wrangleType(a[1][prop]);
            thing_b = wrangleType(b[1][prop]);
          } else {
            thing_a = wrangleType(a[prop]);
            thing_b = wrangleType(b[prop]);
          }

          if (thing_a < thing_b) {
            return -1;
          }

          if (thing_a > thing_b) {
            return 1;
          }

          return 0;     // thing_a and thing_b must be equal at this point

        });

        return arr;

      case "dsc":

        arr.sort(function (a, b) {
          let thing_a, thing_b;

          if (a instanceof Array) {
            // a and b are most likely Object.entries arrays
            // which means the key is a[0], and value is a[1]
            thing_a = wrangleType(a[1][prop]);
            thing_b = wrangleType(b[1][prop]);
          } else {
            thing_a = wrangleType(a[prop]);
            thing_b = wrangleType(b[prop]);
          }

          if (thing_a > thing_b) {
            return -1;
          }

          if (thing_a < thing_b) {
            return 1;
          }

          return 0;     // thing_a and thing_b must be equal at this point

        });

        return arr;
    }

  }

  const Storage_Test  = function Storage_Test (type) {
    try {
      var storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  const Strip = function Strip(obj) {
    // usage:
    // NOTE: assumes all nodes with 'data-template' attributes are collected/stored
    // under one 'templates' object on page load
    //
    //  -----------------JS---------------------
    //  const myTemplateObject = {
    //    template: templates.myTemplate.content.cloneNode(true).children[0]
    //    name: 'My Template'
    //    description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.'
    //    total: 20
    //  });
    //  -----------------HTML--------------------
    //  <template data-template="myTemplate">
    //    <article>
    //      <h5>{{name}}</h5>
    //      <p>{{description}}</p>
    //      <span>Total Comments: {{total}}</span>
    //    </article>
    //  </template>
    //
    const el = obj.template;
    let matches = new Map();
    const regStripCurly = /(\{\{(.+?)\}\})/g;
    const regStartExp = /(&lt;%=)/g;
    const regStripExp = /(&lt;%=.+(\n|.+).+(\n|.+).+=%&gt;)/g;
    let outerHTML = el.outerHTML;
    let operation;
    let parsed;
    if (outerHTML) {
      let expressions = outerHTML.match(regStripExp);
      if (expressions) {
        expressions.forEach((exp) => {
          parsed = this.Parse(exp);
          if (!obj[parsed[2]]) {
            outerHTML = outerHTML.replace(exp, "");
          } else {
            outerHTML = outerHTML.replace(exp, parsed[3]);
          }
        });
      }
      if (outerHTML.match(regStripCurly)) {
        outerHTML.match(regStripCurly).forEach((m) => {
          let v = m.substring(2, m.length - 2);

          if (v.indexOf(".") !== -1) {
            v = v.split(".");

            let clue = Object.assign({}, obj);
            let suspect = "";

            looper:
            for (let val of v) {
              if (clue.hasOwnProperty(val)) {
                clue = clue[val];
                suspect = clue;
                continue looper;
              } else {
                break looper;
              }
            }

            v = suspect;
            clue = null;
          } else if (v.indexOf("-") !== -1) {
            let s = v.split("-");
            let _v;   // so we can potentially assign v to v (workaround eslint rule: 'no-self-assign')
            operation = s[1];
            switch (s[1]) {
              case "lowercase":
                v = obj[s[0]].toLowerCase();
                break;
              default:
                _v = v;
                v = _v;
                break;
            }
          } else {
            v = obj[v];
          }

          if (v) {
            matches.set(m, v);
          } else {
            matches.set(m, "");
          }

        });

        matches.forEach((val, key) => {
          const re = new RegExp(key, "g");
          outerHTML = outerHTML.replace(re, val);
        });
        let newOuterHTML = document.createRange().createContextualFragment(outerHTML);
        return newOuterHTML.children[0];
      } else {
        return el;
      }
    }
  }

  const To_CamelCase = function To_CamelCase(str) {
    let a = [];
    let n;

    if (str.indexOf("-") !== -1) {
      n = str.split("-");
    } else if (str.indexOf(" ") !== -1) {
      n = str.split(" ");
    } else if (str.indexOf("%") !== -1) {
      let sl = str.slice(str.indexOf("%"), (str.indexOf("%") + 3));
      //console.log(sl);
      n = str.split(sl);
    } else {
      n = [str];
    }

    a.push(n[0].toLowerCase());
    for (let i=1; i <= n.length - 1; i++) {
      let s = Array.from(n[i]);
      s.unshift(s.shift().toUpperCase());
      a.push(s.join(""));
    }

    return a.join("").toString();
  }

  const Toggle_Fullscreen = function Toggle_Fullscreen(el) {
    el = el || document.body;

    const fsPrefixer = {
      "requestFullscreen": ["requestFullscreen", "webkitRequestFullScreen"],
      "fullscreenEnabled": ["fullscreenEnabled", "webkitFullscreenEnabled"],
      "exitFullscreen": ["exitFullscreen", "webkitExitFullscreen"],
      "fullscreenElement": ["fullscreenElement", "webkitFullscreenElement"]
    };

    let prefixIndex = el.requestFullscreen === undefined ? 1 : 0;
    console.info("prefixIndex", prefixIndex);

    if (!document[fsPrefixer.fullscreenElement[prefixIndex]]) {
      console.info("Entering fullscreen");
      el[fsPrefixer.requestFullscreen[prefixIndex]]();
    } else {
      console.info("Exiting fullscreen");
      document[fsPrefixer.exitFullscreen[prefixIndex]]();
    }
  }

  const Trigger_Event = function Trigger_Event(eventType, options) {
    switch (eventType) {
      case 'click':
        return new MouseEvent('click', Object.assign({
          view: window,
          bubbles: true,
          cancelable: true,
          detail: details
        }, options));
      default:
        return this.dispatchEvent(new CustomEvent(eventType, options));
    }
  }

  const TypeOf_Object = function TypeOf_Object(obj) {
    if (typeof obj !== "object") {
      console.warn("TypeOf_Object argument must be an Array, Map, or Object");
      return false;
    } else if (obj instanceof Array) {
      console.info("TypeOf_Object: Array");
      return "array";
    } else if (obj instanceof Map) {
      console.info("TypeOf_Object: Map");
      return "map";
    } else {
      console.info("TypeOf_Object: Object");
      return "object";
    }
  }

  const Wait_For_AnimationEnd = function Wait_For_AnimationEnd(el, cb, ...options) {
    el.addEventListener("animationend", function anime(e) {
      // console.log("animationend", e);
      if (e.target !== el) {
        return false;
      } else if (options['prop'] && e.propertyName !== options['prop']) {
        return false;
      }
      this.removeEventListener("animationend", anime, false);
      return cb();
    }, false);
  }

  // use this when animating an element whose display property is set to none
  // ex: foo = hidden element to animate
  // foo.hidden = false;
  // Wait_For_Display(() => { foo.classList.add('fade-in') })
  //
  const Wait_For_Display = function Wait_For_Display(cb) {
    let waitTimeout;
    waitTimeout = window.setTimeout(function() {
      cb();
      window.clearTimeout(waitTimeout);
    }, 0);
  }

  const Wait_For_TransitionEnd = function Wait_For_TransitionEnd(el, cb, ...options) {
    el.addEventListener("transitionend", function anime(e) {
      // console.log("transitionend", e);
      if (e.target !== el) {
        return false;
      } else if (options['prop'] && e.propertyName !== options['prop']) {
        return false;
      }
      this.removeEventListener("transitionend", anime, false);
      return cb();
    }, false);
  }

  const Fetch_Resource = function Fetch_Resource(uri = '', data = {}, handler, useFetch = true) {
    console.info('%c--------Fetch_Resource--------\nuri: %s\ndata: %O', debug.fn, uri, data);

    if (useFetch && self.fetch) {
      // console.log('%cfetch is supported. using fetch', debug.small);
      fetch(uri, data)
        .then(function(response) {
          // console.log('%cresponse: %O', debug.event, response);
          return handler(response);
        });
        // .then(function(response) {
        //   console.log('%cresponse: %O', debug.event, response);
        //   return handler(response);
        // });
    } else {
        // use a XMLHttpRequest here
      // console.log('%cfetch not supported\n%cusing XMLHttpRequest: %O', debug.alert, debug.small);
      let xmlhttp;
      xmlhttp = new XMLHttpRequest();
      if (uri instanceof Request) uri = uri.url;
      xmlhttp.responseType = 'blob';
      xmlhttp.open(data.method, uri, true);
      // NOTE: When sending FormData objects over xhr (using xhr, not fetch)
      // the current status quo is to leave the Content-Type header completely off
      // as the browser will supply the most appropriate header.
      // This seems to allieviate/avoid the various WebkitBoundary issues
      //
      // xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 2) {
          // console.log('%cspinning...', debug.small);
        }
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // console.log('%cfinished...', debug.small);
          // console.log('%cresponse: %O', debug.event, xmlhttp);
          return handler(xmlhttp);
        }
      };

      xmlhttp.send(null);
    }
  }

  return jshelprs;
});

export {
  debug,
  Array_Difference,
  Array_Intersection,
  Array_Unique,
  Debounce,
  Class_Change,
  Convert_Hex_To_HSL,
  Convert_Hex_To_RGB,
  Convert_Odd_To_Even,
  Convert_RGB_To_HSL,
  Convert_Transform_To_Matrix,
  Copy_Array_Values,
  Create_Aspect_Ratio,
  Create_New_Element,
  CSS_To_Matrix,
  Find_Templates,
  Get_Last_String_Part,
  Get_Media_Query_Size,
  Get_Rando_Num,
  Get_Window_Size,
  Is_Divisible,
  Iterate,
  KebabClass,
  NodeDevMode,
  Matrix_To_CSS,
  Parse,
  Print_Object_State,
  Random_Int_Between,
  Replacer,
  Reviver,
  Report_Error,
  Round_Precision,
  Set_Styles,
  Size_To_Text,
  Sort_By,
  Storage_Test,
  Strip,
  To_CamelCase,
  Toggle_Fullscreen,
  Trigger_Event,
  TypeOf_Object,
  Wait_For_AnimationEnd,
  Wait_For_Display,
  Wait_For_TransitionEnd,
  Fetch_Resource
}
