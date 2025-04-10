/*!
 * module jshelprs <https://github.com/sushidub/jshelprs>
 * version 2.2
 * Copyright (c) 2024, Jeremy Graston.
 * Licensed under the MIT License.
 * 
 *   2.2 Change Log
 * 
 *   CODES_US_STATES (new array)
 *    list of state name objects whose keys are 'code' (2 letter abbreviation) and state 'name'
 *    e.g. { "code": "CO", "name": "Colorado" }
 * 
 *   Get_All_Tabbable (new method)
 *     starting with the provided DOM element, method uses a forEach iterator to traverse into each of its child elements and index any nested elements with a tab index greater than zero
 *     @param startNode (HTMLElement)
 *     @return array of dom elements whose tab indexes are greater than zero
 * 
 *   Make_Querable_Promise (new method)
 *     modify a JS Promise by adding some status properties.
 *     Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 *     But modified according to the specs of promises : https://promisesaplus.com/
 *     @param promise
 *
 *   Parse_String_As_Props (new method)
 *     matches each segment of the provided 'period concatenated' string with the provided object nested value and returns the value of the last segment
 *     @param str
 *     @param obj
 *     @param splitter
 *     @return value of the last key(prop) in the string
 * 
 *   Wrangle_Number (new method)
 *    tries to determine the type of number passed in (float, int, safeInt, etc)
 *    @param num (any)
 *    @return object with details about what was found
 *
 *   Get_Media_Query_Size (deprecated)
 * 
 *   Get_Window_Size (deprecated)
 * 
 *   2.1 Change Log
 *   
 *   debug (new method)
 *     @function format(...props)
 *     @params string (...keys)
 *     @return concatenated keys as string
 * 
 *   DB (breaking change)
 *     All methods 
 * 
 * 
 *   2.0 Change Log
 * 
 *   Fetch_Resource (significant update)
 *     Removed the backup XML/AJAX method of which I've never found any usage from.
 * 
 *   Strip (patch)
 *     Added a conditional check in the very last part of the function where the range contextualFragment 
 *     might not have any children (to return) due to rare scenerios where the parsed template contained 
 *     only one child node of which itself lacked any children of her own.
 *     e.g. self closing tags, <img {{...}}/>, <col {{...}} />
 *     More detail and description can be found in the functions inline notes.
 *   
 */

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

function Array_Difference(arr1, arr2) {
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

function Array_Intersection(arr1, arr2) {

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

function Array_Unique(arr1, arr2) {
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

function Class_Change(ele, mthd, str) {
  if (ele instanceof HTMLElement) {
    ele.classList[mthd](str);
  } else if (ele instanceof HTMLCollection || ele instanceof Array) {
    ele.forEach(elem => elem.classList[mthd](str));
  }

  return ele;
}

function Convert_Hex_To_HSL(hex) {
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

function Convert_Hex_To_RGB(h) {
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

function Convert_Odd_To_Even(num) {
  return Number.isInteger(num / 2) ? num : num - 1;
}

function Convert_RGB_To_HSL(r, g, b) {
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

function Convert_Transform_To_Matrix(css) {

  var matrix_values = css.slice(css.indexOf("(") + 1, css.indexOf(")"));
  matrix_values = matrix_values.split(/,\s/);

  return {
    "scale": parseFloat(matrix_values[0]),
    "translateX": parseInt(matrix_values[4], 10),
    "translateY": parseInt(matrix_values[5], 10)
  };

}

function Convert_Unix_Time(timestamp) {
  if ( ! timestamp ) return null;
  return new Date(timestamp * 1000).toLocaleString();
}

function Copy_Array_Values(srcArray) {
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

function Copy_To_Clipboard(copyTarget) {
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

function Create_Aspect_Ratio(w, h) {
  // w = w % 2 === 0 ? w : this.Convert_Odd_To_Even(w);
  // h = h % 2 === 0 ? h : this.Convert_Odd_To_Even(h);
  const ratio = {};
  let new_w = Math.round(w);
  let new_h = Math.round(h);
  let multiplier = 2;
  let control = Number(Math.min(new_h, new_w));

  (function iterate() {
    if (this.Is_Divisible(control, multiplier)) {
      // console.log('control: %i\tmultiplier: %i\n\n', control, multiplier);
      if (this.Is_Divisible(this.Array_Unique([new_w, new_h], [control]), multiplier)) {
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

function Create_New_Element(type, attrObj, ns = false) {
  let el;
  if (ns) {
    el = document.createElementNS("http://www.w3.org/2000/svg", type);
  } else {
    el = document.createElement(type);
  }

  if (attrObj) {
    Object.entries(attrObj).forEach((attr) => {
      if (attr[1]) {
        if (typeof attr[1] === "boolean") {
          if (ns) {
            el.setAttributeNS(null, [attr[0]], "");
          } else {
            el.setAttribute([attr[0]], "");
          }
        } else {
          if (ns) {
            el.setAttributeNS(null, [attr[0]], attr[1]);
          } else {
            el.setAttribute([attr[0]], attr[1]);
          }
        }
      }
    });
  }
  
  return el;
}

function CSS_To_Matrix(translateX, translateY, scale) {
  scale = parseFloat(scale) || 1;

  var matrixObj = "matrix(" + scale + ", 0, 0, " + scale + ", " + parseInt(translateX, 10) + ", " + parseInt(translateY, 10) + ")";

  return matrixObj;

}

function DB(name) {
  this.name = name || "_db";
  this.local = Storage_Test("localStorage");
  this.session = Storage_Test("sessionStorage");
  
  this.isKeySet = function (key) {
    let l = localStorage.getItem(key);
    if (l && l !== "") {
      return true;
    } else if (!l && l === "") {
      return "empty";
    } else {
      return false;
    }
  };

  this.isValueInKey = function (key, val) {
    if ( ! localStorage.getItem(key) ) {
      localStorage.setItem(key, val);
    }
    return localStorage.getItem(key).split(",").indexOf(val);
  };

  this.sessionToLocal = function(key) {
    key = key || this.name;
    localStorage.setItem(key, sessionStorage.getItem(key));
    return localStorage.getItem(key);
  };

  this.clearLocal = function() {
    localStorage.clear();
    localStorage.setItem(this.name, "");
  };

  this.clearSession = function() {
    sessionStorage.clear();
    sessionStorage.setItem(this.name, "");
  };

  this.setSession = function(obj, key) {
    key = key || this.name;
    // const blob = JSON.stringify(obj);
    const blob = JSON.stringify(obj, Replacer);
    sessionStorage.setItem(key, blob);
    return obj;
  };

  this.setLocal = function(obj, key) {
    key = key || this.name;
    const blob = JSON.stringify(obj, Replacer);
    localStorage.setItem(key, blob);
    return obj;
  };

  this.getLocal = function(key) {
    key = key || null;
    if (!key) {
      let l = this.isKeySet(this.name);
      if (!l) {
        return false;
      } else {
        key = this.name;
      }
    }

    const blob = localStorage.getItem(key);
    if (blob === "") {
      return "empty";
    } else {
      return JSON.parse(blob, Reviver);
    }
  };

  this.getSession = function(key) {
    key = key || this.name;
    const blob = sessionStorage.getItem(key) ?? false;
    if ( ! blob || blob === "" ) {
      return false;
    } else {
      return JSON.parse(blob, Reviver);
    }
  };

  this.getCollection = function(collection) {
    let arr = [];
    const k = Object.keys(localStorage);
    k.forEach((key) => {
      if (key.includes(collection)) arr.push(key);
    });
    return arr;
  };
  
  this.clearRecord = function(record) {
    localStorage.removeItem(record);
  };
}

function Debounce(period, callback) {
  if (typeof period !== "number") return false;
  let timeoutID;
  timeoutID = window.setTimeout(() => {
    window.clearTimeout(timeoutID);
    return callback();
  }, period);
}

function DOM_Parser(str, id) {
  id = id || null;
  const parser = new DOMParser();
  let fragment = parser.parseFromString(str, 'text/html');
  fragment = (id !== null ? fragment.getElementById(id) : fragment.body.firstElementChild);
  return fragment;
}

function Fetch_Resource(uri = '', options = {}, handler) {
  let res;
  return new Promise(function(resolve, reject) {
    fetch(uri, options).then(res => {
      let responseData;
      if ( ! res.ok ) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      try {
        responseData = res.json();
        if (responseData.hasOwnProperty('error')) {
          throw responseData;
        }
      } catch(error) {
        return error;
      }
      return responseData;
    }, error => {
      reject(error);
    })
    .then(res => {
      if ( handler ) {
        resolve(handler(res));
      } else {
        resolve(res);
      }
    }, error => {
      reject(error);
    });
  });
}

function Find_Templates(map) {
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

function Get_All_Tabbable(startNode) {
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

function Get_Last_String_Part(str, char) {
  // returns everything after the last occurence of 'char'
  var i = str.lastIndexOf(char) + 1;
  return str.slice(i);
}

// Deprecated
function Get_Media_Query_Size(w, h) {
  // console.log(int);

  let site_landscape = 415;
  let site_xs = 414;
  let site_sm = 576;
  let site_md = 768;
  let site_lg = 1024;

  w = w || 0;
  h = h || 0;

  if (w === 0 || h === 0) {
    return false;
  } else if (w <= site_xs) {
    return 'xs'; // xs: w-414
  } else if (w > site_xs && w < site_sm) {
    return 'sm'; // sm: w414-576
  } else if (w >= site_sm && w < site_md) {
    return 'md'; // md: w[576]-768
  } else if (w >= site_md && w < site_lg && h <= site_landscape) {
    return 'md'; // md: w[576]-1024 h[-415]
  } else if (w >= site_md && w < site_lg && h > site_landscape) {
    return 'lg'; // lg: w[768]-1024 h415~
  } else if (w >= site_lg) {
    return 'xl'; // xl: w[1024~]
  } else {
    return false;
  }
}

function Get_Rando_Num() {
  const cryptoObj = window.crypto || window.msCrypto; // for IE 11
  const num = new Uint32Array(1);
  cryptoObj.getRandomValues(num);
  return num;
}

// Deprecated
function Get_Window_Size(media) {
  media = media || false;
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  if (media) {
    return Get_Media_Query_Size(w, h);
  } else {
    return [w,h];
  }
}

function Is_Divisible(num, multiplyBy) {
  return Number.isInteger(num / multiplyBy) ? true : false;
}

function Is_Empty_Object(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function Iterate(iterator) {
  let values = [];
  let val = iterator.next();
  while (!val.done) {
    values.push(val.value);
    val = iterator.next();
  }
  return values;
}

function JSON_Prettify(str, ndnt) {
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

function KebabClass(str) {
  return str.toLowerCase().split(" ").join("-");
}

/**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 */
function Make_Querable_Promise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  let isPending = true;
  let isRejected = false;
  let isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  const result = promise.then(
      function(v) {
          isFulfilled = true;
          isPending = false;
          return v; 
      }, 
      function(e) {
          isRejected = true;
          isPending = false;
          throw e; 
      }
  );

  result.isFulfilled = function() { return isFulfilled; };
  result.isPending = function() { return isPending; };
  result.isRejected = function() { return isRejected; };

  return result;
}

function Matrix_To_CSS(obj) {
  if (obj === "null") {
    return "matrix(1,0,0,1,0,0)";
  }

  return "matrix(" + obj.scale + ",0,0," + obj.scale + "," + obj.translateX + "," + obj.translateY + ")";
}

function NodeDevMode() {
  if (process && typeof process === 'object') {
    return process.env.NODE_ENV === "development" ? true : false;
  } else {
    return false;
  }
}

function Parse(str) {
  const regStripExp = /(&lt;%=.+\((.+)\)\s(?:\{?)\n?(.+)(\n|\n.+|.+?)\}\s=%&gt;)/g;
  let m = regStripExp.exec(str);
  return m;
}

function Parse_String_As_Props(str, obj, splitter = '.') {
  let keys = str.split(splitter);
  let accessor = obj;

  keys.map(key => {
    if (accessor.hasOwnProperty(key)) {
      accessor = accessor[key];
    }
  });

  return accessor;
}

function Print_Object_State(obj) {
  let staticObj = JSON.stringify(obj);
  return JSON.parse(staticObj);
}

// min & max both inclusive
function Random_Int_Between(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let rando = Math.floor(Math.random() * (max - min + 1)) + min;
  return rando;
}

function Replacer(key, value) {
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

function Report_Error(message) {
  console.error(message);
}

function Reviver(key, value) {
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

function Round_Precision(num, precision) {
  // ex: RoundPrecision( 20.238, 2 )
  // => 20.24
  var multiplier = Math.pow(10, precision);
  return Math.round(num * multiplier) / multiplier;
}

function Set_Styles(elem, props) {
  if (typeof props !== "object") {
    console.warn("Props argument needs to be an object, e.g: { <ILE CSS Property>: <value><units> }");
    return false;
  }

  Object.entries(props).forEach((prop) => {
    elem.style[prop[0]] = prop[1];
  });

  return true;
}

function Size_To_Text(ele, scale) {
  scale = scale || parseInt(window.getComputedStyle(ele).getPropertyValue("font-size").slice(0, -2));
  const str = ele.value;
  // console.log("string: %s\nchar: %d\nscale: %d\nchar/scale: %d", str, str.length, scale, str.length * (scale/2));

  ele.style.width = (str.length * (scale/2)) + "px";
  return true;
}

function Sort_By(arr, type, prop, order) {
  // console.log("arr: %O\ntype: %s\nprop: %s\norder: %s", arr, type, prop, order);

  if (typeof arr !== "object") {
    console.error("Paramter one should either be an array or an object list that can be converted to one.");
    return false;
  }

  type = type || "";      // string, ('num','str') defines what data type to wrangle from the 'a' and 'b' params, defaults to string
  prop = prop || null;    // string, refers to the object property each item in the arr list should be compared against
  order = order || "asc";  // string, ('asc','dsc') defines the desired order to return results

  function wrangleType(thing) {
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

function Storage_Test(type) {
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

function Strip(obj) {
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
          // removed so as to preserve the bracketed values
          // matches.set(m, "");
        }

      });

      matches.forEach((val, key) => {
        const re = new RegExp(key, "g");
        outerHTML = outerHTML.replace(re, val);
      });

      const range = document.createRange();
      let newOuterHTML = range.createContextualFragment(outerHTML);

      // NOTE: 04/06/24, JG
      // The following condition was introduced after realizing that harvested template nodes
      // containing only one child with no children of itself (e.g. <img {{...}} />, <col {{...}}/>)
      // would return only an empty document-fragment. The caveat in using the conditional
      // is that the range.selectNode method relies on the 'el' variable - itself derived at the 
      // beginning of the Strip function. Since I don't completely understand what createContextualFragment
      // provides to range methods with regard to dom selection, my reason for doubting the effectiveness
      // of the condition is that there might be more than one type of 'el' node further up the DOM tree.
      if ( newOuterHTML.children.length === 0 ) {
        range.selectNode(document.getElementsByTagName(el.localName).item(0));
        newOuterHTML = range.createContextualFragment(outerHTML);
      }

      return newOuterHTML.children[0];
    } else {
      return el;
    }
  }
}

function To_CamelCase(str, titleCase=false) {
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

  if ( !titleCase ) {
    a.push(n[0].toLowerCase());
  } else {
    let fltr = n[0][0].toUpperCase();
    fltr = fltr + n[0].slice(1);
    a.push(fltr);
  }
  for (let i=1; i <= n.length - 1; i++) {
    let s = Array.from(n[i]);
    s.unshift(s.shift().toUpperCase());
    a.push(s.join(""));
  }

  return a.join("").toString();
}

function To_DropCap(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function To_InitialCaps(str, sep = '-') {
  const arr = str.split(sep);
  let transform = "";
  arr.forEach((val, idx) => {
    transform += val.slice(0,1).toUpperCase() + val.substring(1);
    if (idx > 0) transform += " ";
  });
  return transform;
}

function Toggle_Fullscreen(el) {
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

// currently only supports 'click' and 'CustomEvent' types
function Trigger_Event(eventType, options, target = window) {
  switch (eventType) {
    case 'click':
      return new MouseEvent('click', Object.assign({
        view: window,
        bubbles: true,
        cancelable: true,
        detail: details
      }, options));
    default:
      return target.dispatchEvent(new CustomEvent(eventType, options));
  }
}

function Type_Exception(value, type, caller) {
  this.value = value;
  this.type = type;
  this.caller = caller || '';
  if (typeof caller === 'string') {
    this.message = 'The type returned (e.g.: ' + typeof this.value + ') at ' + this.caller + ' does not match the expected ' + this.type + ' type.';
  } else if (typeof caller === 'object') {
    this.message = 'The type expected does not match: expected: ' + this.type + ', actual: ' + this.value + ', caller: ' + this.caller;
  } else {
    this.message = 'The type expected does not match: expected: ' + this.type + ', actual: ' + this.value;
  }
  this.toString = function() {
    return this.value + this.message;
  };
}

function TypeOf_Object(obj) {
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

function Validate_String_As(str, pattern) {
  const mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/g;
  // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const urlRegx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  switch (pattern) {
    case 'email':
      // console.log(str.match(mailRegex));
      if (str.match(mailRegex)) {
        return true;
      } else {
        return false;
      }
    case 'url':
      // console.log(str.match(urlRegx));
      if (str.match(urlRegx)) {
        return true;
      } else {
        return false;
      }
    case 'date':
      break;
  }
}

function Wait_For_AnimationEnd(el, cb, ...options) {
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
function Wait_For_Display(cb) {
  let waitTimeout;
  waitTimeout = window.setTimeout(function() {
    cb();
    window.clearTimeout(waitTimeout);
  }, 0);
}

function Wait_For_TransitionEnd(el, cb, ...options) {
  el.addEventListener("transitionend", function anime(e) {
    if (e.target !== el) {
      return false;
    } else if (options['prop'] && e.propertyName !== options['prop']) {
      return false;
    }
    this.removeEventListener("transitionend", anime, false);
    return cb();
  }, false);
}

function Wrangle_Number(num) {
  // atttempt to figure out what type of number 'num' is
  // float, int, safeInt
  let numberDetail = {};

  if (typeof num === 'string') {
    if (num.length === parseInt(num, 10).toString().length) {
      num = parseInt(num);
    } else {
      num = parseFloat(num);
    }
  }

  if (Number.isFinite(num)) {
    if (Number.isInteger(num)) {
      numberDetail.type = 'int';
    } else {
      let points = num.toString().split('.')[1].length;
      if (points > 0) {
        numberDetail.type = 'float';
        numberDetail.precision = points;
      }
    }
  } else if (Number.isNaN(num) || !Number.isFinite(num)) {
    numberDetail.type = 'NaN';
  }

  numberDetail.number = num;
  return numberDetail;
}

export {
  debug,
  CODES_US_STATES,
  Array_Difference,
  Array_Intersection,
  Array_Unique,
  Class_Change,
  Convert_Hex_To_HSL,
  Convert_Hex_To_RGB,
  Convert_Odd_To_Even,
  Convert_RGB_To_HSL,
  Convert_Transform_To_Matrix,
  Convert_Unix_Time,
  Copy_Array_Values,
  Copy_To_Clipboard,
  Create_Aspect_Ratio,
  Create_New_Element,
  CSS_To_Matrix,
  DB,
  Debounce,
  DOM_Parser,
  Fetch_Resource,
  Find_Templates,
  Get_All_Tabbable,
  Get_Last_String_Part,
  Get_Media_Query_Size,
  Get_Rando_Num,
  Get_Window_Size,
  Is_Divisible,
  Is_Empty_Object,
  Iterate,
  JSON_Prettify,
  KebabClass,
  Make_Querable_Promise,
  Matrix_To_CSS,
  NodeDevMode,
  Parse,
  Parse_String_As_Props,
  Print_Object_State,
  Random_Int_Between,
  Replacer,
  Report_Error,
  Reviver,
  Round_Precision,
  Set_Styles,
  Size_To_Text,
  Sort_By,
  Storage_Test,
  Strip,
  To_CamelCase,
  To_DropCap,
  To_InitialCaps,
  Toggle_Fullscreen,
  Trigger_Event,
  Type_Exception,
  TypeOf_Object,
  Validate_String_As,
  Wait_For_AnimationEnd,
  Wait_For_Display,
  Wait_For_TransitionEnd,
  Wrangle_Number
}
